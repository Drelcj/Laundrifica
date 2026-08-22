-- Interest signups for the not-yet-open Rumuagholu T-Junction branch.
-- The signup count is what decides whether that shop opens, so this table is
-- write-open to the public and read-restricted to staff.
CREATE TABLE public.location_interest (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  area TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

COMMENT ON TABLE public.location_interest IS 'Pickup-interest signups for the upcoming Rumuagholu T-Junction branch.';

CREATE INDEX location_interest_created_at_idx ON public.location_interest (created_at DESC);

ALTER TABLE public.location_interest ENABLE ROW LEVEL SECURITY;

-- Anyone (signed in or not) may register interest.
CREATE POLICY "Anyone can register location interest"
  ON public.location_interest
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins may read the signups back out.
CREATE POLICY "Admins can read location interest"
  ON public.location_interest
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
