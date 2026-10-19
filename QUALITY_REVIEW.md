# Conversion review — React + Vite

## Recruiter effectiveness

Homepage opens with a clear software/ML positioning statement, UMD credentials, 4.0 GPA, Summer 2027 availability, selected work, and a résumé CTA. Sentinel leads, InterceptIQ follows, and FocusMate is third. All primary CTAs and GitHub/demo URLs are preserved.

## Technical integrity

Project disclaimers are conspicuous. InterceptIQ's synthetic shipment data and Sentinel's simulated engine telemetry are not presented as commercial deployments. FocusMate is described as face-presence detection, with a 200 ms client submission interval; its 90.5% figure is explicitly a 200-frame face-presence benchmark. The 30 FPS and distraction-reduction claims were removed because the implementation and repository evidence do not substantiate them. Visuals are labeled conceptual rather than presented as measured data traces. InterceptIQ's public demo is explicitly separated from its local service stack.

## Design / accessibility

Preserved the restrained near-black/cool-blue design, editorial projects, reduced-motion CSS, semantic headings/landmarks, skip link, keyboard-focus rings, and responsive layouts. Mobile navigation uses an accessible toggle with an Escape handler. All portfolio links use real anchors and all case-study URLs are independently addressable.

## Frontend / deployment

Removed Next.js imports, directives, metadata APIs, special routes, and runtime. Implemented a Vite 8 multi-page build, Tailwind's Vite plugin, static per-route HTML metadata, real résumé asset, favicon, share image, optional production canonical URLs and sitemap. Dependencies are React/ReactDOM + the Vite/Tailwind/TypeScript build toolchain—no router or animation library.

## Validation boundaries

The original review could not install packages. GitHub subsequently recorded a successful Vercel deployment for commit 40e16e1 on October 9, 2026; this does not establish that every page was browser-tested.

The interview corrections include executable tests for root/subpath routes, explicit index.html URLs, asset paths, deployment origin validation, and canonical/share-image paths. These tests pass locally. Package installation remains blocked by npm-registry DNS in the editing environment, so local lint/build/browser verification is not claimed. The added GitHub Actions workflow runs tests, lint, and production builds for both supported deployment bases; its result is recorded in GitHub checks.
