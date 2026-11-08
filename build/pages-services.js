// Service page template + services hub
G.proofBlock = (R, key) => {
  if (G.cases[key]) {
    const c = G.cases[key];
    return `<div class="proof">
      <img src="${R}assets/projects/${c.img}" alt="Google Search Console, 3 months: ${c.clicks} clicks, ${c.imp} impressions — ${G.esc(c.title)}" width="900" height="${c.h}" loading="lazy">
      <div><span class="eyebrow">Real client data</span><h3>${G.esc(c.title)}</h3><p class="muted">${G.esc(c.note)}</p>
        <dl class="case-stats"><div class="c"><dt>Clicks</dt><dd>${c.clicks}</dd></div><div class="i"><dt>Impr.</dt><dd>${c.imp}</dd></div><div><dt>CTR</dt><dd>${c.ctr}</dd></div><div><dt>Pos.</dt><dd>${c.pos}</dd></div></dl>
        ${c.video?`<button class="video-btn" type="button" data-video="${R}assets/videos/${c.video}">Watch the walkthrough</button>`:''}
        <p style="margin-top:18px"><a href="${R}results/">See all SEO results →</a></p></div></div>`;
  }
  if (key === 'booster') return `<div class="proof">
      <img src="${R}assets/projects/confidential-booster-brand-traffic.webp" alt="Organic traffic estimate for the booster brand: 12.7K monthly organic visits, 3.4K ranking keywords" width="1078" height="400" loading="lazy">
      <div><span class="eyebrow">Case study</span><h3>8 markets, 12.7K monthly organic visits</h3><p class="muted">Shopify redesign and international SEO for a kids’ travel booster brand. Organic traffic up 17%, ranking for 3.4K keywords.</p>
      <p><a href="${R}case-studies/booster-brand-international-shopify-seo/">Read the case study →</a></p></div></div>`;
  if (key === 'work') return `<div class="grid g3 trio">${['zermatt','vytal','ebike'].map(k=>G.workCard(R,G.work[k])).join('')}</div>`;
  if (key === 'reviews') return `<div class="reviews">${G.reviews.slice(0,3).map(G.reviewCard).join('')}</div>`;
  return '';
};

G.renderService = (s) => {
  const path = `services/${s.slug}.html`;
  const pillarName = s.pillar === 'seo' ? 'Shopify SEO' : 'Shopify Development';
  const crumbs = [['Home','index.html'],['Services','services.html'],[s.short, path]];
  const offer = { '@type':'Offer', priceCurrency:'USD', price: String(s.price), availability:'https://schema.org/InStock', url: G.abs(path) };
  if (s.unit) offer.priceSpecification = { '@type':'UnitPriceSpecification', price: String(s.price), priceCurrency:'USD', unitCode: s.unit, referenceQuantity:{ '@type':'QuantitativeValue', value:1, unitCode:s.unit } };
  const service = {
    '@type':'Service', '@id': G.abs(path)+'#service',
    name: s.h1.replace(/,.*$/,''), serviceType: s.serviceType,
    description: s.desc, url: G.abs(path),
    provider: { '@id': G.SITE.url + '/#org' },
    areaServed: { '@type':'Place', name:'Worldwide' },
    audience: { '@type':'BusinessAudience', name:'Shopify merchants and e-commerce brands' },
    category: pillarName,
    hasOfferCatalog: { '@type':'OfferCatalog', name: s.short + ' — what’s included', itemListElement: s.included.map(i=>({ '@type':'Offer', itemOffered:{ '@type':'Service', name:i[0], description:i[1] } })) },
    offers: offer,
  };
  const graph = [
    G.schema.page('WebPage', path, s.title, s.desc, { about:{ '@id': G.abs(path)+'#service' }, primaryImageOfPage: G.SITE.url+'/assets/brand/og-default.jpg' }),
    service, G.schema.faq(s.faqs),
  ];
  G.page({ path, title: s.title, desc: s.desc, crumbs, graph, priority: s.hub ? 0.9 : 0.8, body: (R, crumbHtml) => `
<section class="page-hero"><div class="container">
  ${crumbHtml}
  <div class="page-hero-grid">
    <div>
      <span class="eyebrow">${pillarName}</span>
      <h1>${G.esc(s.h1)}</h1>
      <p class="lead">${G.esc(s.lead)}</p>
      <div class="btn-row"><a class="btn btn-primary" href="${R}contact/?service=${s.slug}">Get a free store review ${G.icon.arrow}</a><a class="btn btn-outline-light" href="${G.SITE.wa}" target="_blank" rel="noopener">${G.icon.wa} Ask on WhatsApp</a></div>
    </div>
    <aside class="hero-facts" aria-label="Service at a glance"><dl>${s.facts.map(f=>`<div><dt>${G.esc(f[0])}</dt><dd>${G.esc(f[1])}</dd></div>`).join('')}</dl></aside>
  </div>
</div></section>

<section class="section-sm section-bg"><div class="container">
  <div class="sec-head"><span class="eyebrow">Is this you?</span><h2>Signs you need ${G.esc(s.short.toLowerCase().replace('shopify ','Shopify '))}</h2></div>
  <div class="signals">${s.signals.map(x=>`<div class="signal">${G.esc(x)}</div>`).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head"><span class="eyebrow">What’s included</span><h2>What you get</h2><p class="lead">${G.esc(s.priceLabel)}. Scoped on a call, fixed in writing before work starts.</p></div>
  <div class="incl">${s.included.map((i,n)=>`<div><h3><span class="num">${String(n+1).padStart(2,'0')}</span>${G.esc(i[0])}</h3><p>${G.esc(i[1])}</p></div>`).join('')}</div>
</div></section>

<section class="section section-bg"><div class="container">
  <div class="split">
    <div class="sticky">
      <span class="eyebrow">The detail</span>
      <h2>How I approach ${G.esc(s.short.replace(/ \(.*\)/,''))}</h2>
      <p class="muted">Written by Saqib Ali, Shopify SEO lead & developer at Globe Skillz. Updated November 2026.</p>
      <div class="author-box" style="margin-top:20px;background:#fff"><img src="${R}assets/brand/saqib-ali.jpg" alt="Saqib Ali" width="72" height="72" loading="lazy"><p><b style="color:var(--ink)">Saqib Ali</b><br>Shopify SEO & development since 2019. 180+ projects across 42 countries.</p></div>
    </div>
    <div class="prose">${s.prose}</div>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head"><span class="eyebrow">Proof</span><h2>${s.proof==='reviews'?'What clients say':s.proof==='work'?'Stores I’ve built':'Results from a real client'}</h2></div>
  ${G.proofBlock(R, s.proof)}
</div></section>

<section class="section section-bg"><div class="container">
  <div class="split">
    <div><span class="eyebrow">FAQ</span><h2>${G.esc(s.short)} questions</h2><p class="muted">Have a different question? <a href="${G.SITE.wa}" target="_blank" rel="noopener">Ask me on WhatsApp</a>.</p></div>
    ${G.faqBlock(s.faqs)}
  </div>
</div></section>

<section class="section-sm"><div class="container">
  <div class="sec-head"><span class="eyebrow">Related services</span><h2>Often paired with</h2></div>
  <div class="related">${s.related.map(r=>{const x=G.svc(r);return `<a href="${R}services/${x.slug}/">${G.esc(x.short)}<span>${G.esc(x.navNote)} · ${G.esc(x.priceLabel)}</span></a>`}).join('')}</div>
</div></section>
${s.guides?`<section class="section-sm section-bg"><div class="container">
  <div class="sec-head"><span class="eyebrow">Guides</span><h2>Guides on this topic</h2></div>
  <div class="related">${s.guides.map(g=>{const p=G.post(g);return `<a href="${R}blog/${p.slug}/">${G.esc(p.title)}<span>${p.read} · ${new Date(p.date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span></a>`}).join('')}</div>
</div></section>`:''}
${G.cta(R)}`});
};

