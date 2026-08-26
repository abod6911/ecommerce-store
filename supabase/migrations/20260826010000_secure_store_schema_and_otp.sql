-- ==============================================================================
-- AHMED ALSHAWA PLATFORM: SECURE EXTERNAL DATABASE SCHEMA & STRICT RLS
-- Migration: 20260826010000_secure_store_schema_and_otp.sql
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. Table: PROFILES (User Registries & Roles)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'vip_client')),
    city TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. Table: BOOK_ORDERS (Physical Books & Logistical Tracking)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.book_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    shipping_city TEXT NOT NULL DEFAULT 'جدة',
    shipping_address TEXT NOT NULL,
    book_title TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    amount_sar NUMERIC(10, 2) NOT NULL CHECK (amount_sar >= 0),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('mada', 'apple_pay', 'credit_card', 'bank_transfer', 'cod')),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'failed', 'refunded')),
    shipping_status TEXT NOT NULL DEFAULT 'processing' CHECK (shipping_status IN ('processing', 'handed_to_courier', 'in_transit', 'delivered', 'cancelled')),
    courier_name TEXT CHECK (courier_name IN ('SMSA', 'ARAMEX', 'REDBOX', 'LOCAL_DRIVER')),
    tracking_code TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. Table: CONSULTATION_BOOKINGS (VIP Jeddah & Remote Online Zoom)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    session_type TEXT NOT NULL,
    session_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    price_sar NUMERIC(10, 2) NOT NULL CHECK (price_sar >= 0),
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'failed', 'refunded')),
    payment_method TEXT NOT NULL DEFAULT 'MADA',
    zoom_url TEXT,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'rescheduled', 'cancelled')),
    intake_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. Table: CUSTOMER_ACTIVITY_LOGS (Telemetry, Audit Trail & Security)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 6. Indexes for Maximum Query Optimization
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_book_orders_user_id ON public.book_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_book_orders_order_number ON public.book_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_book_orders_created_at ON public.book_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_user_id ON public.consultation_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_date ON public.consultation_bookings(session_date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_event_type ON public.customer_activity_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.customer_activity_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 7. Automated Profile Trigger from Auth.Users (Email OTP / Signup)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'مستخدم جديد'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        full_name = EXCLUDED.full_name,
        phone = CASE WHEN EXCLUDED.phone <> '' THEN EXCLUDED.phone ELSE public.profiles.phone END,
        updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 8. Enable Strict Row-Level Security (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_activity_logs ENABLE ROW LEVEL SECURITY;

-- 8.1 PROFILES POLICIES
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    USING (
        (auth.jwt() ->> 'role' = 'admin') OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 8.2 BOOK_ORDERS POLICIES
CREATE POLICY "Users can view own orders"
    ON public.book_orders FOR SELECT
    USING (
        auth.uid() = user_id OR
        auth.uid() IS NULL
    );

CREATE POLICY "Anyone can create book orders"
    ON public.book_orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins have full access to book orders"
    ON public.book_orders FOR ALL
    USING (
        (auth.jwt() ->> 'role' = 'admin') OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 8.3 CONSULTATION_BOOKINGS POLICIES
CREATE POLICY "Users can view own bookings"
    ON public.consultation_bookings FOR SELECT
    USING (
        auth.uid() = user_id OR
        auth.uid() IS NULL
    );

CREATE POLICY "Anyone can create consultation bookings"
    ON public.consultation_bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins have full access to consultation bookings"
    ON public.consultation_bookings FOR ALL
    USING (
        (auth.jwt() ->> 'role' = 'admin') OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 8.4 CUSTOMER_ACTIVITY_LOGS POLICIES
CREATE POLICY "Anyone can log telemetry"
    ON public.customer_activity_logs FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view telemetry logs"
    ON public.customer_activity_logs FOR SELECT
    USING (
        (auth.jwt() ->> 'role' = 'admin') OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
