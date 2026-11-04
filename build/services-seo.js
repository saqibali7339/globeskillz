// Shopify SEO services. Each one gets its own URL, unique copy, Service + FAQPage + BreadcrumbList schema.
G.services = G.services || [];
G.services.push(
{
  slug:'shopify-seo', pillar:'seo', hub:true, short:'Shopify SEO Services', navNote:'The full monthly program',
  serviceType:'Shopify SEO', price:500, unit:'MON', priceLabel:'From $500/mo',
  title:'Shopify SEO Services | Globe Skillz',
  desc:'Monthly Shopify SEO run by a developer who reads Liquid: technical fixes, collection and product optimization, content and links. Serving merchants worldwide.',
  h1:'Shopify SEO services, run by someone who can also edit your theme',
  lead:'Most Shopify SEO stalls at the theme layer. An SEO points out a duplicate-URL problem and someone else has to fix it. I find the problem and I fix it in your theme code too, every month.',
  facts:[['Engagement','Monthly retainer'],['Starts at','$500 / month'],['First results','Usually 8–12 weeks'],['Reporting','Monthly, from GSC data'],['Contract','Month to month']],
  signals:['Traffic dipped after a Google core or helpful-content update and never came back','Collection pages are thin: a grid of products with no copy','Search Console shows thousands of “Crawled — currently not indexed” URLs','Products rank in position 11–30 and won’t move to page one','You installed SEO apps but rankings didn’t change','Variant, tag and filter URLs are splitting your rankings'],
  included:[
    ['Technical SEO, fixed in code','Canonicals, duplicate /collections/*/products/* paths, tag pages, faceted filters, robots.txt.liquid, sitemaps, pagination. I fix these in the theme myself.'],
    ['Collection page optimization','Collections are where most commercial keywords land. Each one gets intro and FAQ copy, internal links and a title that matches what people search.'],
    ['Product page SEO','Unique descriptions for your top sellers, image alt text, Product and Offer schema with reviews, and handles that don’t compete with each other.'],
    ['Content that earns rankings','Buying guides, comparisons and how-to articles mapped to real keywords. Each one links back to the collection it supports.'],
    ['Authority building','Outreach to relevant sites, digital PR and partner placements. No PBNs and no link farms.'],
    ['AI search visibility','Pages structured so ChatGPT, Gemini, Perplexity and Google AI Overviews can understand and cite them.'],
  ],
  prose:`<h2>Why Shopify SEO needs its own playbook</h2>
<p>Shopify is a good platform for SEO, but it has its own quirks. One product can live at <code>/products/x</code> and also at <code>/collections/y/products/x</code>. Tag filters create thin pages by the thousand. You can’t edit <code>robots.txt</code> the usual way. Apps add scripts that slow every template. A generic “website SEO” checklist misses all of this.</p>
<p>I’ve worked on Shopify stores since 2019. I write Liquid, so when the fix is in the theme, the fix is done. You don’t get a recommendation that sits in a ticket queue.</p>
<h2>How a typical month runs</h2>
<ol><li><b>Fix:</b> one technical sprint. We work through crawl, index and speed issues, starting with whatever has the biggest impact.</li>
<li><b>Optimize:</b> 4–8 collection or product pages reworked for search intent.</li>
<li><b>Publish:</b> 2–4 pieces of supporting content, each linked to a money page.</li>
<li><b>Build:</b> authority placements that fit your niche.</li>
<li><b>Report:</b> clicks, impressions, positions and revenue from organic search. You see what moved and what’s planned for next month.</li></ol>
<h2>Built for recovery, not shortcuts</h2>
<p>A lot of stores I take on were hit by an algorithm update. The fix is almost never another trick. It’s fewer, better pages: merging thin collections, removing auto-generated pages, and showing real expertise. Google is rewarding exactly that right now, and it’s how every engagement here is run.</p>
<div class="callout"><b>Worldwide, one timezone overlap.</b> I work with stores in the US, UK, EU, Australia, the Gulf and Pakistan. Every client gets a fixed window of overlapping working hours and a direct WhatsApp line.</div>`,
  proof:'vytal',
  faqs:[
    {q:'How long does Shopify SEO take to show results?',a:'Technical fixes on an established store often show up in Search Console within 4–8 weeks. New collection content and links usually take 3–6 months to reach their full effect. A brand-new domain takes longer. On the discovery call I’ll give you a realistic range for your niche.'},
    {q:'Do I need SEO apps on Shopify?',a:'Usually not many. Most SEO-app features (schema, meta tags, redirects) are better handled in the theme or with Shopify’s built-in tools. Fewer apps also means a faster store. I’ll tell you which apps to keep and which to remove.'},
    {q:'Is Shopify bad for SEO?',a:'No. Shopify handles hosting, SSL, sitemaps and a lot of speed work very well. Its weak spots are duplicate URL paths, limited URL structure and app bloat. All of these are manageable when someone who knows the platform handles them.'},
    {q:'Do you work with stores outside the US?',a:'Yes. I work with merchants worldwide, including the UK, EU, Middle East, Australia and Pakistan. For stores selling into several countries, see the international Shopify SEO service.'},
    {q:'What do you need from me to start?',a:'Collaborator access to Shopify, Search Console and GA4 access, and a 30-minute call about your margins, best sellers and target customers. I handle the rest.'},
  ],
  related:['shopify-seo-audit','shopify-technical-seo','shopify-on-page-seo'],
},
{
  slug:'shopify-seo-audit', pillar:'seo', short:'Shopify SEO Audit', navNote:'A prioritized fix list',
  serviceType:'SEO audit', price:200, unit:null, priceLabel:'From $200, one-time',
  title:'Shopify SEO Audit: Developer-Ready Fix List | Globe Skillz',
  desc:'A manual Shopify SEO audit covering crawl, indexation, theme code, Core Web Vitals, content and links. You get a prioritized fix list you can actually act on.',
  h1:'A Shopify SEO audit that ends in a fix list, not a 90-page PDF',
  lead:'I crawl your store, read your theme, and go through Search Console line by line. Then you get every issue ranked by revenue impact, with the exact fix for each one.',
  facts:[['Deliverable','Audit doc + video walkthrough'],['Price','From $200'],['Turnaround','5–7 working days'],['Includes','30-min review call'],['Credit','Fee counted toward a retainer']],
  signals:['Organic traffic fell and you don’t know why','You’re about to redesign or migrate and want a baseline','An agency sent a generic tool export and nothing changed','Search Console has coverage errors you don’t understand','Your theme was heavily customized by several developers','You want a second opinion before signing a retainer'],
  included:[
    ['Crawl & indexation','Full crawl compared against your Search Console index report. Orphan pages, duplicate paths, tag and filter bloat, and what Google is choosing to ignore.'],
    ['Theme code review','Canonical logic, heading structure, render-blocking scripts, leftover code from uninstalled apps, and structured-data errors in Liquid.'],
    ['Core Web Vitals','LCP, INP and CLS by template type (home, collection, product, blog), using real-user CrUX data where it’s available.'],
    ['Keyword & content gaps','Where competitors rank and you don’t, which collections are missing, and which pages are competing with each other.'],
    ['Backlink profile','Toxic patterns, lost links worth reclaiming, and a realistic picture of the authority gap.'],
    ['Prioritized roadmap','Each issue is scored by impact and effort. You can hand it to any developer, or have me fix it.'],
  ],
  prose:`<h2>What makes this audit different</h2>
<p>Automated tools are good at finding symptoms and bad at telling you what matters. A tool will flag 4,000 “duplicate titles” without noticing that they all come from one tag-filter template, which is a single fix in Liquid.</p>
<p>I group findings by root cause, so 4,000 warnings turn into three tasks, each with a clear before and after.</p>
<h2>What you receive</h2>
<ul><li>A written audit, organized by priority: <b>fix now</b>, <b>fix this quarter</b>, <b>nice to have</b></li>
<li>A screen-recorded walkthrough of the biggest findings, so your team understands the reasons behind each fix</li>
<li>Code snippets or exact theme locations for every technical fix</li>
<li>A keyword-to-page map for your top collections</li>
<li>A 30-minute call to go through questions</li></ul>
<h2>Algorithm-hit stores</h2>
<p>If your traffic dropped after a core, spam or helpful-content update, the audit includes a look at quality: thin or near-duplicate pages, doorway-style location or keyword pages, and content that doesn’t show first-hand expertise. These are the patterns updates penalize, and fixing them is usually the first step to recovering.</p>`,
  proof:'scaleup',
  faqs:[
    {q:'How much does a Shopify SEO audit cost?',a:'Audits start at $200 for stores up to roughly 1,000 URLs. Larger catalogs or multi-market setups are quoted after a quick look. If you start a monthly retainer within 30 days, the audit fee is credited back.'},
    {q:'Will you implement the fixes?',a:'If you want me to. Many clients hand the audit to their in-house developer. Others hire me to implement it as a fixed project or as part of a retainer.'},
    {q:'What access do you need?',a:'Shopify collaborator access (read-only is fine to start), Search Console and GA4. Ahrefs or Semrush access helps but isn’t required, since I use my own tools.'},
    {q:'Can an audit help recover from a Google update?',a:'It’s the right first step. The audit shows which pages Google is likely seeing as low-value, and that tells you what to merge, improve or remove.'},
  ],
  related:['shopify-technical-seo','shopify-seo','shopify-speed-optimization'],
},
{
  slug:'shopify-technical-seo', pillar:'seo', short:'Shopify Technical SEO', navNote:'Crawl, index, schema, code',
  serviceType:'Technical SEO', price:350, unit:null, priceLabel:'From $350 per sprint',
  title:'Shopify Technical SEO | Globe Skillz',
  desc:'Technical SEO for Shopify, fixed directly in your theme: duplicate URLs, faceted navigation, robots.txt.liquid, structured data, sitemaps and Core Web Vitals.',
  h1:'Shopify technical SEO, fixed in the theme code',
  lead:'Duplicate product paths, filter URLs and broken structured data hold back stores that already have good products. I find these problems and fix them in your Liquid code.',
  facts:[['Format','Fixed-scope sprint'],['Starts at','$350'],['Typical sprint','1–2 weeks'],['Works with','Online Store 2.0 & legacy themes'],['Handover','Git-tracked changes + notes']],
  signals:['“Duplicate without user-selected canonical” keeps growing in GSC','Filtered collection URLs are getting indexed','Product rich results disappeared or show errors','Old app code is still loading on every page','Pagination pages outrank the main collection','Hreflang errors after enabling Shopify Markets'],
  included:[
    ['Internal link path cleanup','Collection grids link to /products/handle, not the /collections/x/products/handle path. That one change removes a large source of duplicate URLs.'],
    ['Faceted navigation control','Filter and tag URLs are noindexed or kept out of the crawl, while the filter combinations people actually search for stay indexable.'],
    ['robots.txt.liquid','Custom crawl rules for search, cart, checkout and filter parameters, written carefully so nothing important gets blocked.'],
    ['Structured data','Product, Offer, AggregateRating, BreadcrumbList, Organization and FAQ schema in JSON-LD, validated against Google’s requirements.'],
    ['Redirect & 404 hygiene','Redirect chains removed, high-value 404s recovered, and discontinued products handled without losing their rankings.'],
    ['Template-level speed','Render-blocking scripts deferred, images sized correctly, and fonts and app embeds trimmed on each template.'],
  ],
  prose:`<h2>The five Shopify issues I fix most often</h2>
<table><thead><tr><th>Issue</th><th>Why it hurts</th><th>The fix</th></tr></thead><tbody>
<tr><td>Collection-aware product URLs</td><td>Splits link equity and crawl budget across copies of the same product</td><td>Change <code>product.url</code> logic in the product-card snippet</td></tr>
<tr><td>Indexed tag pages</td><td>Hundreds of thin, near-duplicate pages</td><td>Conditional <code>noindex</code> on <code>current_tags</code></td></tr>
<tr><td>Missing or broken Product schema</td><td>Lost rich results and lower click-through rate</td><td>One JSON-LD block that includes variants and offers</td></tr>
<tr><td>Leftover app scripts</td><td>Slower LCP and INP on every template</td><td>Audit theme.liquid and app embeds, then remove the dead code</td></tr>
<tr><td>Hreflang across Markets</td><td>The wrong country version ranks</td><td>Check Markets domains, subfolders and alternate tags</td></tr>
</tbody></table>
<h2>Developer discipline</h2>
<p>Every change is made on a duplicate theme, reviewed, and published only after it’s been tested. You get a changelog of what changed and why, so your next developer won’t undo it by accident.</p>`,
  proof:'bookstore',
  faqs:[
    {q:'Can you edit robots.txt on Shopify?',a:'Yes, through the robots.txt.liquid template. It’s easy to break things, so I only add rules that solve a specific problem I’ve confirmed in Search Console.'},
    {q:'Should Shopify tag pages be indexed?',a:'Usually not. Most tag pages are thin filtered views. The exception is a tag combination that matches real search demand. In that case it’s usually better to create a dedicated collection for it.'},
    {q:'Will technical fixes break my theme?',a:'No. All work happens on a duplicate theme first and is tested before it’s published. You can roll back with one click.'},
    {q:'Do you work on headless Shopify (Hydrogen)?',a:'Yes, for technical SEO reviews: rendering, routing, canonicals and sitemaps. Large Hydrogen builds are scoped on a case-by-case basis.'},
  ],
  related:['shopify-seo-audit','shopify-speed-optimization','shopify-international-seo'],
},
{
  slug:'shopify-on-page-seo', pillar:'seo', short:'Collection & Product SEO', navNote:'On-page optimization',
  serviceType:'On-page SEO', price:300, unit:null, priceLabel:'From $300 per batch',
  title:'Shopify Collection & Product Page SEO | Globe Skillz',
  desc:'On-page SEO for Shopify collection and product pages: keyword mapping, titles, descriptions, collection copy, FAQs, internal links and rich results.',
  h1:'Collection and product page SEO for Shopify',
  lead:'Most of your commercial keywords land on collection pages. I turn them from a plain grid of products into pages that rank well and convert visitors once they arrive.',
  facts:[['Format','Batches of 10 pages'],['Starts at','$300 / batch'],['Turnaround','7–10 days per batch'],['Includes','Keyword map + copy + schema'],['Writing','Human-written, brand voice']],
  signals:['Collections have no descriptive copy at all','Product descriptions are copied from the manufacturer','Several pages target the same keyword','Titles are just the product name plus the store name','Low CTR even when you rank on page one','Customers ask the same questions that your pages don’t answer'],
  included:[
    ['Keyword-to-page mapping','Each target keyword is assigned to one page, which removes cannibalization between collections, products and blog posts.'],
    ['Collection copy that fits','A short intro above the grid and a longer buyer’s guide and FAQ below it. Shoppers see products first and Google gets the context it needs.'],
    ['Product page rewrites','Unique descriptions for your highest-revenue products. They cover benefits, specs and real use cases, never filler.'],
    ['Titles & meta for CTR','Titles written to win the click, with price, range or a reason to choose you, all within the length that shows in search.'],
    ['Internal linking','Links between related collections, from products to their parent collections, and from articles to products, with descriptive anchor text.'],
    ['Rich result eligibility','FAQ, Product and review markup that matches what’s visible on the page.'],
  ],
  prose:`<h2>The collection page is your most important SEO asset</h2>
<p>Someone searching “linen bedding sets” or “gold hoop earrings” wants to see options, not a single product. That’s why Google usually ranks collection pages for these searches, and it’s why I spend most on-page time on collections.</p>
<h3>Anatomy of a collection page that ranks</h3>
<ol><li><b>H1 that matches the search:</b> “Gold Hoop Earrings”, not “Shop All Hoops”</li>
<li><b>About 60 words above the grid</b> explaining what’s in the range</li>
<li><b>The product grid</b>, unchanged so shoppers still get to products quickly</li>
<li><b>A buyer’s guide below the grid</b> covering sizes, materials and how to choose</li>
<li><b>An FAQ</b> answering real questions from your support inbox</li>
<li><b>Links to related collections</b> to help both shoppers and crawlers</li></ol>
<h2>Proof: CTR is a ranking lever</h2>
<p>For a lashes and brows brand, rewritten titles, descriptions and rich results brought click-through rate to <b>5.2%</b>, well above the store’s average, while positions stayed about the same. More clicks from the same rankings is the quickest win in SEO.</p>`,
  proof:'lashes',
  faqs:[
    {q:'How much text should a Shopify collection page have?',a:'Enough to answer the shopper’s questions. That’s usually 50–80 words above the grid and 300–700 words of guide and FAQ below it. Length on its own doesn’t rank, but helpful content does.'},
    {q:'Do you use AI to write product descriptions?',a:'I use AI for research and first drafts, then write and edit every page by hand for accuracy, your brand voice and real product knowledge. Unedited AI copy is the kind of thin content Google’s updates target.'},
    {q:'Will adding content to collections slow them down?',a:'No. Text adds almost nothing to page weight. I also place below-the-grid content so it never pushes products down on mobile.'},
    {q:'Can you work in languages other than English?',a:'Keyword research and structure, yes, for any market. Copy in other languages is written together with native-speaking writers.'},
  ],
  related:['shopify-content-seo','shopify-seo','shopify-technical-seo'],
},
{
  slug:'shopify-content-seo', pillar:'seo', short:'Shopify Content SEO', navNote:'Guides that sell',
  serviceType:'Content marketing and SEO copywriting', price:450, unit:'MON', priceLabel:'From $450/mo',
  title:'Shopify Content SEO: Guides That Rank | Globe Skillz',
  desc:'Content strategy and writing for Shopify stores: topic clusters, buying guides and comparison articles, each linked to the collections they support.',
  h1:'Shopify blog content that leads readers to your products',
  lead:'Content strategy for Shopify stores, where every article has a clear job: answer a real question, build topical authority, and send readers to a collection.',
  facts:[['Format','Monthly content plan'],['Starts at','$450 / month'],['Output','4 long-form pieces / mo'],['Includes','Briefs, writing, linking'],['Review','You approve every topic']],
  signals:['Your blog has posts but none of them get traffic','Articles don’t link to any products','You’re competing with bigger stores for broad keywords','Customers do a lot of research before they buy','Your niche gets a lot of “best X for Y” searches','You want to show up in AI answers and Google AI Overviews'],
  included:[
    ['Topic cluster map','One hub topic per core collection, supported by the questions people search for before they buy.'],
    ['Search-intent briefs','Each piece is planned against what currently ranks: format, depth, angle and the gap in existing results.'],
    ['Buying guides & comparisons','The content that converts best on Shopify, like “X vs Y”, “Best X for Y” and “How to choose”, all including your products.'],
    ['First-hand expertise','Founder quotes, product testing and real photos. These are the experience signals Google’s quality raters look for.'],
    ['Linking to collections','Every article links to the collection it supports, and the collection links back. This is how blog traffic turns into rankings for product pages.'],
    ['Refresh & prune','Old posts get updated, merged or removed. Fewer, better pages tend to beat a large archive of thin ones.'],
  ],
  prose:`<h2>Why most Shopify blogs don’t produce sales</h2>
<p>The typical Shopify blog is a set of brand-news posts that nobody searches for, with no links to products. They have no target keyword and no clear purpose, so Google has little reason to rank them.</p>
<p>Content that works is planned from your collections outward. First I list the questions shoppers ask before buying from each collection. Then I write the single best answer to each question, with your products included where they actually help.</p>
<h2>Built for Google and for AI answers</h2>
<p>AI Overviews, ChatGPT and Perplexity pull from pages that answer clearly, define terms and back up their claims. Every piece is structured for this: a direct answer up top, scannable sections, comparison tables and a named author with real credentials.</p>
<blockquote>The jewelry store in my results grew from a brand-new domain to 2.81M impressions in three months. Content clusters around its main collections did most of that work.</blockquote>`,
  proof:'jewelry',
  faqs:[
    {q:'How many blog posts does a Shopify store need?',a:'Fewer than most people think. Ten excellent, well-linked guides around your main collections usually beat a hundred thin posts. Quality and internal linking matter more than how often you publish.'},
    {q:'Who writes the content?',a:'I plan and edit everything. Writing is done by me or by experienced e-commerce writers I’ve worked with for years. Your team adds product expertise, and that first-hand input is what makes the content stand out.'},
    {q:'Do I own the content?',a:'Yes, completely. Everything is published to your Shopify blog under your brand.'},
    {q:'Can content help with AI search results?',a:'Yes. Clear, well-structured, factual content written by a named author is what AI systems tend to quote. See the AI search optimization service for more detail.'},
  ],
  related:['shopify-on-page-seo','shopify-ai-search-optimization','shopify-link-building'],
},
{
  slug:'shopify-link-building', pillar:'seo', short:'Shopify Link Building', navNote:'Authority that sticks',
  serviceType:'Link building', price:400, unit:'MON', priceLabel:'From $400/mo',
  title:'Shopify Link Building | Globe Skillz',
  desc:'White-hat link building for Shopify stores: digital PR, supplier and partner links, resource placements and unlinked brand mentions. No PBNs and no link farms.',
  h1:'Link building for Shopify stores, safe enough to survive the next update',
  lead:'The links Google trusts come from sites in your niche with real readers. Getting them is slower work, but those rankings don’t vanish after an update.',
  facts:[['Format','Monthly campaign'],['Starts at','$400 / month'],['Reporting','Every link, live URL'],['Methods','PR, partners, resources'],['Never','PBNs, link farms, spam']],
  signals:['Your content is good but competitors with more links still outrank you','You bought cheap links in the past and are worried about them','You have suppliers, stockists or partners who don’t link to you','The brand gets mentioned online without a link','A new store with no authority at all','Rankings dropped after a spam update'],
  included:[
    ['Link gap analysis','Who links to your top competitors but not to you, sorted by how realistic each link is to get.'],
    ['Digital PR','Data stories, founder commentary and product angles pitched to journalists and niche publications.'],
    ['Partner & supplier links','Manufacturers, stockists, associations and event sponsors. These are some of the most underused links in e-commerce.'],
    ['Resource placements','Your guides placed on curated resource pages and roundups where they genuinely belong.'],
    ['Mention reclamation','Unlinked brand and product mentions found and turned into links.'],
    ['Risk cleanup','Review of toxic links and a disavow file only where it’s actually needed, which is less often than most people think.'],
  ],
  prose:`<h2>What I won’t do</h2>
<p>No private blog networks, no bulk guest posts on sites with no real audience, no links in footers or comments, and no “DA 50 for $20” offers. These are the tactics that cause sudden drops after spam updates, and many stores that come to me for recovery are cleaning up after them.</p>
<h2>What a good link looks like</h2>
<ul><li>A real site with real organic traffic, not just a high DA score</li>
<li>Relevant to your niche or to your customers</li>
<li>Placed in the body content, where a reader would actually click it</li>
<li>Pointing to a page that deserves it, usually a guide or collection</li></ul>
<h2>Links work best with good pages</h2>
<p>I build links alongside technical and content work, not on their own. Links pointing to a thin collection page don’t do much. The same links pointing to a strong collection page can move it onto page one.</p>`,
  proof:'diamonds',
  faqs:[
    {q:'How many backlinks will I get per month?',a:'It depends on the budget and the niche. I’ll commit to a quality bar rather than a number. Five relevant editorial links are worth more than fifty directory links, and every link is reported with its live URL.'},
    {q:'Are paid links against Google’s guidelines?',a:'Buying links to manipulate rankings is. My campaigns rely on PR, partnerships and outreach. Where a placement includes a fee (such as a sponsorship), it’s marked with the correct rel attribute.'},
    {q:'How long until links affect rankings?',a:'Usually 6–12 weeks after a link is indexed. The effect builds over time, which is why campaigns run for at least three months.'},
    {q:'Should I disavow old links?',a:'Only if there’s a clear pattern of manipulative links or a manual action. Google ignores most spam on its own. I’ll review your profile before recommending anything.'},
  ],
  related:['shopify-content-seo','shopify-seo','shopify-seo-audit'],
},
{
  slug:'shopify-international-seo', pillar:'seo', short:'International Shopify SEO', navNote:'Markets, hreflang, multi-country',
  serviceType:'International SEO', price:700, unit:'MON', priceLabel:'From $700/mo',
  title:'International Shopify SEO | Globe Skillz',
  desc:'SEO for Shopify stores selling across borders: Shopify Markets setup, hreflang, subfolders and domains, localized keyword research and country-level content.',
  h1:'International Shopify SEO for stores selling in more than one country',
  lead:'Shopify Markets makes selling abroad easy. Ranking abroad needs more: the correct URL structure, working hreflang, and keyword research done separately for each market.',
  facts:[['Format','Monthly, per-market roadmap'],['Starts at','$700 / month'],['Markets','2 to 20+'],['Setup','Subfolders, domains or both'],['Recent','8-market & 20+ country builds']],
  signals:['The US version of your store ranks in the UK','You enabled Markets and traffic in your home country dropped','Translated pages aren’t indexed','Prices or currency look wrong in search results','You’re launching in a new region and want it set up correctly','Several country stores are competing with each other'],
  included:[
    ['Market architecture','Subfolders vs. country domains vs. separate stores, chosen based on your brand, logistics and existing authority.'],
    ['Hreflang that validates','Return tags, x-default, and language-region codes checked across every market and template.'],
    ['Localized keyword research','“Trainers” vs. “sneakers” vs. “Turnschuhe”. Each market gets its own keyword map instead of a translation of the English one.'],
    ['Translation QA','Titles, handles, meta and alt text checked in each language, not left as automatic translations.'],
    ['Country-level content','Shipping, returns, sizing and payment content that actually differs by market.'],
    ['Per-market reporting','Search Console filtered by country, so you can see which markets are growing.'],
  ],
  prose:`<h2>Case in point: one brand, 8 markets</h2>
<p>For a kids’ travel booster brand, I redesigned the Shopify store and set up SEO across <b>8 markets</b> for a flagship product launch. Later, a conversion-focused redesign rolled out to <b>20+ countries</b>. The store now gets about <b>12.7K organic visits a month</b> (+17%) and ranks for 3.4K keywords.</p>
<p><a href="../case-studies/booster-brand-international-shopify-seo.html">Read the full case study →</a></p>
<h2>Common Shopify Markets mistakes</h2>
<ul><li>Leaving auto-redirects by IP on, so Googlebot (crawling from the US) never sees your other markets</li>
<li>Translated content with English handles and English meta descriptions</li>
<li>Country subfolders with identical content and no reason to exist</li>
<li>Missing x-default, which leaves Google to guess</li></ul>
<h2>We serve every market, including emerging ones</h2>
<p>I work with brands selling into North America, the UK, the EU, the Gulf, South Asia and Australia. That includes stores in Pakistan selling at home and abroad.</p>`,
  proof:'booster',
  faqs:[
    {q:'Should I use subfolders or separate domains for international Shopify SEO?',a:'For most brands, subfolders (example.com/en-gb/) on a single store are best, because every market shares the same domain authority. Separate domains make sense when markets need very different catalogs or brands.'},
    {q:'Does Shopify Markets handle hreflang automatically?',a:'Mostly, yes. It still needs checking: custom themes, apps and translated handles can break it, and x-default and return tags often need adjusting.'},
    {q:'Do I need to translate everything?',a:'Start with the pages that earn revenue: home, top collections, top products and policies. Translate the blog selectively, based on keyword demand in each market.'},
    {q:'Can you handle Pakistan or other emerging markets?',a:'Yes. Search behavior and competition are different in each market, and I adjust the keyword research and content to match.'},
  ],
  related:['shopify-technical-seo','shopify-seo','shopify-migration'],
},
{
  slug:'shopify-ai-search-optimization', pillar:'seo', short:'AI Search Optimization', navNote:'AEO / GEO for stores',
  serviceType:'Generative engine optimization', price:300, unit:'MON', priceLabel:'Included in retainers · from $300/mo',
  title:'AI Search Optimization for Shopify | Globe Skillz',
  desc:'Help your Shopify store appear in Google AI Overviews, ChatGPT, Gemini and Perplexity answers with entity clarity, structured data and quotable content.',
  h1:'Get your Shopify store into AI answers',
  lead:'Shoppers now ask ChatGPT, Gemini and Google’s AI Overviews what to buy. I make sure those systems understand your brand, trust your pages and cite your store.',
  facts:[['Format','Add-on or standalone'],['Starts at','$300 / month'],['Covers','AI Overviews, ChatGPT, Perplexity'],['Foundation','Schema + entity + content'],['Tracking','Prompt-level visibility']],
  signals:['Competitors are cited in AI Overviews for your category and you aren’t','ChatGPT describes your brand incorrectly or doesn’t know it','Your store has little structured data','Brand facts (founder, materials, origin) are scattered or inconsistent','High-consideration products that people research a lot','You want to future-proof the organic channel'],
  included:[
    ['Entity foundation','Consistent Organization, Brand and Product data across your site, Google Merchant Center and third-party profiles.'],
    ['Answer-first content','Key pages restructured with a clear answer at the top, defined terms and comparison tables that AI systems can quote.'],
    ['Structured data depth','Product, Offer, Review, FAQ and HowTo markup, kept accurate and matched to the visible page content.'],
    ['llms.txt & crawl access','A clean llms.txt file, a robots policy for AI crawlers that you approve, and fast server-rendered pages.'],
    ['Third-party presence','Reviews, roundups and forum mentions. These are the sources AI models rely on most when recommending products.'],
    ['Visibility tracking','A fixed set of buyer prompts checked monthly across the major AI assistants.'],
  ],
  prose:`<h2>AI search is built on top of regular SEO</h2>
<p>AI answers are built from pages that already rank and sources that are already trusted. There’s no separate trick. What helps is being very clear about who you are and what you sell, being easy for these systems to quote, and getting mentioned on the sites they read.</p>
<h2>What changes on your store</h2>
<ul><li>Collection and product pages open with a plain one-sentence summary</li>
<li>Specs, materials and comparisons go into tables instead of long paragraphs</li>
<li>One About page that’s the authoritative source of brand facts</li>
<li>Consistent schema across every template, linked with <code>@id</code></li></ul>
<div class="callout"><b>Honest note:</b> AI visibility is newer and harder to measure than rankings. I report what can be measured, which is prompt checks and AI-referral traffic in GA4, and I don’t promise placements.</div>`,
  proof:'courses',
  faqs:[
    {q:'What is GEO or AEO?',a:'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) both mean optimizing so AI assistants and AI Overviews mention and cite your brand. In practice it’s SEO with extra focus on entity clarity, structured data and quotable content.'},
    {q:'Can I pay to appear in ChatGPT answers?',a:'Not in organic answers. Visibility comes from being a trusted, well-described and well-cited source, which is what this service works on.'},
    {q:'Should I block AI crawlers?',a:'That’s a business decision. Blocking them protects your content but removes you from AI answers. For most stores that want to be found, allowing them is the better choice. I’ll explain the trade-offs.'},
    {q:'Is this included in your monthly Shopify SEO?',a:'The basics are included in every retainer. The standalone service adds deeper content restructuring, third-party outreach and prompt tracking.'},
  ],
  related:['shopify-content-seo','shopify-seo','shopify-on-page-seo'],
}
);
