# Leo's launch checklist

## Secrets and hosting
- Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel.
- Keep Stripe secret keys and Supabase service-role keys server-side only; never commit them.
- Set production site URL and redirect allowlist in Supabase Auth.
- Configure authorized admin user IDs through a reviewed, privileged setup process.

## Storage
- Create a public Supabase Storage bucket named product-images, with allowed image MIME types and size limits.
- Create storage.objects policies restricting uploads/updates/deletes to admin_users.
- Create public.product_images admin write policies.
- Until the bucket and policies are configured, product images display placeholders.

## Commerce safety
- Do not enable payment collection until the server calculates prices/taxes/shipping from trusted sources.
- Implement transactional inventory reservation, order idempotency, webhook signature verification and refund paths.
- Run Stripe test-mode payment, cancellation, duplicate-webhook and insufficient-stock scenarios.

## QA
- Verify GitHub Actions typecheck and build results.
- Test product variants, inventory, banners, sign-up/sign-in, order isolation and admin RLS.
- Test mobile accessibility, Canada/US address handling and tax rules.
