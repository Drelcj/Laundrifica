# SCOPE — Repository Audit

Laundryfica Nigeria Limited. Audit date 2026-08-22. Read-only pass; no code changed.

Measured against the three flows that matter:

- **F1 — Customer orders and pays.** Web order → Paystack → auto-confirmed on payment.
- **F2 — Agent logs work on a phone.** Count items, attach to customer, mark picked up, mark delivered.
- **F3 — Admin runs the business.** See orders, change status, edit prices.

**Headline:** 61 pages and 2 API routes. Of those, **9 are KEEP**, **11 DEFER**, **41 DELETE**. All three
flows are currently broken. F1 and F2 cannot write an order to the database at all — not "partly", not
"needs polish". They fail on the first insert. Details in §3.

---

## 1. Route inventory

Data source key: **Supabase** = reads the real database · **MOCK** = `MOCK_*` constants in
`src/lib/api.ts` · **HARDCODED** = a literal array in the page file itself · **static** = no data.

### Public marketing

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/` | Home | working | static (composes 9 sections) | root |
| `/about` | Company story, team | renders, HARDCODED | HARDCODED team array | main nav |
| `/services` | Services hub | renders, HARDCODED | HARDCODED | main nav |
| `/services/wash-and-fold` | Service detail | renders, HARDCODED | static | services hub |
| `/services/dry-cleaning` | Service detail | renders, HARDCODED | static | services hub |
| `/services/ironing` | Service detail | renders, HARDCODED | static | services hub |
| `/services/repairs` | Service detail | renders, HARDCODED | static | services hub |
| `/pricing` | Price list + tiers | renders, HARDCODED | HARDCODED (710 lines) | main nav |
| `/membership-comparison` | Standard vs Premium | renders, HARDCODED | HARDCODED | pricing |
| `/contact` | Contact + branch signup | **working** | Supabase (`location_interest`) | main nav |
| `/careers` | Job listings | renders, HARDCODED | HARDCODED (5 fake jobs) | footer |
| `/blog` | Blog index | working | Supabase (`posts`) | main nav |
| `/blog/[id]` | Blog post + comments | working | Supabase (`posts`, `comments`, `likes`) | blog index |
| `/privacy` | Privacy policy | working | static | footer |
| `/terms` | Terms | working | static | footer |

### Ordering and shop

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/shop` | Product grid | working | Supabase (`products`) | main nav |
| `/shop/[id]` | Product detail | renders, HARDCODED | `src/lib/products.ts` (not Supabase) | shop, home |
| `/cart` | Cart | working | zustand + localStorage | header icon |
| `/order` | Laundry item booking | **stub** | HARDCODED 14 items | services, pricing |
| `/checkout` | 4-step checkout | **broken** | MOCK `createOrder` → real API | cart |
| `/checkout/success` | Thank-you page | renders, static | static — never reads the order | checkout, cart |

### Auth

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/login` | Sign in | working | Supabase auth | header |
| `/signup` | Register | working | Supabase auth | login |
| `/auth/callback` (route) | OAuth callback | working | Supabase auth | Supabase redirect |
| `/dashboard` | Role router → admin/agent/user | working | Supabase (`profiles.role`) | header, middleware |

### Customer dashboard

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/dashboard/user` | Overview | working | Supabase | dashboard router |
| `/dashboard/user/orders` | Order history | renders, HARDCODED | HARDCODED array (line 10) | dashboard nav (broken href) |
| `/dashboard/user/orders/[id]` | Order detail | renders, HARDCODED | HARDCODED | **orphaned** — see §1.2 |
| `/dashboard/user/orders/[id]/track` | Live tracking | renders, MOCK | MOCK | **orphaned** |
| `/dashboard/user/settings` | Account settings | working | Supabase | dashboard nav |
| `/dashboard/user/addresses` | Address book | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/address-book` | Address book **(dupe)** | renders, HARDCODED | HARDCODED | **orphaned** |
| `/dashboard/user/invoices` | Invoice list | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/membership` | Membership tier | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/rewards` | Loyalty points | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/vouchers` | Vouchers/refunds | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/upcoming` | Scheduled services | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/notifications` | Notification prefs | renders, HARDCODED | HARDCODED | dashboard nav |
| `/dashboard/user/payment-methods` | Saved cards | renders, HARDCODED | HARDCODED | dashboard nav |

