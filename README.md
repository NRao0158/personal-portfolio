# Nihal Rao — Portfolio (React + Vite)

A recruiter-first portfolio built with **React 19, TypeScript, Vite 8, and Tailwind CSS 4**, adapted from the approved evidence-first portfolio design. This is **not a Next.js project**.

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

## Deploy to Vercel

1. Push the files to `NRao0158/personal-portfolio` (instructions below).
2. Import that GitHub repository in Vercel. Choose **Vite**; build command `npm run build`, output directory `dist`, root directory `./`.
3. First deploy to obtain the real public URL. Then add the environment variable `VITE_SITE_URL` to the **production** environment in Vercel. Use your real `https://...` origin with no trailing slash.
4. Redeploy. The `postbuild` script then adds absolute canonical URLs, OG/Twitter image URLs, and `sitemap.xml`. Without this variable, the build still works; it deliberately omits fictional canonical URLs and a site-specific sitemap.
5. Test all three project URLs directly (paste them into a fresh browser tab), the download, navigation, and the external links.

**Do not use the old Next.js variable** `NEXT_PUBLIC_SITE_URL`; Vite uses `VITE_SITE_URL` here. The optional variable is public; never put secrets in a `VITE_*` setting.

### Updating the existing GitHub repo safely

Your existing `personal-portfolio` repository contains an older Vite site. These instructions replace its **tracked source files** while preserving all Git commit history, plus a separate backup branch.

1. Keep a backup of anything uncommitted in the existing local repo. The cleanest route is a fresh clone in another directory:

   ```powershell
   cd C:\Users\nihal\Downloads
   git clone https://github.com/NRao0158/personal-portfolio.git personal-portfolio-deploy
   cd personal-portfolio-deploy
   git status
   git branch backup/before-vite-rebuild
   git push origin backup/before-vite-rebuild
   ```

2. **Only from within that freshly cloned `personal-portfolio-deploy` folder**, remove the old tracked site:

   ```powershell
   git rm -r .
   ```

3. Unzip the new React + Vite portfolio into a separate folder. Copy **the contents of that extracted folder** into `personal-portfolio-deploy`. Include `.gitignore`; do **not** copy `node_modules`, `dist`, `.env.local`, or any `.git` directory from a different repo.
4. Review the changes and run the checks:

   ```powershell
   npm install
   npm run lint
   npm run build
   git status
   git add -A
   git commit -m "Rebuild portfolio with React and Vite"
   git push origin main
   ```

This updates `main` without `--force`. Your earlier website remains in `backup/before-vite-rebuild`. Do not delete `.git/` from the clone.

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
