# Leo's Children E-commerce

**Little Styles. Big Adventures.**

Leo's is a modern, full-stack children's fashion e-commerce platform for ages 0–14, offering clothing and footwear to families across Canada and the United States. Built as an independent, mobile-first retail experience with Next.js, TypeScript, Supabase, PostgreSQL and Stripe.

## Vision

Deliver an accessible, stylish and trustworthy shopping experience for parents and guardians, with age-based collections, brand-specific sizing, seasonal fashion, secure payments and transparent fulfillment.

## Planned capabilities

- Age-based discovery (baby, toddler, kids and early teens)
- Clothing and footwear variants by size and colour, with SKU-level stock
- Product search, collections, wishlists and curated outfits
- CAD/USD pricing, Canadian/US shipping and tax handling
- Guest checkout, secure payments, order tracking and returns
- Admin product, inventory, order and promotion management

## Stack

Next.js · TypeScript · Tailwind CSS · Supabase · PostgreSQL · Stripe · Vercel

## Setup

1. Run `npm install` and commit the generated lockfile before production deployment.
2. Copy `.env.example` to `.env.local`.
3. Run `npm run dev`.

Supabase project: `apyuwfgrjyogyoxekejb` (Canada Central).

## Barakaz migration policy

Leo's is a **single-retailer** platform, not a multi-vendor marketplace. Port reusable modules only after reviewing the authorized Barakaz source repository and its dependencies. Prioritize catalogue, variants, cart, checkout, order lifecycle, shipping, tax, inventory, returns, banners and admin components. Do not transfer customer data, credentials, seller payouts, vendor onboarding or production secrets. Preserve provenance and applicable licenses.

## Security and readiness

Only the Supabase publishable key belongs in browser environment variables. Never commit service-role keys. Implement order creation, checkout pricing, inventory reservations and payment verification server-side. The current storefront is an initial scaffold, **not** a production-ready checkout.
