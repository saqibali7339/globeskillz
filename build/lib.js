// Static site generator helpers. Evaluated by the build script with a shared `G` object.
G.SITE = {
  url: 'https://globeskillz.com',
  name: 'Globe Skillz',
  founder: 'Saqib Ali',
  wa: 'https://wa.me/923215454557',
  waDisplay: '+92 321 5454557',
  fiverr: 'https://www.fiverr.com/saqibali000786',
  founded: '2019',
  updated: '2026-11-04',
};
const S = G.SITE;

G.esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
G.abs = p => S.url + (p === 'index.html' ? '/' : '/' + p);

G.icon = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
  arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
};

/* ---------- Schema helpers ---------- */
G.schema = {
  org: () => ({
    '@type': ['Organization','ProfessionalService'],
    '@id': S.url + '/#org',
    name: S.name,
    alternateName: 'GlobeSkillz',
    url: S.url + '/',
    logo: { '@type':'ImageObject', url: S.url + '/assets/brand/logo.jpg', width: 813, height: 813 },
    image: S.url + '/assets/brand/og-default.jpg',
    description: 'Shopify SEO and Shopify development studio led by Saqib Ali. Technical SEO, content, links and international SEO for Shopify stores, backed by development support. Serving merchants worldwide since 2019.',
    foundingDate: S.founded,
    founder: { '@id': S.url + '/#saqib' },
    areaServed: { '@type':'Place', name:'Worldwide' },
    priceRange: '$$',
    knowsAbout: ['Shopify SEO','Technical SEO','Shopify Liquid','Shopify theme development','Core Web Vitals','International SEO','hreflang','Shopify Markets','Structured data','Link building','Generative engine optimization'],
    contactPoint: [{ '@type':'ContactPoint', contactType:'sales', url: S.wa, email:'info@globeskillz.com', availableLanguage:['English','Urdu'], areaServed:'Worldwide' }],
    sameAs: [S.fiverr],
  }),
  person: () => ({
    '@type': 'Person',
    '@id': S.url + '/#saqib',
    name: 'Saqib Ali',
    jobTitle: 'Shopify SEO Lead & Developer',
    worksFor: { '@id': S.url + '/#org' },
    image: S.url + '/assets/brand/saqib-ali.jpg',
    url: S.url + '/about.html',
    sameAs: [S.fiverr],
    knowsAbout: ['Shopify SEO','Technical SEO','Shopify development','Liquid','Core Web Vitals','International SEO'],
  }),
  website: () => ({
    '@type':'WebSite', '@id': S.url + '/#website', url: S.url + '/', name: S.name,
    publisher: { '@id': S.url + '/#org' }, inLanguage: 'en',
  }),
  crumbs: (items) => ({
    '@type':'BreadcrumbList',
    itemListElement: items.map((c,i)=>({ '@type':'ListItem', position:i+1, name:c[0], item: G.abs(c[1]) })),
  }),
  faq: (faqs) => ({
    '@type':'FAQPage',
    mainEntity: faqs.map(f=>({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text: f.a.replace(/<[^>]+>/g,'') } })),
  }),
  page: (type, path, title, desc, extra) => Object.assign({
    '@type': type, '@id': G.abs(path) + '#webpage', url: G.abs(path), name: title, description: desc,
    isPartOf: { '@id': S.url + '/#website' }, inLanguage:'en', dateModified: S.updated,
  }, extra || {}),
};

/* ---------- Nav data (filled once services load) ---------- */
G.nav = () => {
  const seo = G.services.filter(s=>s.pillar==='seo');
  const dev = G.services.filter(s=>s.pillar==='dev');
  return { seo, dev };
};