### Agent dashboard

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/dashboard/agent` | Agent home + commission | renders, MOCK | MOCK `getOrders()` | dashboard router |
| `/dashboard/agent/orders` | Assigned orders **(near-dupe of above)** | renders, MOCK | MOCK `getOrders()` | agent nav |
| `/dashboard/agent/orders/[id]` | Order detail + status | **broken** | MOCK; writes to memory only | agent orders |
| `/dashboard/agent/place-order` | Create order for customer | **broken** | Supabase (insert fails) | agent nav, admin orders |

### Admin dashboard

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/dashboard/admin` | KPI overview | renders, HARDCODED | HARDCODED | dashboard router |
| `/dashboard/admin/orders` | Order list + assign agent | **working (read)** | **Supabase** | admin nav |
| `/dashboard/admin/products` | Product CRUD | working | Supabase | admin nav |
| `/dashboard/admin/products/new` | Add product | working | Supabase | products page |
| `/dashboard/admin/products/[id]/edit` | Edit product | working | Supabase | products page |
| `/dashboard/admin/customers` | Customer list | renders, HARDCODED | HARDCODED (5 fake) | admin nav |
| `/dashboard/admin/staff` | Staff records | renders, HARDCODED | HARDCODED (5 fake) | admin nav |
| `/dashboard/admin/delivery` | Fleet/route map | renders, HARDCODED | HARDCODED | admin nav |
| `/dashboard/admin/locations` | 6 branches | renders, HARDCODED | HARDCODED (Ikeja/Abuja/Kano…) | admin nav |
| `/dashboard/admin/inventory` | Stock levels | renders, MOCK | MOCK | admin nav |
| `/dashboard/admin/analytics` | Charts | renders, HARDCODED | `mockData` (line 22) | admin nav |
| `/dashboard/admin/marketing` | Email campaigns | renders, HARDCODED | HARDCODED | admin nav |
| `/dashboard/admin/blog` | Post management | renders, HARDCODED | HARDCODED | admin nav |
| `/dashboard/admin/blog/new` | Post editor | renders, HARDCODED | no persistence | blog admin |
| `/dashboard/admin/voucher` | Vouchers **(dupe)** | renders, HARDCODED | HARDCODED | admin nav |
| `/dashboard/admin/vouchers` | Vouchers **(dupe)** | renders, HARDCODED | HARDCODED | admin nav |
| `/dashboard/admin/settings` | Store settings | renders, HARDCODED | 733 lines, saves nothing | admin nav |

### Orphaned top-level admin (outside `/dashboard`)

| Path | Purpose | State | Data | Linked from |
|---|---|---|---|---|
| `/admin` | Product management **(dupe)** | working | Supabase | **nothing** |
| `/admin/products/new` | Add product **(dupe)** | working | Supabase | `/admin` only |

### API routes

| Path | Purpose | State | Notes |
|---|---|---|---|
| `POST /api/orders` | Create order + items | **broken at runtime** | Best-written file in the repo; dies on config and schema. §3.1 |
| `GET /auth/callback` | Supabase OAuth exchange | working | — |

### 1.1 Duplicate pairs

Beyond the two you spotted, there are six more:

| # | Duplicate | Verdict |
|---|---|---|
| 1 | `dashboard/admin/voucher` · `dashboard/admin/vouchers` | *(yours)* Both in admin nav as separate menu items. Delete both. |
| 2 | `dashboard/user/address-book` · `dashboard/user/addresses` | *(yours)* `address-book` is orphaned. |
| 3 | **`/admin` · `/dashboard/admin/products`** | Both render the same `<ProductDataTable>` from the same table. `/admin` is unlinked **and unprotected** — see §3.4. |
| 4 | **`/admin/products/new` · `/dashboard/admin/products/new`** | Same form. The `/admin` one has no auth check whatsoever. |
| 5 | **`/order` · `/checkout` · `/cart`** | Three overlapping paths to place an order. `/order` builds a laundry basket from a hardcoded list; `/cart` + `/checkout` handle shop products. They share the same zustand store but neither reaches a payment provider. |
| 6 | **`/dashboard/agent` · `/dashboard/agent/orders`** | Both call `getOrders()` and render the same table. The only difference is a commission card. |
| 7 | **`/pricing` · `/membership-comparison`** | 710 + 427 lines both comparing Standard vs Premium. |
| 8 | **`/dashboard/user/vouchers` · `/dashboard/user/rewards`** | Two loyalty schemes side by side. |

