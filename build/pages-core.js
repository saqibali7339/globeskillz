// Home, Results, Work, Case studies, Reviews
const W = G.SITE.wa;

G.renderHome = () => {
  const path = 'index.html';
  const title = 'Shopify SEO & Development Services | Globe Skillz';
  const desc = 'Shopify SEO with development built in: technical SEO, collection pages, content and links for stores worldwide. 9.8M+ client impressions. Free store review.';
  const seo = G.services.filter(s=>s.pillar==='seo'), dev = G.services.filter(s=>s.pillar==='dev');
  const homeFaqs = [
    {q:'What does Globe Skillz do?',a:'Globe Skillz is a Shopify SEO studio with development built in. I help Shopify stores rank higher on Google and in AI search, and I make the theme changes that SEO needs myself.'},
    {q:'Do you work with stores in my country?',a:'Yes. I work with Shopify merchants worldwide: the US, UK, EU, Middle East, Australia, Pakistan and elsewhere. Work is remote, with an agreed overlap window for your timezone.'},
    {q:'How much does Shopify SEO cost?',a:'Monthly Shopify SEO starts at $500/mo. One-time audits start at $200 and store builds at $400. See the pricing page for details.'},
    {q:'Why Shopify only?',a:'Working on one platform means I know its quirks, like duplicate product paths, tag pages, Markets and app bloat, and can fix them quickly. Every client benefits from that.'},
  ];
  const graph = [ G.schema.page('WebPage', path, title, desc, { about:{ '@id': G.SITE.url+'/#org' } }), G.schema.person(), G.schema.faq(homeFaqs) ];
  G.page({ path, title, desc, graph, priority:1.0, body:(R)=>`
<section class="hero"><div class="container">
  <div class="hero-grid solo">
    <div class="hero-copy">
      <span class="eyebrow">Shopify SEO + development · worldwide</span>
      <h1>Shopify SEO that <em>ships</em> in your theme.</h1>
      <p class="lead">I’m Saqib Ali. I help Shopify stores rank on Google and in AI search, and I make the code changes SEO needs in your theme myself. One person handles the strategy and the code.</p>
      <div class="btn-row"><a class="btn btn-primary" href="${R}contact.html">Get a free store review ${G.icon.arrow}</a><a class="btn btn-ghost" href="${R}results.html">See real GSC results</a></div>
      <ul class="hero-ticks"><li>Shopify-only since 2019</li><li>White-hat, update-safe</li><li>US · UK · EU · Gulf · Pakistan</li></ul>
    </div>
  </div>
</div></section>

<div class="container gsc-wrap">${G.gscStrip(G.globalStats, 'Combined Google Search Console totals from nine client properties over three months. Screenshots are on the results page. Client names are withheld; the numbers are real.')}</div>

<section class="section"><div class="container">
  <div class="sec-head center"><span class="eyebrow">Services</span><h2>SEO is the main work. Development is there to support it.</h2><p class="lead">Every service has one goal: more revenue from organic search for Shopify merchants.</p></div>
  <div class="pillar-split">
    <div class="pillar"><div class="pillar-head"><div><span class="eyebrow">01 · Shopify SEO</span><h3 style="font-size:1.6rem;margin:0">Rank and get found</h3></div><div class="price">from<b>$500/mo</b></div></div>
      <ul class="pillar-list">${seo.map(s=>`<li><a href="${R}services/${s.slug}.html"><b>${G.esc(s.short)}</b><span>${G.esc(s.navNote)}</span></a></li>`).join('')}</ul></div>
    <div class="pillar"><div class="pillar-head"><div><span class="eyebrow">02 · Shopify Development</span><h3 style="font-size:1.6rem;margin:0">Build it to rank</h3></div><div class="price">from<b>$400</b></div></div>
      <ul class="pillar-list">${dev.map(s=>`<li><a href="${R}services/${s.slug}.html"><b>${G.esc(s.short)}</b><span>${G.esc(s.navNote)}</span></a></li>`).join('')}</ul>
      <div class="callout" style="margin:18px 0 0"><b>Why both?</b> SEO recommendations only help once they’re live. Because I handle the development too, fixes go out the same week.</div></div>
  </div>
</div></section>

<section class="section section-bg"><div class="container">
  <div class="sec-head-row"><div class="sec-head"><span class="eyebrow">SEO results</span><h2>Real Search Console data from client stores</h2><p class="lead">Last three months of data. Names withheld; the numbers are as reported.</p></div><a class="btn btn-ghost" href="${R}results.html">All 9 case results</a></div>
  <div class="grid g3 trio">${['jewelry','bookstore','vytal'].map(k=>G.caseCard(R,G.cases[k])).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="split split-even" style="align-items:center">
    <div>
      <span class="eyebrow">Featured case study</span>
      <h2>A kids’ travel brand, 8 markets, one Shopify store</h2>
      <p class="lead">A Shopify redesign plus international SEO for a flagship product launch. Then a conversion-focused redesign rolled out to more than 20 countries.</p>
      <div class="stat-row"><div><b>12.7K</b><span>monthly organic visits</span></div><div><b>+17%</b><span>organic growth</span></div><div><b>3.4K</b><span>ranking keywords</span></div></div>
      <div class="btn-row" style="margin-top:28px"><a class="btn btn-primary" href="${R}case-studies/booster-brand-international-shopify-seo.html">Read the case study ${G.icon.arrow}</a></div>
    </div>
    ${G.workCard(R, G.work.booster)}
  </div>
</div></section>

<section class="section section-dark"><div class="container">
  <div class="sec-head"><span class="eyebrow">How it works</span><h2>Four steps, no surprises</h2></div>
  <div class="steps">
    <div class="step"><span class="n">01</span><h3>Free store review</h3><p>You send your URL. I record a short review of the biggest issues I can find.</p><span class="when">Day 1–3</span></div>
    <div class="step"><span class="n">02</span><h3>Audit & roadmap</h3><p>Crawl, theme code, Search Console and competitors, combined into one prioritized plan.</p><span class="when">Week 1–2</span></div>
    <div class="step"><span class="n">03</span><h3>Fix & build</h3><p>Technical fixes in your theme, then collection pages, content and links.</p><span class="when">Month 1–3</span></div>
    <div class="step"><span class="n">04</span><h3>Compound</h3><p>Monthly reports from your own Search Console data. We keep what works and cut what doesn’t.</p><span class="when">Ongoing</span></div>
  </div>
</div></section>

<section class="section"><div class="container">
  <div class="sec-head-row"><div class="sec-head"><span class="eyebrow">Store builds</span><h2>Shopify stores I’ve designed and built</h2></div><a class="btn btn-ghost" href="${R}work.html">All 14 projects</a></div>
  <div class="grid g3 trio">${['zermatt','ebike','sensibelle'].map(k=>G.workCard(R,G.work[k])).join('')}</div>
</div></section>

<section class="section section-bg"><div class="container">
  <div class="sec-head-row"><div class="sec-head"><span class="eyebrow">Client reviews</span><h2>What merchants say</h2><p class="lead">Verified reviews from Fiverr buyers in Ireland, the UK, Canada, France and elsewhere.</p></div><a class="btn btn-ghost" href="${R}reviews.html">Read all reviews</a></div>
  <div class="reviews">${G.reviews.slice(0,6).map(G.reviewCard).join('')}</div>
</div></section>

<section class="section"><div class="container">
  <div class="split">
    <div>
      <span class="eyebrow">About</span>
      <h2>A focused studio, not a large agency</h2>
      <p>Globe Skillz is me, Saqib Ali, working with a small group of trusted writers and outreach partners. You talk to the person doing the work, and that person knows Liquid as well as SEO.</p>
      <p>Since 2019 I’ve shipped 180+ projects for merchants in 42 countries. This version of Globe Skillz focuses on one platform and one goal: Shopify stores that grow through organic search.</p>
      <p><a href="${R}about.html">More about how I work →</a></p>
    </div>
    <div>${G.faqBlock(homeFaqs)}<p style="margin-top:20px"><a href="${R}faq.html">All frequently asked questions →</a></p></div>
  </div>
</div></section>
${G.cta(R)}`});
};

