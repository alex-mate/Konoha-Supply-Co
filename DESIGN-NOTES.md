# Konoha Supply Co. — Design pass

## Run locally

```bash
npm ci
npm run dev
npm run test:run
npm run lint
npm run build
```

The archive intentionally excludes `.git`, `node_modules` and `dist`. To keep your Git history, extract into a temporary folder and copy the contents over your existing project; do not delete your existing `.git` folder. Existing tests are unchanged.

## Changes

- Added a reusable brand mark and page banner, with a real-text hero and cropped storefront artwork from the approved mockup.
- Added parchment and dark wood textures, matching serif typography, leaf emblem, custom favicon, responsive navigation, category grid and featured product cards.
- Shop: responsive category sidebar, original search/category/sort controls, result count and product grid. All additional sidebar category buttons use the existing URL filter.
- Cart: responsive cart rows and order summary; preserves quantity controls, remove, totals and shared state. No fake checkout, coupons or dispatch charges.
- Converted the four category illustrations (originally PNG data with a .webp extension) into smaller, correctly encoded WebP files.
- Replaced invalid `<content>` in Hero with `<div>` and removed unused imports/variables. Preserved the live MockAPI endpoint and cart logic.
- Added accessible input labels, focus styles and reduced-motion styles. The visual design is an interpretation of the original mockups: no attempt to implement unavailable checkout or bundle features.

## Verification

All 73 original tests in 7 suites pass, and the production build and ESLint pass in the working environment. Browser screenshot verification was blocked by the environment's navigation policy; manual visual review on your machine is still needed. Deployment settings were not changed; GitHub Pages routing/base configuration is a separate step.

## V2 refinement

- Removed the Explore Collection arrow and circular arrow decoration from the category links (including the CSS rule).
- Replaced the parchment and wood textures with subtle periodic textures to avoid visible tile seams. Added decorative SVG clouds, sakura, and accessible interface icons.
- Refined contrast, product typography, rarity/stock labels, hero artwork visibility, and mission banner (reuses the provisions illustration). The existing hero crops remain unchanged.
- Added the cart icon and count badge, desktop cart column headings, product descriptions, trash icon, highlighted summary, and sticky summary on desktop. At narrower widths the cart switches to a stacked layout. No new commerce functions or dependencies were added.
- All 73 existing tests still pass; ESLint and production build pass. Chromium navigation remains blocked by the environment; desktop and mobile rendering still needs manual review. 