### 1.2 Dead links — link exists, route does not

Fifteen navigation targets 404. Several are on the **customer order path**, which is why order history
appears broken even where the page itself renders.

| Broken link | In file | Real route |
|---|---|---|
| `/dashboard/orders` | `dashboard-nav.tsx`, others | `/dashboard/user/orders` |
| `/dashboard/orders/${orderId}` | `checkout/page.tsx:181` (**"View Order"** after purchase) | `/dashboard/user/orders/[id]` |
| `/dashboard/orders/${id}/track` | `recent-orders-list.tsx` | `/dashboard/user/orders/[id]/track` |
| `/dashboard//user/orders` *(double slash)* | `dashboard-nav.tsx:35` | `/dashboard/user/orders` |
| `/dashboard/settings` | dashboard components | `/dashboard/user/settings` |
| `/dashboard/upcoming`, `/dashboard/upcoming/${id}` | dashboard components | `/dashboard/user/upcoming` |
| `/dashboard/invoices/${id}` | invoices page | `/dashboard/user/invoices` |
| `/dashboard/admin/reports` | `admin-nav.tsx:91` | **does not exist** |
| `/admin/orders/${id}`, `/admin/customers/…`, `/admin/blog` | admin dashboard | **do not exist** |
| `/blog/post/${id}` | featured posts | `/blog/[id]` |
| `/faq` | `contact/page.tsx` "View All FAQs" | **does not exist** |
| `/forgot-password` | `login/page.tsx` | **does not exist** |

Also: `cart/page.tsx` sends **"Continue Shopping"** to `/checkout/success` (twice) instead of `/shop`.

### 1.3 Other template residue

- `src/app/services/repairs/page.tsx:5-6` and `RepairsClientPage.tsx:82` still say **"QuickLease"** — a
  second template brand that survived the content pass.
- `src/app/login/page.tsx:120` — phone login tab is `disabled` ("Coming Soon"). Your customers arrive by
  WhatsApp; email-only auth is a real friction point.
- Three incompatible order-status vocabularies coexist. See §3.3.

---

## 2. Classification

### KEEP — 9 routes

Everything needed for F1, F2, F3 this month.

| Route | Flow | Note |
|---|---|---|
| `/` | — | Front door. |
| `/order` | F1 | The right idea, wrong data: rewrite to read your 20 items from `products` (the table already has a `type: 'service'` enum value for exactly this). |
| `/cart` | F1 | Works. Fix the two "Continue Shopping" links. |
| `/checkout` | F1 | Needs Paystack. §3.1. |
| `/api/orders` | F1 | Needs the schema and config fixes in §3.1. Keep the file — the server-side price derivation is correct and worth keeping. |
| `/dashboard/agent/place-order` | F2 | Rebuild as the mobile item logger. §3.2. |
| `/dashboard/admin/orders` | F3 | Already reads real orders. Needs a status editor. |
| `/dashboard/admin/products` (+ `new`, `[id]/edit`) | F3 | Price editing. This is where the wife sets prices. |
| `/login`, `/signup`, `/dashboard` | all | Auth and role routing. |

Plus `/contact`, `/privacy`, `/terms` — the branch-interest form is live and collecting, and the legal
pages are cheap and expected.

### DEFER — 11 routes

Real ideas, wrong month. **Remove from navigation, leave the files.**

