# Lemozin — Personal Driving Mentor

A single-page website for Lemozin, a personal driving mentor based in Calicut,
Kerala.

The site is built with React, TypeScript, and Vite. It uses the official logo
artwork from the supplied brand book and locally hosted, optimised photography.

## Run locally

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The static output is written to `dist/`.

## Deploying to Cloudflare

### Option A — Cloudflare Pages with Git (recommended)

In the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git**
2. Authorise the **Cloudflare Pages** GitHub App and grant it access to
   `yaminbinyoosuf/lemozin_Web`.
3. Use **Build command** `npm run build` and **Build output directory** `dist`.

If the dashboard shows **“Missing git connection”**, the GitHub App has not
been installed on the account that owns the repository, or it was installed
without access to this repo. Open GitHub → **Settings → Applications →
Installed GitHub Apps**, configure the Cloudflare app, and add
`lemozin_Web`. A Cloudflare Pages project using Git must have this app
connection; selecting the repo in the dropdown alone is not enough.

### Option B — Deploy from the command line

This bypasses the GitHub App connection entirely:

```bash
npx wrangler login          # choose the Cloudflare account that should own the site
npm run deploy:pages        # Cloudflare Pages
# or
npm run deploy              # Cloudflare Workers static assets
```

`wrangler.jsonc` configures the Workers option to serve `dist/` as static
assets. `public/_headers` adds security and cache headers for both options.

### Option C — Pages direct upload

In the dashboard, create a Pages project with **Direct Upload** and drag the
generated `dist/` folder into it. No Git connection is required.

## Project structure

```
src/
  components/     Page sections and UI components
  data/           Verified business details, lessons, and FAQ copy
  hooks/          Navigation and motion helpers
  lib/            WhatsApp link builder
  styles/         Design tokens and all responsive styling
public/
  brand/          Official logo artwork (see brand/README.md)
  images/         Optimised WebP photography
  _headers        Cloudflare security and cache headers
  og-image.png    1200 × 630 social sharing artwork
  favicon*.png    Official monogram app icons
```

## Content and contact

- All enquiry calls to action open WhatsApp at `+91 6235 050 176` with a
  prefilled message. Lesson cards use lesson-specific messages.
- The phone number uses a `tel:` link.
- The FAQ is an accessible accordion with keyboard support.
- The mobile menu traps focus, closes on Escape, and restores focus.
- Motion respects `prefers-reduced-motion`.

## Before launch

1. Replace `https://lemozin.example/` in `index.html` with the confirmed
   production domain (canonical, Open Graph, Twitter, and JSON-LD URLs).
2. Confirm that the published phone number and service area are still current.
3. If the business has an official email address or social profiles, add them
   to `src/data/site.ts` and the contact/footer sections.
4. Re-test the site on the production domain, including link previews.

The site deliberately does not publish prices, hours, reviews, credentials,
or guarantees, because those details were not confirmed.
