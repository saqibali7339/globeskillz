// Pricing, About, FAQ, Contact, Legal, 404
G.allFaqs = [
  {g:'SEO', q:'How long does Shopify SEO take to work?', a:'Technical fixes on an established store often show up within 4–8 weeks. Content and links usually take 3–6 months to reach their full effect. Competitive national or international terms can take 6–12 months of consistent work.'},
  {g:'SEO', q:'Do you guarantee first-page rankings?', a:'No. Nobody controls Google, and guarantees are a warning sign. I commit to the work, to transparency, and to reporting from your own Search Console data.'},
  {g:'SEO', q:'My site was hit by a Google update. Can you help?', a:'Yes. Recovery usually means removing or merging thin and doorway-style pages, improving the pages that remain, and showing real first-hand expertise. Start with an audit to find out what Google is likely seeing as low-value.'},
  {g:'SEO', q:'Do you use AI to write content?', a:'I use AI for research and first drafts. Every published page is written and edited by a person, checked for accuracy and supported with first-hand product knowledge.'},
  {g:'SEO', q:'What about AI search like ChatGPT and AI Overviews?', a:'The basics of AI search optimization (entity clarity, structured data and answer-first content) are included in every SEO retainer. A deeper standalone service is also available.'},
  {g:'Development', q:'Do you build on platforms other than Shopify?', a:'New development work is Shopify-only. I’ve worked with WooCommerce and WordPress in the past, and I migrate stores from those platforms to Shopify.'},
  {g:'Development', q:'Will I own everything you build?', a:'Yes. All code, content and assets live in your Shopify store and accounts from day one. There’s no lock-in.'},
  {g:'Development', q:'Do you work on a live theme?', a:'No. All work happens on a duplicate theme, with a preview link for you to approve before anything is published.'},
  {g:'Working together', q:'Where are you based and which timezones do you cover?', a:'I’m based in Pakistan (UTC+5) and work with clients worldwide. We agree on a daily overlap window, and WhatsApp is always open for quick questions.'},
  {g:'Working together', q:'How do payments work?', a:'Projects are usually 50% upfront and 50% on delivery. Retainers are billed monthly in advance. I accept bank transfer and the major international payment platforms.'},
  {g:'Working together', q:'Do you sign NDAs?', a:'Yes. Many of my case studies are anonymized for exactly that reason.'},
  {g:'Working together', q:'Is there a minimum contract?', a:'No. Retainers are month to month. Link building campaigns have a suggested 3-month minimum because links take time to have an effect.'},
];

