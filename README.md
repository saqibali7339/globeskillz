# Globe Skillz — Website

Fully static site. Nothing to build, nothing to install.

## Deploy to GitHub Pages (easiest)

1. Create a **new empty repository** on GitHub (public, e.g. `globe-skillz-site`).
2. Upload every file and folder from this bundle to the repo root.
   - `index.html` must sit at the root of the repo.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`** · Folder: **`/ (root)`**
5. Save. In ~1 minute your site will be live at:
   `https://<your-username>.github.io/globe-skillz-site/`

That's it. No build step, no Node, no config.

## Custom domain (`globeskillz.com`)

1. In the repo root, create a file named **`CNAME`** with a single line: `globeskillz.com`
2. At your domain registrar, add a `CNAME` DNS record pointing `www` → `<your-username>.github.io`
   (and four `A` records for the apex domain per GitHub's docs).
3. Back in **Settings → Pages**, enter `globeskillz.com` under Custom domain and tick **Enforce HTTPS** once the certificate provisions.

## Local preview

Just open `index.html` in a browser — everything works. If you want a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What's in the box

| File / folder | What it is |
| --- | --- |
| `index.html` | Home page (hero, about, services, process, portfolio, coverage, stats, testimonials, pricing, FAQ, contact) |
| `location.html` | Dynamic template rendered from `?slug=<slug>&type=loc\|niche` — powers every SEO landing page |
| `styles.css` | Full design system |
| `app.js` | All interactions (cursor, magnetic buttons, tilt, parallax, count-ups, coverage catalog, tweaks panel) |
| `image_slot.js` | Custom element that lets you drop images into placeholders on the live page |
| `assets/` | Logo + any project screenshots you drop in |
| `assets/projects/videos/` | Drop `PR1.mp4` … `PR5.mp4` here to activate the motion showreel row (already wired) |
| `data/index.json` | Master catalog of every location + niche page |
| `data/loc/*.json` | 291 unique location pages (Alabama, Texas, London, Paris, …) |
| `data/niche/*.json` | 299 unique niche pages (doctors, law firms, dentists, plumbers, …) |

## Popular URLs

- Home: `/`
- California SEO page: `/location.html?slug=california&type=loc`
- London SEO page: `/location.html?slug=london&type=loc`
- Divorce Lawyers niche: `/location.html?slug=divorce-lawyers&type=niche`
- Coverage catalog: `/#coverage`

## Adding real project screenshots / owner photo

Two ways:

1. **Drop them on the live site** — every card with a placeholder is a drag-and-drop zone. Once dropped, they persist in the browser's storage. Great for a quick preview.
2. **Add them to the repo** for permanent images that show up for every visitor:
   - Save your image to `assets/projects/bubblebum.jpg` (or similar)
   - In `index.html`, find the matching `<image-slot id="proj-bubblebum" …>` tag and replace it with
     `<img src="assets/projects/bubblebum.jpg" alt="Bubblebum" class="p-card__slot" style="object-fit:cover;">`

## Contact info baked in

- Email: `info@globeskillz.com`
- Phone / WhatsApp: `+92 321 5454557`
- Instagram: `https://www.instagram.com/globeskillz/`
- LinkedIn: `https://pk.linkedin.com/in/saqib-ali-seo`

Edit these in `index.html` and `location.html` if they change.

---
© 2026 Globe Skillz. Built by Saqib Ali.
