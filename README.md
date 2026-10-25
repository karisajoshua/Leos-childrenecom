# Leo's Children E-commerce

Custom Next.js + Supabase storefront for children's clothing and shoes (ages 0–14), targeting Canada and the US.

## Setup

1. Run `npm install` (commit the generated lockfile before production deployment).
2. Copy `.env.example` to `.env.local`.
3. Run `npm run dev`.

Supabase project: `apyuwfgrjyogyoxekejb` (Canada Central).

## Security

Only the Supabase **publishable** key belongs in browser environment variables. Never commit secret/service-role keys. Orders, checkout and inventory mutation must be implemented server-side with verified Stripe webhooks and transactional stock reservation before accepting payments. The current storefront is an initial scaffold, **not** a production-ready checkout.
