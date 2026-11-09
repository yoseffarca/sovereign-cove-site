# The Sovereign Cove — website

Source for the Sovereign Cove site, recreated from the Lovable draft and hosted on
Wix Headless (site **The Sovereign Cove H**).

**Live site:** https://headless-wbbqawmojss-lazarcharles-140c.wix-site-host.com/
**Wix dashboard:** https://manage.wix.com/dashboard/2a036604-8926-4895-9fe5-f2a08ffaee86

## How deploys work

Every push to `main` runs `.github/workflows/deploy-to-wix.yml`, which builds the
site and runs `wix release` against the site set in `wix.config.json`.

**One-time setup (done):** the workflow uses a Wix API key stored as the `WIX_API_KEY` repository secret. To replace it:

1. Create a key at https://manage.wix.com/account/api-keys — give it access to
   *The Sovereign Cove H* and the permissions needed to manage headless sites
   (e.g. "Manage Headless", "Wix Developers", "Manage Your Site").
2. In GitHub: **Settings → Secrets and variables → Actions → New repository
   secret**, name it `WIX_API_KEY`, paste the key.
3. Re-run the latest workflow (Actions tab → Deploy to Wix → Run workflow).

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs ./dist
```

## Project layout

| Path | What it is |
| --- | --- |
| `src/routes/` | One file per page (`/`, `/about`, `/discover`, `/queries`, `/events/*`) |
| `src/components/` | Header/nav, footer, shared event-page layout |
| `src/content/pages.json` | Page titles, descriptions and share images |
| `src/lib/media.ts` | Image/video URLs (images live in the site's Wix Media Manager) |
| `src/styles.css` | Theme colors, fonts, reveal animations |
| `public/images/` | Event-page hero images |
| `scripts/prerender-routes.mjs` | Writes a static HTML file per page (about.html, …) with its SEO tags |
| `server/entry.mjs` | Small edge worker so clean links like /about load the right page |
| `wix.config.json` | Links this repo to the Wix site |

Stack: Vite, React 19, TanStack Router, Tailwind CSS v4.
