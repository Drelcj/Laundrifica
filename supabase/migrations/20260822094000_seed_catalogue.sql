-- Seeds the category tree and the five chemical products Laundryfica actually
-- manufactures. Prices are per litre, in Naira, excluding the jerrycan.
--
-- The ~20 laundry items are deliberately NOT seeded here. Their names and
-- prices have not been supplied, and inventing them is the exact problem this
-- codebase is being dug out of. They get entered through the admin screen,
-- or seeded later once the real list exists.

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------

INSERT INTO public.categories (name, description) VALUES
  ('Laundry',   'Garment cleaning and care, priced per item.'),
  ('Chemicals', 'Cleaning and home care products manufactured in-house.')
ON CONFLICT DO NOTHING;

-- Laundry sub-categories. More can be added from the admin screen at any time.
INSERT INTO public.categories (name, description, parent_category_id)
SELECT v.name, v.description, parent.id
FROM (VALUES
  ('Wash & Fold',  'Everyday washing, drying and folding.'),
  ('Dry Cleaning', 'Delicate fabrics and formal wear.'),
  ('Ironing',      'Pressing only.'),
  ('Repairs',      'Buttons, hems, zips and alterations.')
) AS v(name, description)
CROSS JOIN (SELECT id FROM public.categories WHERE name = 'Laundry' LIMIT 1) AS parent
ON CONFLICT DO NOTHING;

-- ---------------------------------------------------------------------------
-- Chemical products — preorder, prepaid, no premium-care option
-- ---------------------------------------------------------------------------

INSERT INTO public.products (
  name, description, price, type, category_id,
  requires_prepayment, lead_time_days, premium_price,
  is_active, is_featured, stock_quantity
)
SELECT
  v.name, v.description, v.price, 'shop_item'::public.product_type, chem.id,
  TRUE, 3, NULL,
  TRUE, TRUE, NULL
FROM (VALUES
  ('Liquid Wash',              'Concentrated liquid laundry wash. Sold per litre or by the 25-litre jerrycan.',  2000.00),
  ('Germicide (izal)',         'Pine-based germicide for floors, drains and general disinfecting.',              1890.00),
  ('Bleach (Hypo)',            'Sodium hypochlorite bleach for whitening, stain removal and sanitising.',        1856.00),
  ('Air Freshener',            'Long-lasting air freshener for homes, offices and vehicles.',                    1850.00),
  ('Antiseptic (Dettol type)', 'Antiseptic disinfectant for personal care, laundry and household use.',          6500.00)
) AS v(name, description, price)
CROSS JOIN (SELECT id FROM public.categories WHERE name = 'Chemicals' LIMIT 1) AS chem
WHERE NOT EXISTS (SELECT 1 FROM public.products p WHERE p.name = v.name);