G.renderPricing = () => {
  const path='pricing.html';
  const title='Shopify SEO & Development Pricing | Globe Skillz';
  const desc='Clear pricing for Shopify SEO and development: SEO retainers from $700/mo, audits from $300, store builds from $500, support from $250/mo. No lock-in.';
  const plans=[
    {name:'Audit', for:'Find out what’s wrong', amt:'$300', unit:'one-time', p:'A manual Shopify SEO audit with a prioritized fix list and video walkthrough.', items:['Crawl, index & theme review','Core Web Vitals by template','Keyword & content gaps','Prioritized roadmap','30-min review call','Fee credited to a retainer'], cta:'Book an audit', svc:'shopify-seo-audit'},
    {name:'Growth', for:'Most popular', pop:true, amt:'$700', unit:'/month', p:'Monthly Shopify SEO with technical fixes shipped in your theme.', items:['Technical SEO, fixed in code','4–8 pages optimized / mo','2–4 content pieces / mo','Authority building','AI search basics (AEO/GEO)','Monthly GSC report','Direct WhatsApp line'], cta:'Start Growth', svc:'shopify-seo'},
    {name:'Scale', for:'Multi-market & large catalogs', amt:'Custom', unit:'', p:'Full SEO plus a development block for brands selling in several countries.', items:['Everything in Growth','International SEO & hreflang','Dedicated dev hours','Full link campaign','Bi-weekly strategy calls','Priority Slack channel'], cta:'Let’s talk', svc:'shopify-international-seo'},
  ];
  const addons=[['Shopify store build','From $500','shopify-development'],['Theme customization','From $50/hr','shopify-theme-customization'],['Speed optimization','From $350','shopify-speed-optimization'],['Migration to Shopify','From $800','shopify-migration'],['Maintenance & support','From $250/mo','shopify-maintenance-support'],['Link building only','From $500/mo','shopify-link-building'],['Content SEO only','From $600/mo','shopify-content-seo'],['Technical SEO sprint','From $500','shopify-technical-seo']];
  const priceFaqs=G.allFaqs.filter(f=>/payments|minimum|guarantee/i.test(f.q));
  const graph=[ G.schema.page('WebPage',path,title,desc),
    { '@type':'OfferCatalog', name:'Globe Skillz pricing', itemListElement: plans.filter(p=>p.amt!=='Custom').map(p=>({ '@type':'Offer', name:p.name, price:p.amt.replace('$',''), priceCurrency:'USD', url:G.abs('services/'+p.svc+'.html'), itemOffered:{ '@id':G.abs('services/'+p.svc+'.html')+'#service' } })) },
    G.schema.faq(priceFaqs) ];
  G.page({ path,title,desc,graph,priority:0.8,crumbs:[['Home','index.html'],['Pricing',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <span class="eyebrow">Pricing</span><h1>Clear prices, no lock-in</h1>
  <p class="lead">Every engagement is scoped on a call and confirmed in writing. Prices are in USD. I serve clients worldwide, and for clients in Pakistan, PKR invoicing is available.</p>
</div></section>
<section class="section"><div class="container">
  <div class="plans">${plans.map(p=>`<div class="plan${p.pop?' pop':''}">${p.pop?'<span class="badge">Most popular</span>':''}<span class="for">${p.for}</span><h3>${p.name}</h3><div class="amt">${p.amt} <small>${p.unit}</small></div><p class="${p.pop?'':'muted'}">${p.p}</p><ul class="checks">${p.items.map(i=>`<li>${i}</li>`).join('')}</ul><a class="btn ${p.pop?'btn-light':'btn-primary'}" href="${R}contact.html?service=${p.svc}">${p.cta}</a></div>`).join('')}</div>
</div></section>
<section class="section section-bg"><div class="container">
  <div class="sec-head"><span class="eyebrow">À la carte</span><h2>Individual services</h2></div>
  <div class="related" style="grid-template-columns:repeat(4,1fr)">${addons.map(a=>`<a href="${R}services/${a[2]}.html">${a[0]}<span>${a[1]}</span></a>`).join('')}</div>
</div></section>
<section class="section"><div class="container"><div class="split"><div><span class="eyebrow">FAQ</span><h2>Pricing questions</h2></div>${G.faqBlock(priceFaqs)}</div></div></section>
${G.cta(R)}`});
};

G.renderAbout = () => {
  const path='about.html';
  const title='About Saqib Ali — Shopify SEO Lead & Developer | Globe Skillz';
  const desc='Saqib Ali founded Globe Skillz in 2019. He’s a Shopify SEO specialist who also writes Liquid, with 180+ projects for merchants in 42 countries.';
  const graph=[ G.schema.page('AboutPage',path,title,desc,{ mainEntity:{ '@id':G.SITE.url+'/#saqib' } }), G.schema.person() ];
  G.page({ path,title,desc,graph,priority:0.8,crumbs:[['Home','index.html'],['About',path]], ogType:'profile', body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}
  <span class="eyebrow">About</span><h1>Hi, I’m Saqib Ali. I do Shopify SEO, and I also write the code.</h1>
</div></section>
<section class="section"><div class="container">
  <div class="split">
    <div class="sticky"><div class="about-photo"><img src="${R}assets/brand/saqib-ali.jpg" alt="Portrait of Saqib Ali, founder of Globe Skillz" width="800" height="821"></div></div>
    <div class="prose">
      <p class="lead" style="color:var(--ink)">I started Globe Skillz in 2019 as a freelance web studio. After seven years, 180+ projects and clients in 42 countries, I’ve narrowed it to the work I do best: helping Shopify stores grow through organic search.</p>
      <h2>Why I changed focus</h2>
      <p>The older Globe Skillz built WordPress and Shopify sites for any business, and it had pages targeting every city and industry. When Google’s updates started penalizing that kind of scaled, location-targeted content, my own site was hit. It was a useful lesson in what search engines now reward: real expertise, focus, and pages that exist because they’re useful.</p>
      <p>So I rebuilt the studio around one platform and one goal. Every page on this site describes something I actually do, backed by client work you can check.</p>
      <h2>How I work</h2>
      <ul><li><b>SEO first, with development built in.</b> I diagnose the problem and fix it in your theme myself.</li>
      <li><b>White-hat only.</b> No PBNs and no doorway pages. These tactics hurt my own site, and I won’t use them on yours.</li>
      <li><b>Your data, your accounts.</b> Reports come from your own Search Console, and everything I build belongs to you.</li>
      <li><b>Direct line.</b> You talk to me on WhatsApp, not to an account manager.</li></ul>
      <h2>Who I work with</h2>
      <p>Shopify merchants worldwide, from new DTC brands to established catalogs selling in 20+ countries: fashion labels in Switzerland, supplements brands in the EU, e-bike and furniture makers, and retailers in Pakistan.</p>
      <div class="stat-row"><div><b>180+</b><span>projects shipped</span></div><div><b>42</b><span>countries served</span></div><div><b>2019</b><span>working since</span></div></div>
      <h2>Platforms & tools</h2>
      <div class="platforms">${['Shopify','Liquid','Online Store 2.0','Shopify Markets','Hydrogen (review)','Google Search Console','GA4','Screaming Frog','Ahrefs','Semrush','PageSpeed / CrUX','Schema.org','Figma'].map(t=>`<span class="chip">${t}</span>`).join('')}</div>
      <p style="margin-top:2em"><a class="btn btn-primary" href="${R}contact.html">Work with me ${G.icon.arrow}</a></p>
    </div>
  </div>
</div></section>`});
};

G.renderFaq = () => {
  const path='faq.html';
  const title='Shopify SEO & Development FAQ | Globe Skillz';
  const desc='Answers about Shopify SEO timelines, Google update recovery, AI search, development, ownership, payments and working with Globe Skillz from anywhere in the world.';
  const graph=[ G.schema.page('WebPage',path,title,desc), G.schema.faq(G.allFaqs) ];
  const groups=[...new Set(G.allFaqs.map(f=>f.g))];
  G.page({ path,title,desc,graph,priority:0.6,crumbs:[['Home','index.html'],['FAQ',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}<span class="eyebrow">FAQ</span><h1>Frequently asked questions</h1></div></section>
<section class="section"><div class="container">${groups.map(g=>`<div class="split" style="margin-bottom:56px"><div><h2>${g}</h2></div>${G.faqBlock(G.allFaqs.filter(f=>f.g===g))}</div>`).join('')}</div></section>
${G.cta(R)}`});
};

G.renderContact = () => {
  const path='contact.html';
  const title='Contact Globe Skillz — Free Shopify Store Review';
  const desc='Send your Shopify store URL for a free SEO and technical review, or message Saqib Ali on WhatsApp. Replies within one business day, worldwide.';
  const graph=[ G.schema.page('ContactPage',path,title,desc) ];
  G.page({ path,title,desc,graph,priority:0.7,crumbs:[['Home','index.html'],['Contact',path]], body:(R,crumbHtml)=>`
<section class="page-hero"><div class="container">${crumbHtml}<span class="eyebrow">Contact</span><h1>Get a free Shopify store review</h1><p class="lead">Tell me about your store. Within one business day you’ll get a short recorded review of the biggest SEO and technical issues I can find.</p></div></section>
<section class="section"><div class="container"><div class="split">
  <form class="form card" id="brief" style="padding:32px">
    <div class="row2"><div><label for="f-name">Your name</label><input id="f-name" name="Name" required autocomplete="name"></div><div><label for="f-email">Email</label><input id="f-email" name="Email" type="email" required autocomplete="email"></div></div>
    <div><label for="f-url">Store URL</label><input id="f-url" name="Store" type="url" placeholder="https://" required></div>
    <div class="row2"><div><label for="f-svc">What do you need?</label><select id="f-svc" name="Service">${G.services.map(s=>`<option value="${G.esc(s.short)}">${G.esc(s.short)}</option>`).join('')}<option>Not sure yet</option></select></div>
    <div><label for="f-budget">Monthly budget</label><select id="f-budget" name="Budget"><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,500</option><option>$2,500+</option><option>One-time project</option></select></div></div>
    <div><label for="f-market">Where do you sell?</label><input id="f-market" name="Markets" placeholder="e.g. US & UK, Pakistan, EU-wide"></div>
    <div><label for="f-msg">What’s going on?</label><textarea id="f-msg" name="Message" placeholder="Traffic dropped after an update, launching a new store, need a theme fix…"></textarea></div>
    <button class="btn btn-primary" type="submit">Send brief via WhatsApp ${G.icon.arrow}</button>
    <p class="form-note">Your brief opens in WhatsApp, already filled in, so it reaches me directly. Nothing is stored on this site.</p>
  </form>
  <div>
    <h2>Other ways to reach me</h2>
    <div class="contact-ways">
      <a class="contact-way" href="${G.SITE.wa}" target="_blank" rel="noopener"><span class="ic">${G.icon.wa}</span><span><b>WhatsApp</b><span>${G.SITE.waDisplay} · fastest reply</span></span></a>
      <a class="contact-way" href="${G.SITE.fiverr}" target="_blank" rel="noopener"><span class="ic">${G.icon.star}</span><span><b>Fiverr</b><span>Hire through Fiverr’s protected checkout</span></span></a>
    </div>
    <h3 style="margin-top:40px">What happens next</h3>
    <ol class="prose" style="font-size:1rem;padding-left:1.2em"><li>I look at your store, Search Console data if you share it, and your competitors</li><li>You get a 5–10 minute recorded review</li><li>If it’s a good fit, we schedule a call to scope the work</li></ol>
    <p class="muted" style="font-size:.92rem">Based in Pakistan (UTC+5), working with clients worldwide.</p>
  </div>
</div></div></section>`});
};

G.renderLegal = () => {
  const legal = (path, name, body) => G.page({ path, title:`${name} | Globe Skillz`, desc:`${name} for globeskillz.com.`, priority:0.2, crumbs:[['Home','index.html'],[name,path]], graph:[G.schema.page('WebPage',path,name,name)], body:(R,c)=>`
<section class="page-hero"><div class="container">${c}<h1>${name}</h1><p class="lead">Last updated November 2026</p></div></section>
<section class="section"><div class="container narrow prose">${body}</div></section>`});
  legal('privacy.html','Privacy Policy',`<p>Globe Skillz (“I”, “me”) respects your privacy. This site doesn’t use advertising trackers.</p><h2>What I collect</h2><p>The contact form doesn’t send data to any server on this site. It opens WhatsApp with your message already filled in, and from there WhatsApp’s privacy policy applies. If you contact me, I keep your name, email and project details only for as long as needed to respond and deliver work.</p><h2>Analytics</h2><p>I may use privacy-friendly analytics to count visits. No personal profiles are built from this data.</p><h2>Client data</h2><p>Access to your Shopify, Search Console or analytics accounts is used only for the agreed work and can be removed by you at any time. I sign NDAs on request.</p><h2>Contact</h2><p>Questions about privacy: message me on <a href="${G.SITE.wa}">WhatsApp</a>.</p>`);
  legal('terms.html','Terms of Service',`<h2>Scope</h2><p>Every engagement is scoped in writing before work begins. Work outside that scope is quoted separately.</p><h2>Payment</h2><p>Projects: 50% upfront, 50% on delivery. Retainers: billed monthly in advance, cancel anytime with 14 days’ notice.</p><h2>Ownership</h2><p>On payment, all deliverables (code, content, designs) belong to the client.</p><h2>No ranking guarantees</h2><p>Search rankings depend on factors outside anyone’s control. I guarantee the agreed work and honest reporting, not specific positions.</p><h2>Liability</h2><p>Work is done on duplicate themes and approved before publishing. My liability is limited to the fees paid for the affected work.</p>`);
  G.page({ path:'404.html', title:'Page not found | Globe Skillz', desc:'This page doesn’t exist.', noindex:true, body:(R)=>`
<section class="page-hero" style="padding:120px 0"><div class="container"><span class="eyebrow">404</span><h1>This page doesn’t exist</h1><p class="lead">Globe Skillz was rebuilt around Shopify SEO and development, and some older pages were removed. Try one of these instead:</p><div class="btn-row"><a class="btn btn-light" href="${R}services.html">All services</a><a class="btn btn-outline-light" href="${R}index.html">Home</a></div></div></section>`});
};
