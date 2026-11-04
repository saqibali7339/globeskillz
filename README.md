# globeskillz.com

Static site for Globe Skillz: Shopify SEO + Development. Plain HTML/CSS, no build step needed to host it.

## Deploy
- **GitHub Pages:** push this folder to a repo, then Settings → Pages → Deploy from branch (main, / root). `CNAME` already points to globeskillz.com. Set your DNS to GitHub Pages.
- **Netlify / Cloudflare Pages:** connect the repo, no build command, publish directory `/`. `_redirects` (301s for old doorway URLs) only works on these hosts.

## Editing content
Pages are generated from `build/*.js`. Edit content there, then regenerate with `node build/run.js` (run from the repo root). Small text edits can also be made directly in the HTML files.

## After launch
1. Search Console: verify the domain and submit `/sitemap.xml`.
2. Use URL Inspection to request indexing for the home page and the service pages.
3. Make sure old doorway URLs return 301 or 410 (see `_redirects`).
