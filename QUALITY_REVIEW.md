# Conversion review — React + Vite

## Recruiter effectiveness

Homepage opens with a clear software/ML positioning statement, UMD credentials, 4.0 GPA, Summer 2027 availability, selected work, and a résumé CTA. Sentinel leads, InterceptIQ follows, and FocusMate is third. All primary CTAs and GitHub/demo URLs are preserved.

## Technical integrity

The metrics were carried over from the attached résumé and project repositories. Project disclaimers are conspicuous. InterceptIQ's synthetic shipment data and Sentinel's simulated engine telemetry are not presented as commercial deployments; FocusMate's pilot estimate remains qualified. Visuals are conceptual SVGs rather than fabricated screenshots.

## Design / accessibility

Preserved the restrained near-black/cool-blue design, editorial projects, reduced-motion CSS, semantic headings/landmarks, skip link, keyboard-focus rings, and responsive layouts. Mobile navigation uses an accessible toggle with an Escape handler. All portfolio links use real anchors and all case-study URLs are independently addressable.

## Frontend / deployment

Removed Next.js imports, directives, metadata APIs, special routes, and runtime. Implemented a Vite 8 multi-page build, Tailwind's Vite plugin, static per-route HTML metadata, real résumé asset, favicon, share image, optional production canonical URLs and sitemap. Dependencies are React/ReactDOM + the Vite/Tailwind/TypeScript build toolchain—no router or animation library.

## Validation boundaries

Verified syntax with a TypeScript parser, checked expected files/link targets, and confirmed the public résumé text does not contain the private phone number. **npm package installation was unavailable in this execution environment (npm registry DNS errors), so a real `npm run build`/`npm run lint`/browser test must be performed on your computer before deployment.** This is a known validation limitation, not an assertion that the build has passed.
