-- Reshapes ordering around how Laundryfica actually trades:
--   * guest orders keyed on phone number (no account required)
--   * per-item premium care, order-level delivery speed
--   * Paystack payment state, so confirmation stops being a human checking a bank app
--   * chemical products sold preorder + prepaid, laundry services payable on delivery
--
-- Safe to run against a database with existing orders: every added column is
-- either nullable or has a default.

-- ---------------------------------------------------------------------------
-- 1. Payment state
-- ---------------------------------------------------------------------------

CREATE TYPE public.payment_status AS ENUM (
  'unpaid',     -- nothing owed yet, or paying on delivery
  'pending',    -- Paystack transaction opened, not yet confirmed
  'paid',       -- confirmed by webhook or verify call
  'failed',
  'refunded'
);

-- ---------------------------------------------------------------------------
-- 2. Delivery options — admin sets these once; the customer picks at checkout
-- ---------------------------------------------------------------------------

CREATE TABLE public.delivery_options (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.delivery_options IS
  'Delivery speeds offered at checkout. Order-level, not item-level: one employee, one trip.';

INSERT INTO public.delivery_options (name, description, price, sort_order) VALUES
  ('Standard', 'Ready in 2-3 days', 0, 1),
  ('Express',  'Next day',          2500, 2);

-- ---------------------------------------------------------------------------
-- 3. Settings — small values the owner changes without a developer
-- ---------------------------------------------------------------------------

CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.settings (key, value, description) VALUES
  ('online_discount_percent', '5',
   'Discount applied to laundry service lines when the customer declares items up front and pays online. Does not apply to shop products.');

-- ---------------------------------------------------------------------------
-- 4. Products — premium care, and preorder handling for the chemical line
-- ---------------------------------------------------------------------------

ALTER TABLE public.products
  -- NULL means premium care is not offered for this item (repairs, chemicals).
  ADD COLUMN premium_price NUMERIC(10, 2),
  -- Chemicals are made to order: payment must clear before production starts.
  ADD COLUMN requires_prepayment BOOLEAN NOT NULL DEFAULT FALSE,
  -- Shown as "ready in about N days" on preorder items.
  ADD COLUMN lead_time_days INTEGER;

COMMENT ON COLUMN public.products.premium_price IS
  'Per-item premium care price. NULL = premium care not available for this item.';
COMMENT ON COLUMN public.products.requires_prepayment IS
  'TRUE forces the whole order online-prepaid. Set on preorder chemical products.';

-- ---------------------------------------------------------------------------
-- 5. Order items — premium care flag and a free-text note per line
-- ---------------------------------------------------------------------------

ALTER TABLE public.order_items
  ADD COLUMN is_premium_care BOOLEAN NOT NULL DEFAULT FALSE,
  -- "stain on left sleeve", "replace zip", etc.
  ADD COLUMN notes TEXT;

COMMENT ON COLUMN public.order_items.is_premium_care IS
  'Whether this line was ordered with premium care. price_at_purchase already stores the price that applied.';

-- ---------------------------------------------------------------------------
-- 6. Orders — guest customers, money breakdown, payment state
-- ---------------------------------------------------------------------------

-- Guest orders: phone is the identity, an account is optional.
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.orders
  ADD COLUMN customer_name TEXT,
  ADD COLUMN customer_phone TEXT,
  ADD COLUMN customer_email TEXT,
  ADD COLUMN subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ADD COLUMN discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ADD COLUMN delivery_option_id INTEGER REFERENCES public.delivery_options(id),
  ADD COLUMN delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ADD COLUMN payment_status public.payment_status NOT NULL DEFAULT 'unpaid',
  ADD COLUMN payment_reference TEXT,
  ADD COLUMN paid_at TIMESTAMPTZ,
  ADD COLUMN amount_paid NUMERIC(10, 2) NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.orders.customer_phone IS
  'Primary customer identity. Nullable only so this migration is safe against pre-existing rows; the application requires it.';

-- Paystack references are unique per transaction; used by the webhook to find
-- the order, so it must be indexed and must not collide.
CREATE UNIQUE INDEX orders_payment_reference_idx
  ON public.orders (payment_reference)
  WHERE payment_reference IS NOT NULL;

CREATE INDEX orders_customer_phone_idx ON public.orders (customer_phone);
CREATE INDEX orders_status_idx ON public.orders (status);

-- ---------------------------------------------------------------------------
-- 7. RLS on the new tables only
-- ---------------------------------------------------------------------------
-- Deliberately NOT touching RLS on products / orders / order_items here. No
-- policies for those exist in this repository, which means they were either set
-- in the Supabase dashboard (untracked) or never set at all. Enabling RLS blind
-- could lock the app out of its own data. That needs checking against the live
-- database first — see SCOPE.md §3.4.

ALTER TABLE public.delivery_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read delivery options"
  ON public.delivery_options FOR SELECT TO anon, authenticated USING (is_active);

CREATE POLICY "Admins manage delivery options"
  ON public.delivery_options FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can read settings"
  ON public.settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins manage settings"
  ON public.settings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
