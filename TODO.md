# Windprof — Todo List

## Critical (Core Functionality)

- [ ] Replace mock data with real DB queries — `mockData.ts` drives almost everything; `getProfs()` / `getProf(id)` need to query Drizzle/D1 instead
- [ ] Prof registration → DB write — Confirm `/prof-register` form POST actually persists to DB (currently unclear)
- [ ] Rider registration → DB write — Same for `/rider-register`
- [ ] Image upload
- [ ] Review submission form — Riders have no way to submit reviews; they're all hardcoded in mock data
- [ ] Improve design of registration forms
- [ ] Forgot password

---

## Important (Product Completeness)

- [ ] Prof publish/unpublish toggle — `isPublished` exists in schema (defaults to `false`) but there's no UI in `/prof-account` to flip it
- [ ] Admin 
- [ ] Email notifications — better-auth is set up but no transactional emails (account confirmation, review notification, verification approved, etc.)

---

## Infrastructure / Pre-launch

- [ ] Wrangler/Cloudflare deployment — Adapter is set to `adapter-cloudflare`; verify D1 bindings, R2 buckets, env vars are wired up
- [ ] Auth email (SMTP) — Password reset / email verification flow requires an SMTP provider
- [ ] SEO metadata — No `<svelte:head>` with `<meta>` tags on most pages (og:image, description, title per page)
- [ ] Error handling — Only `/profs/[id]` has a `+error.svelte`; missing for other routes
