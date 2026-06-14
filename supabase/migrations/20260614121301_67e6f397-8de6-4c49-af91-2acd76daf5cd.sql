
-- Revoke any client-side access to pagos; only service_role (backend/edge functions) should access it
REVOKE ALL ON public.pagos FROM anon, authenticated;
GRANT ALL ON public.pagos TO service_role;

-- Add explicit restrictive deny policies to make intent clear and satisfy linter
CREATE POLICY "Deny all access to anon"
  ON public.pagos AS RESTRICTIVE FOR ALL TO anon
  USING (false) WITH CHECK (false);

CREATE POLICY "Deny all access to authenticated"
  ON public.pagos AS RESTRICTIVE FOR ALL TO authenticated
  USING (false) WITH CHECK (false);
