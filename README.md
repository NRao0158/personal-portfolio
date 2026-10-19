# Nihal Rao — Portfolio (React + Vite)

A recruiter-first portfolio built with **React 19, TypeScript, Vite 8, and Tailwind CSS 4**, adapted from the approved evidence-first portfolio design.

## Run locally

Requirements: Node.js **22.12+** (Vite 8 works on modern Node; Node 22 recommended), npm.

```powershell
npm ci
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173`). The homepage, all three case-study URLs, and the public résumé work locally.

## Check and build

```powershell
npm run check
npm run preview
```

The generated static site is in `dist/`. Deploy **`dist`**, not `src/`.

## Pages

- `/` — recruiter-first homepage
- `/projects/sentinel/` — leakage-aware predictive maintenance
- `/projects/interceptiq/` — ML + event-driven backend
- `/projects/focusmate/` — real-time CV and accessibility

This is a **Vite multi-page React app**, not a React Router SPA. Every URL has its own source HTML with title, description, and social tags. Pages are assembled from reusable React components and shared structured data in `src/data/projects.ts`. Vite compiles the four HTML entries to separate routes; there is no Next.js dependency and no client-side routing dependency.

## Maintenance

- Content: `src/data/projects.ts` and `src/data/site.ts`
- Home page: `src/pages/Home.tsx`
- Project pages: `src/components/ProjectCaseStudy.tsx`
- Visuals: `src/components/TechnicalVisuals.tsx` (conceptual SVGs, not real dashboard screenshots)
- Styling: `src/styles.css`
- Metadata: `index.html` and `projects/*/index.html`
- Sitemap/canonical links: `scripts/postbuild.mjs`
- Public résumé: `public/resume.pdf` (phone-redacted)
- Social image: `public/og-cover.png`

The UI uses no large animation library. Motion honors `prefers-reduced-motion`. The original project disclaimers remain: Sentinel runs on NASA-simulated engine data, InterceptIQ uses entirely synthetic shipments, and FocusMate is not a clinical treatment.

## Notes

- All public résumé links open the phone-redacted PDF in a new tab for preview.
- Fonts load from Google Fonts with system fallbacks. The site is usable without remote fonts.
- Vercel and top-level domains use the default `VITE_BASE_PATH=/`. For repository GitHub Pages, set `VITE_BASE_PATH=/personal-portfolio/` before building and deploy `dist/`. Internal links, résumé assets, route matching, canonical URLs, and sitemap paths use this base.
- Directory URLs and their explicit `index.html` equivalents render the same page.
- Social-image URLs, canonical URLs, and the sitemap use `VITE_SITE_URL` when provided. Otherwise, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (or `VERCEL_URL`) supplies the origin. On other hosts set the actual HTTPS origin explicitly; put any deployment subpath in `VITE_BASE_PATH`, not `VITE_SITE_URL`.
- `npm run check` runs route/metadata tests, lint, TypeScript checks, and the production build. GitHub Actions checks both root and repository-subpath builds on pushes and pull requests. Tests require Node 22.12+.
- FocusMate's benchmark measures face presence on 200 frames, not attention accuracy. The UI submits frames every 200 ms; no 30 FPS or distraction-reduction claim is made.
- InterceptIQ's public prediction/replay demo is separate from its local API/database/queue service.
