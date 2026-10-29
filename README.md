# Sunghyun Kim portfolio

Responsive portfolio built with React, TypeScript, Vite, and Tailwind CSS v4. The charcoal and lime visual system follows `AGENTS.md`, with Manrope served locally and Phosphor icons.

## Run

Requires Node.js 22.12+ or a newer supported version.

```bash
npm install
npm run dev
```

Open http://127.0.0.1:5173.

```bash
npm run build
npm run preview
```

The production output is in `dist/`.

## Content and behavior

- `src/content.ts`: name, email, social links, projects, academic activities, and FAQs, carried over from the original portfolio. Confirm personal details before publishing.
- `src/components/`: page sections, mobile navigation, contact form, repository states, and scroll effects.
- `src/styles.css`: Tailwind theme and the responsive visual system.
- Section reveals use IntersectionObserver. The word reveal uses one passive scroll listener throttled with requestAnimationFrame. Both respect reduced motion.
- The native dialog mobile menu supports keyboard focus trapping, Escape, and scroll locking.
- The GitHub section fetches public repositories with cancellation, an eight second timeout, loading skeletons, empty state, and retry. No credentials required.
- Contact validates required fields and email, then opens a draft in the visitor’s mail app. **It does not send email automatically or use a backend.**
- Interface previews are illustrations with sample data. They are not live project results.
- No analytics, tracking cookies, or browser persistence are included.
- `/privacy`, `/terms`, and unknown routes render branded pages. `public/404.html` is also available for static hosts.

## Verify

```bash
npx playwright install chromium
npm test
```

Tests cover desktop/mobile layout, keyboard navigation, mobile menu behavior, form validation, repository states, word reveals, reduced motion, legal pages, and unknown routes. GitHub responses are mocked for deterministic tests.

With the development server running, `npm run capture` saves desktop and mobile screenshots to `artifacts/`, checks live GitHub and project links, and regenerates `public/social-preview.png`.

## Publish

Deploy `dist/` to a static host. `_redirects` maps the legal routes for hosts that support it, including Netlify and Cloudflare Pages. For other hosts, route `/privacy` and `/terms` to `index.html`, and use `404.html` with a 404 response for unknown paths. Subdirectory hosting needs a Vite `base` and matching root links.

Before publishing, set the Open Graph and Twitter image URLs in `index.html` to the absolute public URL of `/social-preview.png`. Add the final canonical URL once a domain is selected. No deployment is performed by the local build.