| Route | Why defer |
|---|---|
| `/shop`, `/shop/[id]` | The five chemical products are a real revenue line, but they're a second checkout surface. Ship laundry ordering first. |
| `/dashboard/user/orders`, `/orders/[id]`, `/orders/[id]/track` | Customers will want order history — but only once F1 actually writes orders. Fix the dead links when you wire them up. |
| `/dashboard/user`, `/dashboard/user/settings` | Already on Supabase. Harmless. Keep visible, don't invest. |
| `/dashboard/user/invoices` | Your wife prepares invoices by hand today. Automating that is worth doing — later. |
| `/blog`, `/blog/[id]` | Genuinely works, real Supabase CRUD. Costs nothing to leave up. Not a priority. |
| `/about` | One paragraph of truth would fix it. Low effort, low urgency. |
| `/checkout/success` | Will be needed once payment lands; today it reads nothing. |

### DELETE — 41 routes

Template freight for a company you are not. Blunt, as requested.

**Multi-branch / fleet fiction (5)**
`/dashboard/admin/locations` (6 invented branches across Lagos, Abuja, Kano, Ibadan) ·
`/dashboard/admin/delivery` (fleet dispatch map with fake agent pins) ·
`/dashboard/admin/staff` (5 invented employees — you have one) ·
`/dashboard/admin/customers` (5 invented customers, no Supabase read) ·
`/dashboard/admin/reports` (nav link to a route that was never written — delete the link).

**Loyalty and membership engine (7)**
`/membership-comparison` · `/dashboard/user/membership` · `/dashboard/user/rewards` ·
`/dashboard/user/vouchers` · `/dashboard/admin/voucher` · `/dashboard/admin/vouchers` ·
`/dashboard/user/upcoming`.
The whole Standard/Premium two-tier model is template fiction. You price 20 items flat, ₦250–₦3,000.
Every `premiumPrice` field in `order/page.tsx` is invented. This tier concept is also wired into
`/pricing`, the hero, and the FAQ — pulling it out is a content job, not just a route deletion.

**Marketing department (4)**
`/dashboard/admin/marketing` (459 lines of email campaign management) ·
`/dashboard/admin/blog` + `/blog/new` (admin blog CMS that persists nothing) ·
`/careers` (5 fabricated job listings with salary bands, for a business with one employee).

**Agent commission (1)**
`/dashboard/agent` as built. `agent/page.tsx:17` computes a **10% commission** on every order and
displays it as "Commission earned this month". You have one salaried employee. Delete the earnings card;
the order list is a near-duplicate of `/dashboard/agent/orders` anyway. Collapse the two into one.

**Duplicate admin surface (2)**
`/admin` · `/admin/products/new`. Unlinked, unprotected (§3.4), functionally identical to their
`/dashboard/admin/products` twins.

**Dead customer features (4)**
`/dashboard/user/address-book` (orphaned dupe) · `/dashboard/user/payment-methods` (saved-card vault —
Paystack holds tokens, not you) · `/dashboard/user/notifications` (219 lines of toggles wired to nothing) ·
`/dashboard/admin/settings` (733 lines including a payment-provider dropdown that configures nothing).

**Fake analytics (2)**
`/dashboard/admin/analytics` (charts over `mockData`) · `/dashboard/admin/inventory` (MOCK stock).
You said cost tracking started this week. Both of these will lie convincingly to you, which is worse
than having nothing. Rebuild from real data later if you want them.

**Service marketing pages (5)**
`/services` + the four sub-pages. Overlaps `/pricing`, and `/services/repairs` still says "QuickLease".
Reduce to one honest page, or fold into `/pricing`.

---

## 3. Broken-flow report

### 3.1 F1 — Customer orders and pays — **dead at the first insert**

There is **no payment provider in this repository.** Not misconfigured — absent. No Paystack SDK, no
Flutterwave, no webhook route, no verify call, no payment reference column. The only occurrences of the
word "Paystack" are a `<SelectItem value="paystack">` in an admin settings page that saves nothing
(`dashboard/admin/settings/page.tsx:384`) and a code comment.

The flow dies five separate times. In execution order:

**① `src/utils/supabase/server-client.ts:10` — the server throws before touching the database.**
```
if (!url || !serviceKey) throw new Error('SUPABASE server client requires … SUPABASE_SERVICE_ROLE_KEY')
```
`.env` contains only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
**`SUPABASE_SERVICE_ROLE_KEY` is not set.** `/api/orders` calls `createServerClient()` at
`api/orders/route.ts:27`, so **every order POST returns 500 today.** This is the single line that makes
order creation impossible right now. It is also the cheapest fix in this document.

