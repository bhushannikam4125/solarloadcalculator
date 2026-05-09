# Deployment TODO (solar-load-calculator/*)

- [ ] Create/update Render backend config: ensure CORS_ORIGIN and env vars (JWT_SECRET)
- [x] Update backend CORS to be safe when CORS_ORIGIN is missing; allow only production origin when set
- [x] Create/update frontend production env: `solar-load-calculator/frontend/.env.production` with VITE_API_BASE_URL (Render URL)

- [ ] Ensure Excel download uses authenticated blob download (fix if link-only approach exists)
- [ ] Generate/verify `solar-load-calculator/frontend/vercel.json` for SPA rewrites
- [ ] Create Render deployment settings (env vars + build/start command) and list exact steps
- [ ] Create Vercel deployment settings (build command + framework preset) and list exact steps
- [ ] Replace any remaining localhost usage via env
- [ ] Provide exact terminal commands step-by-step for both deployments