G.renderServicesHub = () => {
  const path = 'services.html';
  const title = 'Shopify SEO & Development Services | Globe Skillz';
  const desc = 'All Globe Skillz services: Shopify SEO, audits, technical SEO, content, links, international and AI search, plus development, speed, migration and support.';
  const seo = G.services.filter(s=>s.pillar==='seo'), dev = G.services.filter(s=>s.pillar==='dev');
  const graph = [
    G.schema.page('CollectionPage', path, title, desc),
    { '@type':'ItemList', name:'Globe Skillz services', itemListElement: G.services.map((s,i)=>({ '@type':'ListItem', position:i+1, url: G.abs('services/'+s.slug+'.html'), name: s.short })) },
  ];
  const card = (R,s,feature) => `<a class="card svc-card${feature?' feature':''}" href="${R}services/${s.slug}/"><span class="tag">${G.esc(s.priceLabel)}</span><h3>${G.esc(s.short)}</h3><p>${G.esc(s.lead)}</p><span class="more">Learn more</span></a>`;
  G.page({ path, title, desc, graph, priority:0.9, crumbs:[['Home','index.html'],['Services',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <span class="eyebrow">Services</span>
  <h1>Shopify SEO first, with development support built in</h1>
  <p class="lead">Thirteen services in two groups. SEO is the main work. Development is there so every SEO recommendation can be shipped quickly and correctly.</p>
</div></section>
<section class="section"><div class="container">
  <div class="sec-head-row"><div class="sec-head"><span class="eyebrow">Shopify SEO</span><h2>Rank and get found</h2></div><a class="btn btn-ghost" href="${R}results/">See SEO results</a></div>
  <div class="grid g4">${seo.map((s,i)=>card(R,s,i===0)).join('')}</div>
</div></section>
<section class="section section-bg"><div class="container">
  <div class="sec-head-row"><div class="sec-head"><span class="eyebrow">Shopify Development</span><h2>Build it so it can rank</h2></div><a class="btn btn-ghost" href="${R}work/">See store builds</a></div>
  <div class="grid g3">${dev.map((s,i)=>card(R,s,i===0)).join('')}</div>
</div></section>
${G.cta(R,'Not sure which service you need?','Most stores start with an audit or a free review. Tell me what’s going on and I’ll point you to the right starting point, even if that isn’t me.')}`});
};