G.renderResults = () => {
  const path='results.html';
  const title='Shopify SEO Results & Case Studies | Globe Skillz';
  const desc='Nine Shopify and e-commerce SEO results with unedited Google Search Console screenshots: 195K+ clicks and 9.8M+ impressions in three months.';
  const graph=[ G.schema.page('CollectionPage',path,title,desc),
    { '@type':'ItemList', name:'SEO case results', itemListElement: G.caseOrder.map((k,i)=>({ '@type':'ListItem', position:i+1, name:G.cases[k].title })) },
    ...G.caseOrder.filter(k=>G.cases[k].video).map(k=>({ '@type':'VideoObject', name:G.cases[k].title+' — Search Console walkthrough', description:G.cases[k].note, thumbnailUrl:G.abs('assets/projects/'+G.cases[k].img), contentUrl:G.abs('assets/videos/'+G.cases[k].video), uploadDate:'2026-09-20' })) ];
  G.page({ path,title,desc,graph,priority:0.9,crumbs:[['Home','index.html'],['SEO Results',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <span class="eyebrow">SEO results</span>
  <h1>Shopify SEO results, straight from Search Console</h1>
  <p class="lead">Unedited three-month Search Console reports from client properties. Names are withheld to protect clients. The clicks, impressions, CTR and positions are as Google reported them.</p>
</div></section>
<div class="container gsc-wrap">${G.gscStrip(G.globalStats)}</div>
<section class="section"><div class="container">
  <div class="grid g2">${G.caseOrder.map(k=>G.caseCard(R,G.cases[k])).join('')}</div>
</div></section>
<section class="section-sm section-bg"><div class="container narrow prose">
  <h2>How to read these numbers</h2>
  <p><b>Clicks</b> are visits from Google Search. <b>Impressions</b> count how often the store appeared in results. <b>Average position</b> is weighted across every query, so a store ranking first for its main terms can still average 15–20 if it also shows up for thousands of long-tail queries. Position matters most alongside clicks.</p>
  <p>Results depend on the niche, the starting point, budget and product. I don’t guarantee rankings, and you should be wary of anyone who does. What I can promise is honest work and reporting from your own Search Console data.</p>
</div></section>
${G.cta(R,'Want results like these for your store?')}`});
};

G.renderWork = () => {
  const path='work.html';
  const title='Shopify Store Design Portfolio | Globe Skillz';
  const desc='Shopify and e-commerce sites designed and built by Globe Skillz: fashion, supplements, e-bikes, furniture, home & garden and multi-market brands.';
  const keys=Object.keys(G.work);
  const graph=[ G.schema.page('CollectionPage',path,title,desc),
    { '@type':'ItemList', name:'Portfolio', itemListElement: keys.map((k,i)=>({ '@type':'ListItem', position:i+1, item:{ '@type':'CreativeWork', name:G.work[k].name, description:G.work[k].desc, image:G.abs('assets/projects/'+G.work[k].img), creator:{ '@id':G.SITE.url+'/#org' } } })) } ];
  const shop=keys.filter(k=>G.work[k].shopify), other=keys.filter(k=>!G.work[k].shopify);
  G.page({ path,title,desc,graph,priority:0.8,crumbs:[['Home','index.html'],['Work',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <span class="eyebrow">Work</span>
  <h1>Stores and sites I’ve designed and built</h1>
  <p class="lead">Real client builds, shown as full-page screenshots. Hover over any frame to scroll through the page.</p>
</div></section>
<section class="section"><div class="container">
  <div class="sec-head"><span class="eyebrow">Shopify & e-commerce</span><h2>Shopify and DTC builds</h2></div>
  <div class="grid g3">${shop.map(k=>G.workCard(R,G.work[k])).join('')}</div>
</div></section>
<section class="section section-bg"><div class="container">
  <div class="sec-head"><span class="eyebrow">Earlier work</span><h2>Other platforms</h2><p class="lead">From before Globe Skillz became Shopify-only. Included for context. New development work is Shopify-only.</p></div>
  <div class="grid g3">${other.map(k=>G.workCard(R,G.work[k])).join('')}</div>
</div></section>
${G.cta(R,'Planning a new Shopify store?','Tell me what you sell and where. I’ll suggest a structure built around search demand before any design work starts.')}`});
};

G.renderCaseStudies = () => {
  // 1. Booster brand
  let path='case-studies/booster-brand-international-shopify-seo.html';
  let title='Shopify SEO Case Study: 8 Markets | Globe Skillz';
  let desc='How a kids’ travel brand launched in 8 markets on Shopify, then 20+ countries, reaching 12.7K monthly organic visits (+17%) and 3.4K keywords.';
  G.page({ path,title,desc,priority:0.8, ogType:'article', image:'assets/projects/confidential-booster-brand-traffic.webp',
    crumbs:[['Home','index.html'],['Work','work.html'],['Booster brand case study',path]],
    graph:[ G.schema.page('WebPage',path,title,desc), { '@type':'Article', headline:'International Shopify SEO for a kids’ travel booster brand', description:desc, author:{ '@id':G.SITE.url+'/#saqib' }, publisher:{ '@id':G.SITE.url+'/#org' }, datePublished:'2026-10-01', dateModified:G.SITE.updated, image:G.abs('assets/projects/confidential-booster-brand-traffic.webp'), mainEntityOfPage:G.abs(path), about:[{ '@id':G.abs('services/shopify-international-seo.html')+'#service' }] } ],
    body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <div class="page-hero-grid"><div>
  <span class="eyebrow">Case study · International Shopify SEO</span>
  <h1>One Shopify store, 8 markets at launch, 20+ countries later</h1>
  <p class="lead">A kids’ travel booster brand needed a flagship launch that would rank in several countries at once. The client’s name is withheld at their request.</p></div>
  <aside class="hero-facts"><dl><div><dt>Platform</dt><dd>Shopify + Markets</dd></div><div><dt>Scope</dt><dd>Redesign, SEO, CRO</dd></div><div><dt>Markets</dt><dd>8 → 20+</dd></div><div><dt>Organic traffic</dt><dd>12.7K / mo (+17%)</dd></div><div><dt>Ranking keywords</dt><dd>3.4K</dd></div></dl></aside></div>
</div></section>
<section class="section"><div class="container">
  <div class="split">
    <div class="sticky"><div class="shot"><div class="shot-bar"><i></i><i></i><i></i><span>booster brand · launch build</span></div><div class="shot-view" style="height:560px"><img src="${R}assets/projects/confidential-booster-brand.webp" alt="Full-page screenshot of the booster brand Shopify store" width="800" height="2603" loading="lazy"></div></div></div>
    <div class="prose">
      <h2>The challenge</h2>
      <p>The brand was launching a flagship travel booster seat in eight markets at once. Every market needed to rank for its own searches, show the right currency and shipping information, and avoid competing with the other country versions on Google.</p>
      <h2>What I did</h2>
      <ul><li><b>Shopify redesign</b> built around the flagship product, with comparison and safety content that answers the questions parents search for</li>
      <li><b>Market architecture</b> on Shopify Markets, with subfolders sharing one domain’s authority</li>
      <li><b>Hreflang and x-default</b> checked across every template and market</li>
      <li><b>Localized keyword maps</b> for each market instead of a translation of the English keywords</li>
      <li><b>Product and Organization schema</b> so the brand and product are clearly identified everywhere</li></ul>
      <h2>Phase two: reimagined for conversion</h2>
      <p>After launch, a conversion-focused redesign rolled out to <b>20+ countries</b>. The SEO structure stayed the same, and only the presentation changed.</p>
      <img src="${R}assets/projects/confidential-booster-brand-2.webp" alt="CRO-led redesign of the booster brand Shopify store" width="800" height="2142" loading="lazy" style="max-height:520px;object-fit:cover;object-position:top;border-radius:12px;border:1px solid var(--line);margin:1.4em 0">
      <h2>Results</h2>
      <p>The September 2026 traffic estimate shows <b>12.7K monthly organic visits</b>, up 17%, with <b>3.4K ranking keywords</b> and an authority score of 35.</p>
      <img src="${R}assets/projects/confidential-booster-brand-traffic.webp" alt="Traffic estimate: 12.7K organic monthly traffic (+17%), 3.4K keywords, authority score 35" width="1078" height="400" loading="lazy" style="border-radius:12px;border:1px solid var(--line)">
      <p style="margin-top:2em"><a href="${R}services/shopify-international-seo.html">International Shopify SEO service →</a></p>
    </div>
  </div>
</div></section>${G.cta(R,'Selling in more than one country?')}`});

  // 2. Albarik
  path='case-studies/albarik-ecommerce-seo-pakistan.html';
  title='E-commerce SEO Case Study: Albarik, Pakistan | Globe Skillz';
  desc='Build and SEO for Albarik, a 6-department megastore in Pakistan: average Google position 9.2, 185K impressions in three months, and a 28.2% bounce rate.';
  G.page({ path,title,desc,priority:0.7, ogType:'article', image:'assets/projects/pr6.webp',
    crumbs:[['Home','index.html'],['Work','work.html'],['Albarik case study',path]],
    graph:[ G.schema.page('WebPage',path,title,desc), { '@type':'Article', headline:'E-commerce SEO for Albarik, a Pakistani megastore', description:desc, author:{ '@id':G.SITE.url+'/#saqib' }, publisher:{ '@id':G.SITE.url+'/#org' }, datePublished:'2026-10-01', dateModified:G.SITE.updated, image:G.abs('assets/projects/pr6.webp'), mainEntityOfPage:G.abs(path) } ],
    body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <div class="page-hero-grid"><div>
  <span class="eyebrow">Case study · E-commerce SEO · Pakistan</span>
  <h1>Albarik: a 6-department megastore that ranks in Pakistan</h1>
  <p class="lead">An everyday megastore selling across six departments needed a site that local shoppers could find and use. This project shows how the same e-commerce SEO approach works in an emerging market.</p></div>
  <aside class="hero-facts"><dl><div><dt>Market</dt><dd>Pakistan</dd></div><div><dt>Departments</dt><dd>6</dd></div><div><dt>Avg position</dt><dd>9.2</dd></div><div><dt>Impressions (3 mo)</dt><dd>185K</dd></div><div><dt>Bounce rate</dt><dd>28.2%</dd></div></dl></aside></div>
</div></section>
<section class="section"><div class="container">
  <div class="split">
    <div class="sticky"><div class="shot"><div class="shot-bar"><i></i><i></i><i></i><span>albarik · megastore</span></div><div class="shot-view" style="height:560px"><img src="${R}assets/projects/albarik.webp" alt="Full-page screenshot of the Albarik megastore website" width="800" height="3766" loading="lazy"></div></div></div>
    <div class="prose">
      <h2>The challenge</h2>
      <p>Large catalogs in Pakistan face particular conditions: most shoppers are on mobile, many use slow connections, and search queries mix Urdu and English. The store needed a structure where each department could rank for its own category searches.</p>
      <h2>What I did</h2>
      <ul><li>Department and category structure planned around local search demand</li>
      <li>Fast mobile templates designed with slow connections in mind</li>
      <li>Category page copy and internal linking between departments</li>
      <li>Product schema and a clean, indexable catalog</li></ul>
      <h2>Results</h2>
      <p>In January 2025 the site had <b>3.6K active users, 28K views and a 28.2% bounce rate</b>, which means visitors were finding what they came for.</p>
      <img src="${R}assets/projects/albarik-traffic.webp" alt="Analytics: 3.6K active users, 28K views, 28.2% bounce rate" width="817" height="459" loading="lazy" style="border-radius:12px;border:1px solid var(--line)">
      <p style="margin-top:1.6em">In Search Console over a later three-month period, the site recorded <b>2.67K clicks and 185K impressions at an average position of 9.2</b>.</p>
      <img src="${R}assets/projects/pr6.webp" alt="Search Console: 2.67K clicks, 185K impressions, 1.4% CTR, position 9.2" width="900" height="364" loading="lazy" style="border-radius:12px;border:1px solid var(--line)">
      <div class="callout"><b>Note:</b> Albarik is built on WooCommerce. I now develop only on Shopify, and the SEO work for Shopify stores in Pakistan follows the same approach. <a href="${R}services/shopify-migration.html">Moving from WooCommerce to Shopify?</a></div>
    </div>
  </div>
</div></section>${G.cta(R)}`});
};

G.renderReviews = () => {
  const path='reviews.html';
  const title='Client Reviews: Shopify Development & SEO | Globe Skillz';
  const desc='Verified reviews from Globe Skillz clients in Ireland, the UK, Canada, France, Spain, Italy and the US for Shopify fixes, development and SEO work.';
  const graph=[ G.schema.page('WebPage',path,title,desc,{ about:{ '@id':G.SITE.url+'/#org' } }) ];
  // NOTE: Self-serving Review/AggregateRating markup on your own Organization is not eligible for rich results; we intentionally omit it.
  G.page({ path,title,desc,graph,priority:0.6,crumbs:[['Home','index.html'],['Reviews',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <span class="eyebrow">Reviews</span>
  <h1>What clients say</h1>
  <p class="lead">Unedited reviews from verified Fiverr buyers. You can read every one, with more, on my <a href="${G.SITE.fiverr}" rel="noopener" target="_blank" style="color:#8DB4F5">Fiverr profile</a>.</p>
</div></section>
<section class="section"><div class="container"><div class="reviews">${G.reviews.map(G.reviewCard).join('')}</div></div></section>
${G.cta(R)}`});
};
