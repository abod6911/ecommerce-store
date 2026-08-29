-- ==============================================================================
-- AHMED ALSHAWA PLATFORM: RBAC ROLE DELEGATION & SECURITY AUDIT LOGS
-- Migration: 20260830000000_rbac_and_audit_logs.sql
-- ==============================================================================

-- 1. Update Profiles Role Check to include super_admin and vip_client
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('customer', 'admin', 'super_admin', 'vip_client'));

-- ------------------------------------------------------------------------------
-- 2. Table: SECURITY_AUDIT_LOGS (Master Passkey & Role Change Audits)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_user UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for speedy querying
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.security_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.security_audit_logs(action_type);

-- ------------------------------------------------------------------------------
-- 3. Row-Level Security for SECURITY_AUDIT_LOGS
-- ------------------------------------------------------------------------------
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only super_admin or service_role can read audit logs
CREATE POLICY "Super admins can read audit logs"
    ON public.security_audit_logs FOR SELECT
    USING (
        (auth.jwt() ->> 'role' = 'super_admin') OR
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- System can insert audit logs
CREATE POLICY "Service role and system can insert audit logs"
    ON public.security_audit_logs FOR INSERT
    WITH CHECK (true);
