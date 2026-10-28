# Netlify Deployment Guide
**GDG on Campus Poornima University - Jaipur, India**
*Independent Chapter Web Portal*

---

## 1. Overview
This portal is built as a pure static Single Page Application (SPA) using React 19, Vite, and Tailwind CSS v4. It requires no server runtimes or paid cloud subscriptions to operate, and can be hosted completely free of charge on **Netlify's Starter Plan**.

---

## 2. Netlify Build Configuration

### Build Settings
| Setting | Recommended Value | Notes |
| :--- | :--- | :--- |
| **Repository** | Connected Git repository | GitHub or GitLab |
| **Base directory** | `/` (root) | Leave empty or set to root |
| **Build command** | `npm run build` | Compiles Vite production bundle |
| **Publish directory** | `dist` | Contains compiled HTML, JS, CSS, and public assets |
| **Node.js version** | `22` | Pinned in `netlify.toml` |

### Included `netlify.toml`
The repository already includes a pre-configured `netlify.toml` at the project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

---

## 3. Environment Variables

Configure these variables in **Netlify Dashboard > Site configuration > Environment variables**:

| Variable | Recommended Production Value | Description |
| :--- | :--- | :--- |
| `VITE_SITE_URL` | `https://gdg-poornima.netlify.app` *(or your custom domain)* | Used for canonical URL tags, OpenGraph social sharing, and structured schema data. |
| `VITE_CONTACT_ENDPOINT` | *(e.g. `https://formspree.io/f/xyz...`)* | HTTPS POST endpoint that receives contact form messages. If omitted, the form gracefully disables the submit button and directs students to WhatsApp/Telegram. |

---

## 4. SPA Deep-Linking Verification

Because the portal uses client-side routing via `BrowserRouter` (HTML5 History API), any direct URL request (such as reloading `https://your-domain.com/events/build-with-ai-lets-hack-it-2026` or sharing `https://your-domain.com/team`) must return `index.html` with an HTTP 200 status.

This is guaranteed by two independent mechanisms:
1. `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
2. `public/_redirects`:
   ```text
   /*    /index.html   200
   ```
Both configurations are validated and active in the repository.

---

## 5. Custom Domain & DNS Setup

When the chapter or Poornima University IT team assigns a custom domain (e.g., `gdgpoornima.com` or `gdg.poornima.edu.in`):

1. **Add Custom Domain in Netlify**:
   - Go to **Site configuration > Domain management**.
   - Click **Add a domain** and enter your domain name.

2. **Configure DNS Records** (at your registrar or university DNS provider):
   - **Apex domain** (`gdgpoornima.com`):
     - Record type: `A`
     - Name: `@`
     - Value: `75.2.60.5` (Netlify load balancer IP)
   - **Subdomain** (`gdg.poornima.edu.in` or `www.gdgpoornima.com`):
     - Record type: `CNAME`
     - Name: `gdg` (or `www`)
     - Value: `your-site-name.netlify.app`

3. **Automated SSL Certificate**:
   - Netlify will automatically provision a free, auto-renewing **Let's Encrypt SSL certificate** within 1-2 hours of DNS propagation.
   - Force HTTPS is enabled by default.

---

## 6. Free Tier Limits & Operational Guidelines

Netlify's free Starter tier provides generous quotas that easily satisfy chapter traffic:

- **Bandwidth**: 100 GB per month (sufficient for ~250,000+ page views with our lightweight SVG assets).
- **Build Minutes**: 300 minutes per month (each build takes ~20 seconds, accommodating ~900 builds/month).
- **Serverless Functions**: 125,000 requests/month (not currently used; static frontend).

### Best Practices to Maintain Free Tier Stability:
1. **Compress Images**: When adding student photos to `public/images/`, ensure photos are compressed to under 200KB (WebP or optimized JPEG).
2. **Commit Hygiene**: Avoid pushing trivial commits repeatedly to conserve build minutes.
3. **Cache Control**: Vite automatically generates content-hashed assets (`assets/index-*.js`, `assets/index-*.css`) which are cached immutably by Netlify CDN, ensuring blazing-fast repeat loads.
