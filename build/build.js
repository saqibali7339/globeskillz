// Entry: evaluated after lib/data/services/pages are loaded into G.
G.renderHome();
G.renderServicesHub();
G.services.forEach(G.renderService);
G.renderResults();
G.renderWork();
G.renderCaseStudies();
G.renderReviews();
G.renderPricing();
G.renderAbout();
G.renderFaq();
G.renderContact();
G.renderLegal();
G.renderBlog();

const today = G.SITE.updated;
G.sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${G.pages.filter(p=>!p.noindex).map(p=>`  <url><loc>${G.abs(p.path)}</loc><lastmod>${today}</lastmod><priority>${p.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>`;
G.robots = `User-agent: *
Allow: /
Disallow: /build/

Sitemap: ${G.SITE.url}/sitemap.xml
`;
G.llms = `# Globe Skillz

> Shopify SEO studio with development built in, led by Saqib Ali (since 2019). Serves Shopify merchants worldwide, including the US, UK, EU, Gulf, Australia and Pakistan.

## Shopify SEO services
${G.services.filter(s=>s.pillar==='seo').map(s=>`- [${s.short}](${G.abs('services/'+s.slug+'.html')}): ${s.desc}`).join('\n')}

## Shopify development services
${G.services.filter(s=>s.pillar==='dev').map(s=>`- [${s.short}](${G.abs('services/'+s.slug+'.html')}): ${s.desc}`).join('\n')}

## Proof
- [SEO results](${G.abs('results.html')}): 9 client Search Console reports, 195K+ clicks and 9.8M+ impressions over 3 months
- [International case study](${G.abs('case-studies/booster-brand-international-shopify-seo.html')}): 8 markets, 12.7K monthly organic visits
- [Pakistan case study](${G.abs('case-studies/albarik-ecommerce-seo-pakistan.html')})
- [Store builds](${G.abs('work.html')})

## Company
- [About Saqib Ali](${G.abs('about.html')})
- [Pricing](${G.abs('pricing.html')}): SEO from $500/mo, audits from $200, builds from $400
- [Contact](${G.abs('contact.html')}): WhatsApp ${G.SITE.waDisplay}
`;
G.redirects = `# Netlify/Cloudflare Pages style _redirects — retire old doorway URLs (410 = gone for good)
/locations/*   /services/   301
/industries/*  /services/   301
/seo-*         /services/shopify-seo/  301
/wordpress*    /services/   301
`;
