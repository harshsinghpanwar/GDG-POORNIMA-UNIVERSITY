# GDG on Campus Poornima University - Chapter Portal
*Independent Community Web Portal for Poornima University, Jaipur, Rajasthan, India*

[![Built with React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AA-emerald)](#7-accessibility--standards)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 1. Overview & Community Identity
This is an independent community portal for **GDG on Campus Poornima University - Jaipur, India**. Built by students for students, the site represents an active, welcoming university developer community for coding, software engineering, AI, cloud computing, and open-source collaboration.

### Independence and Legal Trademark Notice
> **Notice**: A community website for GDG on Campus Poornima University. It is not an official Google website. Google and Google Developer Groups are trademarks of Google LLC.
> 
> GDG on Campus Poornima University is an independent student group at Poornima University, Jaipur. Activities and the opinions expressed here should in no way be linked to Google, the corporation. The site features an original "branch-graph" visual motif (4 colored nodes: blue, red, yellow, green) symbolizing collaborative code merges, and does not copy, hotlink, or imitate official Google Developer Groups angle-bracket logos.

---

## 2. Router Mode Justification
In accordance with Section 4 and Section 6 of the architectural specification:

- **Router Mode Selected**: `BrowserRouter` (HTML5 History API)
- **Why Hash Routing Was Rejected**: Hash-based URLs (`/#/events`, `/#/about`) degrade user experience, introduce fragment ambiguity in accessibility announcements, hinder canonical indexing, and produce ugly links when shared across social channels.
- **Deep-Link & SPA Handling**:
  - In development: Vite handles fallback routing automatically.
  - In production: Configured with `/* /index.html 200` in both `public/_redirects` and `netlify.toml`. Direct visits or browser reloads on deep links (such as `/events/build-with-ai-lets-hack-it-2026`, `/team`, or `/resources?topic=Web`) resolve cleanly to the index HTML without 404 errors.
  - On every route change, `PageShell` scrolls to top, transfers programmatic focus to the `h1` heading or main landmark, and fires an `aria-live` announcement for assistive technologies.

---

## 3. Local Development Setup

### Prerequisites
- **Node.js**: Version 18.x, 20.x, or 22.x (Node 22 LTS recommended)
- **Package Manager**: `npm` (v9 or v10) or `bun`

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/gdg-poornima/gdg-poornima-portal.git
   cd gdg-poornima-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. **Verify TypeScript compilation & linting**:
   ```bash
   npm run lint
   ```
   Runs `tsc --noEmit` across all application files.

5. **Create a production build**:
   ```bash
   npm run build
   ```
   Compiles optimized production bundles into the `dist/` directory.

6. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 4. Project Structure & Key Files

```
├── public/
│   ├── _redirects                  # Netlify / Cloudflare SPA rewrite rule (/* /index.html 200)
│   ├── favicon.svg                 # Original branch-graph SVG icon with 4 colored nodes
│   ├── robots.txt                  # Web crawler directives & sitemap location
│   └── sitemap.xml                 # Search engine XML sitemap
├── docs/
│   ├── DEPLOYMENT.md               # Netlify free-tier and custom domain deployment guide
│   ├── CONTENT_GUIDE.md            # Content maintenance instructions for chapter organizers
│   ├── FIREBASE_FUTURE.md          # Architectural plan for future Firestore migration
│   └── QA_REPORT.md                # Comprehensive QA report covering all routes & tests
├── src/
│   ├── config/
│   │   └── community.ts            # Central chapter metadata, verified channels, & notices
│   ├── data/
│   │   ├── events.ts               # 4 verified past events with IST timestamps & venues
│   │   ├── team.ts                 # Exactly 3 verified organizers with roles & roster notice
│   │   ├── projects.ts             # Shipped empty array [] + commented data model
│   │   ├── resources.ts            # Exactly 13 authoritative educational URLs
│   │   ├── faqs.ts                 # Verified community Q&As across 7 categories
│   │   └── learningAreas.ts        # 6 learning areas linking to resources
│   ├── services/
│   │   └── dataSource.ts           # Asynchronous IDataSource repository pattern
│   ├── lib/
│   │   ├── eventStatus.ts          # Runtime clock comparison for upcoming vs past events
│   │   ├── format.ts               # Date & time formatting in Asia/Kolkata (IST)
│   │   ├── safeUrl.ts              # Strict https: protocol verification for links
│   │   ├── seo.ts                  # Document title and meta description sync hook
│   │   ├── search.ts               # Substring search & match utilities
│   │   └── validation.ts           # Client-side form input validation
│   ├── components/
│   │   ├── brand/                  # Logo (with Poornima University), BranchMotif, HeroIllustration
│   │   ├── features/               # EventCard, EventFilters, TeamCard, ResourceCard, ContactForm
│   │   ├── icons/                  # Accessible brand SVGs (WhatsApp, Telegram, etc.)
│   │   ├── layout/                 # PageShell, Header, MobileMenu, Footer, SkipLink
│   │   └── ui/                     # Container (1200px), Button, Card, Badge, Field, etc.
│   ├── pages/                      # 13 dedicated page routes (Home, About, Events, etc.)
│   ├── types/
│   │   ├── community.ts            # Domain TypeScript interfaces (Events, Team, Projects)
│   │   └── index.ts                # Re-exports & backward compatibility
│   ├── routes.tsx                  # Lazy-loaded route definitions with Suspense fallbacks
│   ├── App.tsx                     # Top-level BrowserRouter provider
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Tailwind v4, Bricolage Grotesque / Inter / JetBrains Mono
├── netlify.toml                    # Netlify production build & redirect config
├── metadata.json                   # Applet metadata
├── tsconfig.json                   # Strict TypeScript compiler options
└── vite.config.ts                  # Vite build configuration with Tailwind plugin
```

---

## 5. Content Updates & Image Handling

### Updating Chapter Content
All community content is separated into typed data files in `src/data/` and accessed through the asynchronous `src/services/dataSource.ts` repository layer. For step-by-step guidance, refer to **`docs/CONTENT_GUIDE.md`**.

### Adding Chapter Photos
- **Zero Stock Photos**: Do not use generic stock photos pretending to be chapter members.
- **Student Privacy & Consent**: Only photos with explicit consent from the students may be published.
- **Image Assets**: Place authorized JPG, WebP, or PNG images in `public/images/`.
- **Referencing Photos**: Reference the image path in `src/data/team.ts` or `src/data/events.ts` (e.g., `/images/team-harsh.jpg`).
- **Initial-Based Fallback**: When no photo is provided, the UI automatically renders an elegant initials-based circular avatar in the chapter's brand palette.

---

## 6. Environment Variables

Create a `.env` file in the project root if you wish to configure optional variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_SITE_URL` | `https://gdg-poornima.netlify.app` | Canonical site URL for OpenGraph and sitemap links. |
| `VITE_CONTACT_ENDPOINT` | *(empty)* | HTTPS form processing endpoint (e.g. Formspree, Formspark, Netlify Forms). |

### Behavior When Variables Are Missing:
- **`VITE_SITE_URL` Missing**: The app defaults to `https://gdg-poornima.netlify.app` and uses relative pathing.
- **`VITE_CONTACT_ENDPOINT` Missing**: The contact form in `/contact` remains completely functional for typing and validating fields, but the Submit button is gracefully disabled with an explanatory note: *"Contact form submissions are temporarily offline while our backend endpoint is being configured. Please reach out to us directly on WhatsApp or Telegram."* No fake submissions or simulated success alerts are triggered.

---

## 7. Open Items for Chapter Organizers

The following 5 items require organizer attention or verification:

1. **LinkedIn URL Discrepancy**:
   - The body text of the official chapter page links to `https://www.linkedin.com/company/gdg-poornima/`.
   - The header social button on the official chapter page links to `https://www.linkedin.com/company/gdg-poornima-university/`.
   - *Status*: Configured `https://www.linkedin.com/company/gdg-poornima/` in `src/config/community.ts`. Organizers are encouraged to standardize the link on the official chapter profile.

2. **Contact Form Endpoint (`VITE_CONTACT_ENDPOINT`)**:
   - The contact form is wired to POST submissions to `VITE_CONTACT_ENDPOINT`.
   - *Action*: Configure an endpoint service (e.g., Formspree, Netlify Forms, Formspark) in the Netlify site settings.

3. **Custom Domain for Sitemap and Canonical Links**:
   - The sitemap (`public/sitemap.xml`) and canonical tags currently use `https://gdg-poornima.netlify.app`.
   - *Action*: When a custom domain (e.g., `gdgpoornima.org` or `gdg.poornima.edu.in`) is attached, update `public/sitemap.xml` and `VITE_SITE_URL`.

4. **Real Team Photos and Bios**:
   - The 3 verified organizers (Harsh Panwar, Chirag Sharma, Dr. Ajay Khunteta) are configured with initial-based avatars and verified roles.
   - *Action*: When high-resolution authorized headshots and approved bios are gathered, add them to `public/images/` and update `src/data/team.ts`.

5. **Social Share Preview Cards on Static Hosting**:
   - The SPA `<head>` includes OpenGraph and Twitter card meta tags. Because search scrapers (like WhatsApp, Twitter, and LinkedIn) do not execute client-side JavaScript, they read the default tags from `index.html`.
   - *Action*: For per-event social preview images, enable Netlify Prerendering or use Cloudflare Workers HTML Rewriter.

---

## 8. Accessibility & Standards (WCAG 2.2 AA)
- **Display Typography**: Bricolage Grotesque for headings; Inter for body copy; JetBrains Mono for code accents. (Google Sans is never used).
- **Type Scale**: Fluid clamp-based scale with strong hierarchy; body copy constrained to 60-75 characters per line for reading comfort.
- **Container**: Max width strictly capped at 1200px with responsive gutters.
- **Focus Rings**: Universal 2px blue ring (`#1A73E8`) with 2px offset on all interactive components.
- **Color Contrast**: All normal text exceeds 4.5:1 (WCAG AA); headings and body exceed 7:1 (WCAG AAA); yellow accent (`#F9AB00`) is strictly used for decorative fills and never as bare text on light backgrounds.
- **Screen Reader Support**: Skip link (`<SkipLink />`), ARIA landmark regions, `aria-current="page"`, `aria-expanded` toggles, and live polite route announcements.
- **Reduced Motion**: All animations and transforms are wrapped with `prefers-reduced-motion` media queries.