G.header = (R, path) => {
  const { seo, dev } = G.nav();
  const cur = p => path === p || path.startsWith(p.replace('.html','/')) ? ' aria-current="page"' : '';
  const li = s => `<li><a href="${R}services/${s.slug}.html">${G.esc(s.short)}<span>${G.esc(s.navNote)}</span></a></li>`;
  const mli = s => `<a href="${R}services/${s.slug}.html">${G.esc(s.short)}</a>`;
  return `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container">
    <nav class="nav" aria-label="Main">
      <a class="brand" href="${R === '' ? '/' : R}" aria-label="Globe Skillz home">
        <img src="${R}assets/brand/logo-mark.png" alt="" width="38" height="38">
        <span>Globe Skillz<small>Shopify SEO + Dev</small></span>
      </a>
      <ul class="nav-links">
        <li class="has-mega"><button type="button" aria-expanded="false">Services</button>
          <div class="mega">
            <div><h4>Shopify SEO</h4><ul>${seo.slice(0,6).map(li).join('')}</ul></div>
            <div><h4>Shopify Development</h4><ul>${dev.map(li).join('')}</ul></div>
            <div class="all"><a href="${R}services.html">All ${G.services.length} services →</a></div>
          </div>
        </li>
        <li><a href="${R}results.html"${cur('results.html')}>SEO Results</a></li>
        <li><a href="${R}work.html"${cur('work.html')}>Work</a></li>
        <li><a href="${R}pricing.html"${cur('pricing.html')}>Pricing</a></li>
        <li><a href="${R}about.html"${cur('about.html')}>About</a></li>
        <li><a href="${R}blog.html"${cur('blog.html')}>Blog</a></li>
      </ul>
      <a class="btn btn-primary nav-cta" href="${R}contact.html">Get a free store review</a>
      <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </nav>
    <div class="mobile-nav">
      <h4>Shopify SEO</h4>${seo.map(mli).join('')}
      <h4>Shopify Development</h4>${dev.map(mli).join('')}
      <h4>Globe Skillz</h4>
      <a href="${R}results.html">SEO Results</a><a href="${R}work.html">Work</a><a href="${R}pricing.html">Pricing</a><a href="${R}about.html">About</a><a href="${R}blog.html">Blog</a><a href="${R}faq.html">FAQ</a>
      <a class="btn btn-primary" href="${R}contact.html">Get a free store review</a>
    </div>
  </div>
</header>`;
};

G.footer = (R) => {
  const { seo, dev } = G.nav();
  return `
<footer class="site-footer">
  <div class="container">
    <div class="foot-grid">
      <div>
        <a class="brand" href="${R === '' ? '/' : R}"><img src="${R}assets/brand/logo-mark-white.png" alt="" width="38" height="38"><span>Globe Skillz<small>Shopify SEO + Dev</small></span></a>
        <p class="foot-about">A Shopify SEO studio with development built in. Led by Saqib Ali. Working with merchants worldwide since 2019.</p>
        <a class="btn btn-green" href="${S.wa}" rel="noopener" target="_blank">${G.icon.wa} WhatsApp Saqib</a>
      </div>
      <div><h4>Shopify SEO</h4><ul>${seo.map(s=>`<li><a href="${R}services/${s.slug}.html">${G.esc(s.short)}</a></li>`).join('')}</ul></div>
      <div><h4>Development</h4><ul>${dev.map(s=>`<li><a href="${R}services/${s.slug}.html">${G.esc(s.short)}</a></li>`).join('')}</ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="${R}about.html">About Saqib</a></li>
        <li><a href="${R}results.html">SEO results</a></li>
        <li><a href="${R}work.html">Store builds</a></li>
        <li><a href="${R}case-studies/booster-brand-international-shopify-seo.html">Case studies</a></li>
        <li><a href="${R}reviews.html">Client reviews</a></li>
        <li><a href="${R}pricing.html">Pricing</a></li>
        <li><a href="${R}blog.html">Blog</a></li>
        <li><a href="${R}faq.html">FAQ</a></li>
        <li><a href="${R}contact.html">Contact</a></li>
      </ul></div>
    </div>
    <div class="foot-mark" aria-hidden="true">Globe Skillz</div>
    <div class="foot-bottom">
      <span>© 2026 Globe Skillz. Shopify is a trademark of Shopify Inc. Globe Skillz is an independent studio.</span>
      <span><a href="${R}privacy.html">Privacy</a> · <a href="${R}terms.html">Terms</a> · <a href="${R}sitemap.xml">Sitemap</a></span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${S.wa}" target="_blank" rel="noopener" aria-label="Chat with Saqib on WhatsApp">${G.icon.wa}</a>`;
};

