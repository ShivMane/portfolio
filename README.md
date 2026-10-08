# Personal Portfolio — Next.js 14

A production-ready, animated personal portfolio website built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Animated mesh/aurora gradient** backgrounds and glassmorphism cards
- **Dark + light mode** with smooth transitions (respects `prefers-reduced-motion`)
- **Cursor-following spotlight** glow and custom animated cursor (desktop only)
- **Floating particle** field rendered with pure CSS
- **Scroll-triggered reveal animations** via Intersection Observer + Framer Motion
- **Magnetic buttons** and 3D tilt on project cards
- **Preloader** animation (skipped on subsequent session visits)
- **Scroll progress bar** at the top of the page
- **Sticky navbar** that shrinks on scroll + smooth-scroll anchor links
- **7 fully-featured sections**: Hero, About, Skills, Projects, Experience, Testimonials, Contact
- **Filterable project grid** with detail modal (accessible focus trap)
- **Animated vertical timeline** for experience
- **Infinite testimonial carousel** (pauses on hover/focus; static grid for reduced-motion)
- **Contact form** with Zod validation and Resend email delivery
- **SEO metadata** + Open Graph + Twitter cards
- **Lighthouse 90+** targeting: minimal critical JS, CSS-only animations, lazy-loaded effects

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Personalising the Content

**All site content lives in a single file: `data/config.ts`.**

Open it and update:

| Export | What it controls |
|--------|-----------------|
| `siteMeta` | Name, title, description, URL, OG image |
| `navLinks` | Navigation items |
| `hero` | Headline, roles, tagline, CTA buttons |
| `about` | Bio paragraphs, avatar path, stat highlights |
| `skills` | Tech stack items with category, level, icon, colour |
| `projects` | Project cards — title, description, tags, URLs |
| `experience` | Work history timeline |
| `testimonials` | Quote cards |
| `socialLinks` | GitHub / LinkedIn / Twitter / email links |
| `contact` | Contact section heading and location |

Replace the placeholder avatar at `public/images/avatar.svg` with a real photo (`public/images/avatar.jpg` — update the `src` in `data/config.ts` accordingly).

---

## Configuring the Contact Form

The contact form sends emails via [Resend](https://resend.com) — a developer-friendly transactional email API.

### Steps

1. **Create a Resend account** at [resend.com](https://resend.com) (free tier: 100 emails/day).
2. **Generate an API key** → Settings → API Keys → Create API Key.
3. **Verify your domain** (optional for testing — unverified senders use `@resend.dev` by default).
4. **Copy `.env.example` to `.env.local`** and fill in the values:

```bash
cp .env.example .env.local
```

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=hello@yourdomain.com
FROM_EMAIL=portfolio@yourdomain.com   # must match a verified Resend domain
```

If the env vars are not set, the form displays a friendly "not yet configured" message instead of failing silently.

---

## Building for Production

```bash
npm run build
npm start
```

---

## Deploy to Vercel

The project is Vercel-ready with zero configuration.

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deploy

```bash
# Install the Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment variables on Vercel

In the Vercel dashboard → Your Project → Settings → Environment Variables, add:

| Variable | Value |
|----------|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | Address to receive messages |
| `FROM_EMAIL` | Verified sender address (optional) |

---

## Project Structure

```text
├── app/
│   ├── layout.tsx          # Root layout, SEO metadata, ThemeProvider
│   ├── page.tsx            # Page composition with lazy-loaded effects
│   ├── globals.css         # CSS variables, aurora keyframes, glass utilities
│   └── api/contact/        # Resend-powered contact API route
├── components/
│   ├── layout/             # Navbar, Footer, Preloader, ScrollProgress
│   ├── ui/                 # Button, GlassCard, Modal, Tooltip, ThemeToggle
│   ├── effects/            # AuroraBackground, Spotlight, CustomCursor, Particles, ScrollReveal
│   └── sections/           # Hero, About, Skills, Projects, Experience, Testimonials, Contact
├── data/
│   └── config.ts           # ← Edit this file to personalise your portfolio
├── lib/
│   ├── animations.ts       # Framer Motion variants
│   ├── utils.ts            # cn(), debounce, lerp helpers
│   └── hooks/              # Custom React hooks
├── providers/
│   └── ThemeProvider.tsx
├── public/images/          # Avatar, project thumbnails (replace with your own)
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

---

## Accessibility

- Skip-to-content link for keyboard users
- All icon-only buttons have `aria-label`
- Project modal: focus trap, `Escape` to close, `role="dialog"`, `aria-modal`
- Keyboard-navigable filter tabs (`role="tablist"`)
- Form fields linked to error messages via `aria-describedby`
- `prefers-reduced-motion`: disables aurora animations, custom cursor, particle field, and carousel auto-scroll
- Visible `:focus-visible` rings on all interactive elements

---

## Lighthouse Tips

The site is pre-optimised, but after replacing placeholder images with real photos:

- Use `next/image` with the `priority` prop for the above-the-fold avatar.
- Add real `width` and `height` to any `<img>` tags.
- Replace the placeholder `public/images/og.png` with a real 1200×630 Open Graph image.
- Run `npm run build && npm start`, then audit with Chrome DevTools → Lighthouse.

---

## License

MIT — use freely for your own portfolio.