**② `src/app/api/orders/route.ts:66` — inserting a column that does not exist.**
The payload sets `billing_address`. The `orders` table has `id, user_id, total_amount, status,
shipping_address, assigned_agent_id, created_at, updated_at` — **there is no `billing_address` column.**
PostgREST rejects the insert. The payload is typed `any` (line 62), so TypeScript never catches it.

**③ `src/app/api/orders/route.ts:64` + `src/lib/api.ts:238` — invalid enum value.**
`lib/api.ts:238` sends `status: 'pending'`. Checkout never sets a status, so `'pending'` is always what
arrives. The route passes it straight through (`order.status || 'pending_pickup'` — `'pending'` is
truthy, so the fallback never fires). The `order_status` enum is
`pending_payment | pending_pickup | processing | out_for_delivery | completed | cancelled`.
**`'pending'` is not a member.** Postgres rejects it.

**④ `shipping_address` is a `text` column receiving an object.**
`checkout/page.tsx:146` passes an `OrderAddress` object through to `shipping_address`. The column is
`string | null`.

**⑤ There is no payment step at all.**
`checkout/page.tsx:277-287` renders "Pay with Card" **greyed out and disabled**, labelled *"Coming Soon"*,
with the text *"10% discount applied at checkout"* — a discount that is implemented nowhere in the repo.
The only live option is Pay on Delivery. `checkout/page.tsx:301` calls
`handlePaymentComplete({ method: "Pay on Delivery" })` directly. `<PaymentForm>` is imported at line 15
and **never rendered**.

**On your specific question about the 90% mock:** yes, it exists —
`src/lib/api.ts:341`, `const success = Math.random() > 0.1 // 90% success rate for demo`. It is imported
by `components/checkout/payment-form.tsx:14`. It is **not** currently on the live path, because
`PaymentForm` is never mounted and its own handler (line 43) returns `pay_on_delivery` without calling it.
So it is a loaded gun on the floor rather than one being fired.

**What is missing structurally**, beyond the bugs: the `orders` table has **no payment columns at all** —
no `payment_status`, no `paystack_reference`, no `paid_at`, no `amount_paid`. Auto-confirmation on payment
is not a wiring job; it needs a migration first. And `calculateTax` is called at `checkout/page.tsx:108`
with its result assigned to an unused variable and discarded.

> **F1 dies at `src/utils/supabase/server-client.ts:10`, and would then die four more times before
> reaching a payment provider that does not exist.**

### 3.2 F2 — Agent logs work on a phone — **writes nothing; wrong shape for the job**

**The item logger does not exist.** There is no counter UI, no `+`/`−` control, nothing that counts
garments. The nearest thing is `/dashboard/agent/place-order`, which is a **desktop two-column grid**
(`md:grid-cols-2`, `sm:grid-cols-3` product cards) requiring the agent to type the **customer's email**
into a text field at the doorstep. Your customers arrive by WhatsApp. There is no phone-number lookup,
no name search, no create-new-customer path, no offline handling, no optimistic write, no retry.

**Where the write dies — `src/lib/actions/order.actions.ts`:**

- **Line 58** — `.eq('email', customerEmail)` against `profiles`. **`profiles` has no `email` column**
  (`address, avatar_url, created_at, full_name, id, membership, phone_number, role, updated_at`). The
  query errors; `userData` is null; `userId` falls to null.
- **Line 67** — `customer_email: customerEmail` in the insert payload. **`orders` has no `customer_email`
  column.** PostgREST rejects it.
- **Line 71** — `user_id` is only set when `userId` is truthy. Because of line 58 it never is, so the
  column is omitted — but **`orders.user_id` is NOT NULL**. Third failure on the same insert.

**Status updates persist nowhere.** `/dashboard/agent/orders/[id]` imports `updateOrderStatus` from
`@/lib/api` (line 4) and calls it at line 29. That function is `src/lib/api.ts:291`, which mutates
`MOCK_ORDERS[orderIndex].status` in memory (line 297) and returns. **It never touches Supabase.** The
agent taps "Save", gets `alert("Order status updated to …")` at line 30, and nothing has happened.
The list pages (`agent/page.tsx:10`, `agent/orders/page.tsx:10`) read the same mock array, so the agent
sees one hardcoded fake order regardless of what is in the database.

