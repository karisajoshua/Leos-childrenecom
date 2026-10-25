# Barakaz to Leo's migration status

Source: karisajoshua/shopclave-pro-90a8d07b (React/Vite).
Destination: karisajoshua/Leos-childrenecom (Next.js).

## Implemented in Leo's
- Next.js storefront homepage and responsive navigation.
- Live Supabase product catalogue and detail routes.
- Product variants with size, colour, currency and inventory display.
- Client-side shopping bag with local persistence.
- Marketing banners and wishlists schema with RLS.
- Barakaz shippingOptions and deliveryEstimate utilities copied for later integration.

## Still required before production
- Admin authorization and management interface.
- Product image storage and public image rendering.
- Supabase authentication and customer account pages.
- Guest checkout and logged-in checkout.
- Transactional order creation, server-calculated totals, stock reservation and Stripe payment intents.
- Verified Stripe webhooks, idempotency, refunds, return flows.
- Shipping integrations, US holiday handling, sales tax determination.
- SEO, accessibility audit, automated tests, deployment and live QA.

## Migration principles
Do not copy Barakaz production data, credentials, seller commissions, payouts or seller onboarding. Do not use client cart prices as authoritative. Barakaz UI is a reference; all database access must target Leo's schema. Any unported Barakaz component must be adapted for Next.js routing, RLS and server/client boundaries.

## Validation
GitHub Actions CI has been added for type checking and production build. Passing status has not yet been verified.
