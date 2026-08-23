# Laundryfica Nigeria Ltd. — Repository Audit & Feature Directive

## Core Tech Stack
- Frontend: Next.js (App Router, TypeScript, Tailwind CSS, Lucide Icons)
- Backend: Python API (FastAPI/Django) or NestJS / Next.js API Routes
- Database & Auth: Supabase (PostgreSQL, RLS)
- Asset Management: Cloudinary
- Payments: Paystack / Flutterwave API

---

## Mandate 1: Codebase & Business Logic Audit
Run a comprehensive scan of the repository and identify:
1. **Broken / Incomplete Business Logic:**
   - Guest vs. existing customer handling during pickup logging.
   - Discount engine logic (ensure 10% online discount applies correctly and can't be exploited).
   - Agent commission calculations and state handling (`pending_approval` vs `approved`).
2. **Database & Schema Integrity:**
   - Unhandled Supabase Row-Level Security (RLS) policies.
   - Missing foreign key constraints across `users`, `orders`, `invoices`, and `commissions`.
3. **UX & Performance Bottlenecks:**
   - Mobile rendering bottlenecks in the Agent Item Logger.
   - Missing API error handlers or race conditions on concurrent doorstop logging.

---

## Mandate 2: Feature Building Specification

### A. Agent Operations Portal
- **Fast Item Logger:** Mobile-optimized, rapid counter (`+` / `-`) for laundry items.
- **Customer Account Resolution:**
  - Search by Name, Phone, or Email.
  - Existing customer $\rightarrow$ Attach invoice to profile.
  - New customer $\rightarrow$ Auto-create account (`Status: Pending_Activation`), generate invoice, trigger account activation email.
- **Route Task View:** Assigned pickups/deliveries filtered by location zones.
- **Agent Commission Ledger:** View performance-earned commissions staged for Admin approval.

### B. Customer Ordering & E-Commerce
- **Booking Engine:** Pre-upload items + pay online for 10% discount, OR request agent doorstop count.
- **Invoice & Live Tracking Hub:** Download PDF invoices and view live garment stages (*Picked Up* $\rightarrow$ *In Wash* $\rightarrow$ *Out for Delivery*).
- **Product Shop:** Detergents, laundry bags, and home care items.

### C. Admin Operations Portal
- **Analytics & Route Dispatch:** Route clustering, driver assignments, total revenue.
- **Commission Approval Module:** Review and approve/reject agent commission payouts.

---

## Code Quality Rules
- Strict TypeScript types across all components and API responses.
- Modularize database queries outside of UI components.
- Do not mark a task complete until verified against real file checks or execution tests.