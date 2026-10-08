# Shivprasad Mane · Portfolio

Personal portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion** and **Lenis**.

Live: https://shivprasad-mane.vercel.app

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

All text, projects, experience, skills and links live in **`data/config.ts`**. Change them there; the components read from it.

## Contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID: the part after `/f/` in the endpoint (e.g. `https://formspree.io/f/xyzabcde` → `xyzabcde`).
3. Either paste it into `contact.formspreeId` in `data/config.ts`, or set `NEXT_PUBLIC_FORMSPREE_ID` in Vercel → Settings → Environment Variables and redeploy.

Until an ID is set, the form asks visitors to email directly.

## SEO

- Metadata, Open Graph and Twitter cards in `app/layout.tsx`
- Dynamic share image at `/og`, favicon at `/icon`, Apple icon at `/apple-icon`
- `sitemap.xml`, `robots.txt` and `manifest.webmanifest` generated from `app/`
- JSON-LD structured data (WebSite, ProfilePage, Person)
- Optional: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to verify in Google Search Console

## Motion

Smooth scrolling (Lenis), scroll-linked hero parallax, stacking project cards, scroll-lit text, velocity marquee, magnetic buttons and masked title reveals. Everything is disabled automatically for visitors who prefer reduced motion.

## Deploy

Pushing to `main` deploys automatically on Vercel.
