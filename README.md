# Nihal Rao — Portfolio (React + Vite)

A recruiter-first portfolio built with **React 19, TypeScript, Vite 8, and Tailwind CSS 4**, adapted from the approved evidence-first portfolio design.

## Run locally

Requirements: Node.js **22.12+** (Vite 8 works on modern Node; Node 22 recommended), npm.

```powershell
npm install
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173`). The homepage, all three case-study URLs, and the public résumé work locally.

## Check and build

```powershell
npm run lint
npm run build
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

- All public résumé links point to the phone-redacted PDF.
- Fonts load from Google Fonts with system fallbacks. The site is usable without remote fonts.
- The code uses an absolute-root asset structure suitable for a top-level Vercel domain. If hosting under a GitHub Pages repository subpath, adjust Vite's `base` option and paths.