> **F2 dies at `src/lib/actions/order.actions.ts:58` for order creation, and at
> `src/lib/api.ts:297` for status updates.**

### 3.3 F3 — Admin runs the business — **can see orders, cannot change them**

This is the healthiest of the three, and the only flow with a working half.

**Works:** `/dashboard/admin/orders` calls the real `getOrders()` from `lib/actions/order.actions.ts:7`
and reads live `orders` joined to `profiles`. Product CRUD under `/dashboard/admin/products` reads and
writes Supabase properly. `AssignAgentDialog` is wired to a real `assignAgentToOrder` action.

**Broken — there is no status editor.** The only `<Select>` on the page is a *filter* control
(`admin/orders/page.tsx`, "Filter by status"), and it has no `onValueChange` handler — it is decorative.
There is no per-row status control anywhere in admin. **Changing an order's status is impossible from the
admin UI.** The only status-change control in the app is the agent detail page, which writes to memory
(§3.2).

**Broken — three incompatible status vocabularies.** This will bite whatever you build next:

| Source | Values |
|---|---|
| Database enum `order_status` | `pending_payment`, `pending_pickup`, `processing`, `out_for_delivery`, `completed`, `cancelled` |
| TypeScript `OrderStatus` (`src/lib/types.ts`) + agent dropdown (`agent/orders/[id]/page.tsx:56-60`) | `pending`, `processing`, `shipped`, `delivered`, `cancelled` |
| Admin badge colours (`admin/orders/page.tsx:23-36`) | `"Delivered"`, `"Processing"`, `"Ready for delivery"`, `"Pickup agent on the way"` |

Only `processing` and `cancelled` appear in more than one. The admin `getStatusColor()` switch matches
**none** of the values the database actually returns, so every badge falls through to the grey default.
Pick one vocabulary — the database enum — before building anything on top.

**Price editing works** via `/dashboard/admin/products`, but the 20 laundry items are not in the
`products` table. They are hardcoded at `src/app/order/page.tsx:39` — **14 items**, not 20, each with an
invented `standardPrice`/`premiumPrice` pair, and the wash-and-fold entries priced *per kg* rather than
per item. Your wife cannot edit any of them without a developer.

> **F3 dies at `src/app/dashboard/admin/orders/page.tsx` — no status-mutation control exists — and
> at `src/app/order/page.tsx:39`, where the real price list lives outside the database.**

### 3.4 Security finding — unauthenticated product management

Not one of the three flows, but it should not wait.

`middleware.ts:44` protects only `['/dashboard/admin']`. The top-level `/admin` tree is **not covered**.

- `src/app/admin/page.tsx:11-14` checks only `if (!user) redirect('/login')` — **any signed-in customer
  can open the product management table**, no role check.
- `src/app/admin/products/new/page.tsx` has **no auth check at all** — no `getUser()`, no redirect. It
  renders the "Add New Product" form to anyone, signed in or not.

Whether a write actually lands depends on Supabase RLS on `products`, and **no RLS policies for
`products` exist anywhere in this repository** (`supabase/migrations/` contains only the blog tables and
the `location_interest` table). If RLS was configured in the Supabase dashboard it is untracked and
unreviewable; if it was not, this is a live write hole. Deleting the `/admin` duplicate closes it.

### 3.5 Repository health

- **`npm ci` fails.** Pre-existing peer conflict: `date-fns@4.1.0` vs `react-day-picker@8.10.1`
  (needs `^2 || ^3`). Install currently requires `--legacy-peer-deps`. `package-lock.json` is also stale
  against `package.json` (lock pins `next@15.2.4`, manifest says `15.5.0`).
- **Type and lint checking are disabled at build time.** `next.config.mjs` sets
  `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`. `tsc --noEmit` reports
  errors in 14 files. This is why bugs ② and ③ above ship silently — a green build proves nothing here.
- **`next@15.5.0` has a published security advisory** (CVE-2025-66478); npm flags it on install.
