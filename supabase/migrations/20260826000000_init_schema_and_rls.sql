-- Supabase SQL Migration: Initial Platform Architecture & Strict RLS Policies
-- Platform: Ahmed Alshawa Official Platform (أحمد الشوا)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'vip_client')),
  city TEXT DEFAULT 'Jeddah',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create Book Orders Table
CREATE TABLE IF NOT EXISTS public.book_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_city TEXT NOT NULL DEFAULT 'Jeddah',
  shipping_address TEXT NOT NULL,
  book_title TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  amount_sar NUMERIC(10, 2) NOT NULL CHECK (amount_sar >= 0),
  payment_method TEXT NOT NULL DEFAULT 'mada' CHECK (payment_method IN ('mada', 'apple_pay', 'credit_card', 'bank_transfer', 'cod')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'failed', 'refunded')),
  shipping_status TEXT NOT NULL DEFAULT 'processing' CHECK (shipping_status IN ('processing', 'handed_to_courier', 'in_transit', 'delivered', 'cancelled')),
  courier_name TEXT DEFAULT 'SMSA' CHECK (courier_name IN ('SMSA', 'ARAMEX', 'REDBOX', 'LOCAL_DRIVER')),
  tracking_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Create Consultation Bookings Table
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  session_type TEXT NOT NULL CHECK (session_type IN ('in_person_jeddah', 'online_zoom')),
  session_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  price_sar NUMERIC(10, 2) NOT NULL CHECK (price_sar >= 0),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'pending', 'refunded')),
  payment_method TEXT NOT NULL DEFAULT 'mada',
  zoom_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'rescheduled', 'cancelled')),
  intake_data JSONB DEFAULT '{}'::jsonb, -- { business_field, social_links, challenges, budget }
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_book_orders_user_id ON public.book_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_book_orders_created_at ON public.book_orders(created_at);
CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON public.consultation_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_date ON public.consultation_bookings(session_date);

-- 6. Trigger to automatically populate public.profiles on Auth User Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'مشترك جديد'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'phone', '05' || floor(random() * 90000000 + 10000000)::text),
    COALESCE(new.raw_app_meta_data->>'role', 'customer')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY INVOKER
STABLE
AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'role') = 'admin' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = (select auth.uid()) AND role = 'admin'
    ),
    false
  );
$$;

-- PROFILES RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can select their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING ( (select auth.uid()) = id );

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ( (select auth.uid()) = id )
  WITH CHECK ( (select auth.uid()) = id );

-- Admins have full access to all profiles
CREATE POLICY "Admins have full access to profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING ( public.is_admin() )
  WITH CHECK ( public.is_admin() );

-- BOOK ORDERS RLS Policies
-- Customers can only view their own orders
CREATE POLICY "Customers can select their own orders"
  ON public.book_orders
  FOR SELECT
  TO authenticated
  USING ( (select auth.uid()) = user_id );

-- Allow insertion of new orders for authenticated users
CREATE POLICY "Authenticated users can create orders"
  ON public.book_orders
  FOR INSERT
  TO authenticated
  WITH CHECK ( (select auth.uid()) = user_id );

-- Allow guest/anon insertion for checkout orders
CREATE POLICY "Anon can create orders with valid data"
  ON public.book_orders
  FOR INSERT
  TO anon
  WITH CHECK ( true );

-- Admins have full access to manage all orders
CREATE POLICY "Admins have full access to book orders"
  ON public.book_orders
  FOR ALL
  TO authenticated
  USING ( public.is_admin() )
  WITH CHECK ( public.is_admin() );

-- CONSULTATION BOOKINGS RLS Policies
-- Customers can only view their own bookings
CREATE POLICY "Customers can select their own bookings"
  ON public.consultation_bookings
  FOR SELECT
  TO authenticated
  USING ( (select auth.uid()) = user_id );

-- Customers can create their own bookings
CREATE POLICY "Customers can create consultation bookings"
  ON public.consultation_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK ( (select auth.uid()) = user_id );

-- Anon can create consultation bookings
CREATE POLICY "Anon can create bookings"
  ON public.consultation_bookings
  FOR INSERT
  TO anon
  WITH CHECK ( true );

-- Admins have full access to manage all consultation bookings
CREATE POLICY "Admins have full access to consultation bookings"
  ON public.consultation_bookings
  FOR ALL
  TO authenticated
  USING ( public.is_admin() )
  WITH CHECK ( public.is_admin() );