/* ---------- Page shell ---------- */
G.pages = [];
G.page = ({ path, title, desc, body, graph = [], crumbs, ogType = 'website', noindex = false, priority = 0.6, image }) => {
  const depth = path.split('/').length - 1;
  const R = '../'.repeat(depth);
  const canonical = G.abs(path);
  const og = image ? G.abs(image) : S.url + '/assets/brand/og-default.jpg';
  const fullGraph = [G.schema.org(), G.schema.website(), ...graph];
  if (crumbs) fullGraph.push(G.schema.crumbs(crumbs));
  const crumbHtml = crumbs ? `<ol class="crumbs">${crumbs.map((c,i)=> i<crumbs.length-1 ? `<li><a href="${c[1] === 'index.html' ? (R === '' ? '/' : R) : R + c[1]}">${G.esc(c[0])}</a></li>` : `<li aria-current="page">${G.esc(c[0])}</li>`).join('')}</ol>` : '';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${G.esc(title)}</title>
<meta name="description" content="${G.esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Globe Skillz">
<meta property="og:title" content="${G.esc(title)}">
<meta property="og:description" content="${G.esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" type="image/png" href="${R}assets/brand/favicon.png">
<link rel="apple-touch-icon" href="${R}assets/brand/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/css/site.css">
<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org', '@graph': fullGraph })}</script>
</head>
<body>
${G.header(R, path)}
<main id="main">
${body(R, crumbHtml)}
</main>
${G.footer(R)}
<div class="vmodal" role="dialog" aria-label="Case study video"><button type="button" aria-label="Close video">×</button><video controls playsinline preload="none"></video></div>
<script src="${R}assets/js/site.js" defer></script>
</body>
</html>`;
  G.pages.push({ path, html, noindex, priority });
};

/* ---------- Reusable blocks ---------- */
G.cta = (R, h = 'Want to know what’s holding your store back?', p = 'Send me your store URL. I’ll record a short review of the biggest SEO and technical issues I can find — free, and yours to keep whether we work together or not.') => `
<section class="section-sm"><div class="container">
  <div class="cta">
    <div><h2>${h}</h2><p>${p}</p></div>
    <div class="btn-row"><a class="btn btn-light" href="${R}contact.html">Request a free review ${G.icon.arrow}</a><a class="btn btn-outline-light" href="${S.wa}" target="_blank" rel="noopener">${G.icon.wa} WhatsApp</a></div>
  </div>
</div></section>`;

G.faqBlock = (faqs) => `<div class="faq">${faqs.map(f=>`<details><summary>${G.esc(f.q)}</summary><div class="a"><p>${f.a}</p></div></details>`).join('')}</div>`;

G.caseCard = (R, c, opts = {}) => `
<article class="case">
  <div class="case-media">
    <img src="${R}assets/projects/${c.img}" alt="Google Search Console performance report, 3 months: ${c.clicks} clicks and ${c.imp} impressions — ${G.esc(c.title)}" width="900" height="${c.h}" loading="lazy">
  </div>
  <div class="case-body">
    <h3>${G.esc(c.title)}</h3>
    <p>${G.esc(c.note)}</p>
    <dl class="case-stats">
      <div class="c"><dt>Clicks</dt><dd>${c.clicks}</dd></div>
      <div class="i"><dt>Impr.</dt><dd>${c.imp}</dd></div>
      <div><dt>CTR</dt><dd>${c.ctr}</dd></div>
      <div><dt>Pos.</dt><dd>${c.pos}</dd></div>
    </dl>
    ${c.video ? `<button class="video-btn" type="button" data-video="${R}assets/videos/${c.video}">Watch the Search Console walkthrough</button>` : ''}
  </div>
</article>`;

G.workCard = (R, w) => `
<article class="work-card">
  <div class="shot"><div class="shot-bar"><i></i><i></i><i></i><span>${G.esc(w.bar)}</span></div>
    <div class="shot-view"><img src="${R}assets/projects/${w.img}" alt="Full-page screenshot of the ${G.esc(w.name)} website — ${G.esc(w.alt)}" width="800" height="${w.h}" loading="lazy"></div>
  </div>
  <div>
    <h3>${G.esc(w.name)}</h3>
    <p>${G.esc(w.desc)}</p>
    <div class="work-meta">${w.tags.map((t,i)=>`<span class="chip${i===0?' chip-b':''}">${G.esc(t)}</span>`).join('')}</div>
  </div>
</article>`;

G.reviewCard = r => `<figure class="review"><blockquote>${G.esc(r.text)}</blockquote><figcaption><span class="avatar">${r.user.slice(0,2).toUpperCase()}</span><span><b>${G.esc(r.user)}</b>Fiverr buyer · ${G.esc(r.country)}</span></figcaption></figure>`;

G.gscStrip = (c, caption) => `
<div class="gsc">
  <div class="clk"><div class="k">Total clicks</div><div class="v">${c.clicks}</div><div class="n">${c.nClicks||'Organic, last 3 months'}</div></div>
  <div class="imp"><div class="k">Total impressions</div><div class="v">${c.imp}</div><div class="n">${c.nImp||'Google Search'}</div></div>
  <div class="plain"><div class="k">Client stores</div><div class="v">${c.ctr}</div><div class="n">${c.nCtr||''}</div></div>
  <div class="plain"><div class="k">Countries served</div><div class="v">${c.pos}</div><div class="n">${c.nPos||''}</div></div>
</div>${caption?`<p class="gsc-caption">${caption}</p>`:''}`;
