#!/usr/bin/env python3
"""Generate clean-URL directory pages (index.html per page) for GitHub Pages.

GitHub Pages has no rewrite layer, so every clean URL is a real directory
containing an index.html baked from one of the four templates:

  locations/<slug>/index.html   <- location.html (PAGE_TYPE='loc')
  industries/<slug>/index.html  <- location.html (PAGE_TYPE='niche')
  blog/<slug>/index.html        <- blog.html     (PAGE_TYPE='post')
  project/<slug>/index.html     <- project.html  (PAGE_TYPE='project')
  blogs/index.html              <- blogs.html    (PAGE_TYPE='blogindex')

The original templates (location.html, blog.html, project.html, blogs.html)
are kept as backward-compatible fallbacks for the old ?slug= query URLs.

Usage:
  python3 tools/build_clean_urls.py            # full regeneration (611 pages)
  python3 tools/build_clean_urls.py --only-blog <slug>   # regenerate one post

SITE_BASE: flip this one constant when the custom domain goes live.
"""
import argparse
import json
import os
import re
import sys

# ---------------------------------------------------------------------------
# FLIP THIS when globeskillz.com is registered:
#   SITE_BASE = 'https://globeskillz.com'
# ---------------------------------------------------------------------------
SITE_BASE = 'https://globeskillz.com'

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OLD_SITE = 'https://saqibali7339.github.io/globeskillz'


def read(p):
    with open(os.path.join(ROOT, p), encoding='utf-8') as f:
        return f.read()


def rewrite_relative_urls(html, depth):
    """Prefix every relative href/src with ../ x depth so assets, data,
    favicon, nav and internal links resolve from nested directories."""
    prefix = '../' * depth

    def fix(m):
        attr, url = m.group(1), m.group(2)
        if not url or '${' in url or url.startswith(('#', 'http://', 'https://',
                                                     '//', 'mailto:', 'tel:',
                                                     'data:')):
            # '${' = JS template literal already carrying the RP depth prefix
            return m.group(0)
        if url.startswith('./'):
            url = url[2:]  # './' and './#x' -> prefix and prefix + '#x'
        return attr + '="' + prefix + url + '"'

    return re.sub(r'(href|src)="([^"]*)"', fix, html)


def bake_head(html, clean_path, title, desc):
    """Bake absolute canonical/OG URLs and title/description into <head>."""
    url = SITE_BASE + clean_path

    def rep(new):
        return lambda m: m.group(1) + new + m.group(2)

    html = re.sub(r'(<link (?:id="pageCanon" )?rel="canonical" href=")[^"]*(")',
                  rep(url), html)
    html = re.sub(r'(<meta property="og:url"(?: id="ogUrl")? content=")[^"]*(")',
                  rep(url), html)
    html = re.sub(r'(<title(?: id="pageTitle")?>)[^<]*(</title>)',
                  rep(title), html, count=1)
    html = re.sub(r'(<meta id="pageDesc" name="description" content=")[^"]*(")',
                  rep(desc), html)
    html = re.sub(r'(<meta name="description" content=")[^"]*(")',
                  rep(desc), html, count=1)
    html = re.sub(r'(<meta property="og:title"(?: id="ogTitle")? content=")[^"]*(")',
                  rep(title), html)
    html = re.sub(r'(<meta name="twitter:title"(?: id="ogTitle")? content=")[^"]*(")',
                  rep(title), html)
    html = re.sub(r'(<meta property="og:description"(?: id="ogDesc")? content=")[^"]*(")',
                  rep(desc), html)
    html = re.sub(r'(<meta name="twitter:description"(?: id="ogDesc")? content=")[^"]*(")',
                  rep(desc), html)
    # Point runtime canonical/JSON-LD builders at the same base
    html = html.replace("const GS_SITE = '" + OLD_SITE + "'",
                        "const GS_SITE = '" + SITE_BASE + "'")
    return html


def bake_page(template_name, out_dir, page_type, slug, depth, clean_path,
              title, desc):
    html = read(template_name)
    # Baked pages must never redirect: strip any meta-refresh redirect tag
    # inherited from the template (2026-09-28: it bounced a live post to /blogs/).
    html = re.sub(r'<meta http-equiv="refresh"[^>]*>\s*', '', html)
    bake = ("<script>var PAGE_TYPE='%s';var PAGE_SLUG='%s';var PAGE_DEPTH=%d;</script>"
            % (page_type, slug, depth))
    m = re.search(r'<body[^>]*>', html)
    assert m, 'no <body> in ' + template_name
    html = html[:m.end()] + '\n' + bake + html[m.end():]
    html = rewrite_relative_urls(html, depth)
    html = bake_head(html, clean_path, title, desc)
    out = os.path.join(ROOT, out_dir, 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(html)
    return out


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('"', '&quot;')


def meta_desc(keyword, intro, limit=160):
    """Keyword-led meta description: primary keyword first, then intro,
    truncated at a word boundary so the keyword always appears."""
    raw = (keyword.strip() + ' \u2014 ' + intro.strip()).strip()
    if len(raw) <= limit:
        return esc(raw)
    return esc(raw[:limit].rsplit(' ', 1)[0])


def js_unescape(s):
    """Decode JS \\uXXXX escapes found in the PROJECTS map into real chars."""
    return re.sub(r'\\u([0-9a-fA-F]{4})',
                  lambda m: chr(int(m.group(1), 16)), s)


# ---------------------------------------------------------------------------
# Heading bake: raw-HTML H1/H2s (2026-09-28 audit fix).
# The templates render these via JavaScript, so non-rendering crawlers saw
# "Loading…" H1s and identical H2s across pages. These post-processors bake
# the same values the runtime JS computes into the static HTML of each
# generated page. Templates keep their generic fallbacks for ?slug= URLs.
# ---------------------------------------------------------------------------

def bake_h1_words(h1_text):
    """Replicate location.html's runtime H1 word-split: last 2-3 words get
    the gradient span, everything else plain word spans."""
    words = esc(h1_text).split()
    n = len(words)
    out = []
    for i, w in enumerate(words):
        if i >= max(0, n - 3):
            out.append('<span class="word"><span class="text-grad">%s</span></span>' % w)
        else:
            out.append('<span class="word">%s</span>' % w)
    return ' '.join(out)


# Display-name overrides for the H2 bake: two niche pages share the display
# name "restaurants" (slugs `restaurants` and `restaurant`, different
# keywords/H1s). Qualify the latter by its own keyword angle so every page
# still renders a unique H2 set.
LOC_DN_OVERRIDES = {
    'restaurant': 'restaurant SEO',
}


def bake_loc_headings(path, data, ptype, slug):
    """Bake real H1 + unique per-page H2s into a generated loc/niche page."""
    with open(path, encoding='utf-8') as f:
        html = f.read()
    raw_dn = data['niche'] if ptype == 'niche' else data['place']
    dn = esc(LOC_DN_OVERRIDES.get(slug, raw_dn))

    # H1: replace the "Loading…" placeholder with the runtime word-split HTML
    html = html.replace(
        '<span class="split" data-split="words">Loading…</span>',
        '<span class="split" data-split="words">%s</span>'
        % bake_h1_words(data['h1']), 1)

    # H2s: same values the runtime JS computes, baked statically
    why = data.get('why', {}).get('heading')
    why_html = esc(why) if why else \
        'Why %s <span class="text-grad">needs specialist SEO.</span>' % dn
    html = html.replace(
        '<h2 class="h-section reveal d1" id="whyHeading">Why this matters</h2>',
        '<h2 class="h-section reveal d1" id="whyHeading">%s</h2>' % why_html, 1)

    html = html.replace(
        '<h2 class="h-section reveal d1" id="factsHeading">Local intelligence '
        '<span class="text-grad">we build on.</span></h2>',
        '<h2 class="h-section reveal d1" id="factsHeading">Local intelligence '
        '<span class="text-grad">for %s.</span></h2>' % dn, 1)

    html = html.replace(
        '<h2 class="h-section reveal d1" id="faqHeading">Questions we '
        '<span class="text-grad">get asked.</span></h2>',
        '<h2 class="h-section reveal d1" id="faqHeading">%s '
        '<span class="text-grad">questions, answered.</span></h2>' % dn, 1)

    if ptype == 'niche':
        rel_html = ('More industries we rank in '
                    '<span class="text-grad">beyond %s.</span>' % dn)
    else:
        rel_html = ('More places we rank in '
                    '<span class="text-grad">beyond %s.</span>' % dn)
    html = html.replace(
        '<h2 class="h-section reveal d1">More places we '
        '<span class="text-grad">rank in.</span></h2>',
        '<h2 class="h-section reveal d1">%s</h2>' % rel_html, 1)

    html = html.replace(
        'SEO guides for <span class="text-grad" id="rrName">your market.</span>',
        'SEO guides for <span class="text-grad" id="rrName">%s.</span>' % dn, 1)

    html = html.replace(
        '<h2 class="h-section" style="margin-top:18px" id="ctaH2">'
        'Ready to dominate <span class="text-grad">your market</span>?</h2>',
        '<h2 class="h-section" style="margin-top:18px" id="ctaH2">'
        'Ready to dominate <span class="text-grad">%s</span>?</h2>' % dn, 1)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)


def bake_blog_headings(path, data):
    """Bake the post title as H1 + a per-topic FAQ H2 into a blog post."""
    with open(path, encoding='utf-8') as f:
        html = f.read()

    html = html.replace(
        '<h1 class="h-display article__title" id="artTitle">Loading…</h1>',
        '<h1 class="h-display article__title" id="artTitle">%s</h1>'
        % esc(data['title']), 1)

    topic = esc(data.get('faq_topic', 'SEO'))
    html = html.replace(
        '<h2 class="h-section">Questions, '
        '<span class="text-grad">answered.</span></h2>',
        '<h2 class="h-section">%s '
        '<span class="text-grad">questions, answered.</span></h2>' % topic, 1)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)


# Short per-project labels for unique section H2s ("The brief: <label>", …).
PROJECT_H2_LABELS = {
    'bubblebum': 'Bubblebum TelePort launch',
    'jardine': 'Jardine garden cushions',
    'sandaoil': 'Sanda Oil DTC brand',
    'sensibelle': 'Sensibelle Summer Edit',
    'sahel': 'Sahel Solar site',
    'vytal': 'Vytal Beet supplements launch',
    'zermatt': 'Zermatt Stil lifestyle brand',
    'ebike': 'fat-tyre e-bike brand',
    'cellblog': 'cell phone review blog',
    'bubblebum2': 'Bubblebum global relaunch',
    'wooden': 'wooden tables store',
    'water': 'Water for Life charity',
    'plurality': 'Plurality agentic web app',
    'albarik': 'Albarik Pakistan megastore',
}


def bake_project_headings(path, slug):
    """Make the four section H2s unique per project in the baked page."""
    label = PROJECT_H2_LABELS.get(slug)
    if not label:
        return
    with open(path, encoding='utf-8') as f:
        html = f.read()
    for section in ('The brief', 'What we built', 'The results', 'The proof'):
        html = html.replace('<h2>%s</h2>' % section,
                            '<h2>%s: %s</h2>' % (section, esc(label)), 1)
    # Related-projects section heading: same per-project treatment
    html = html.replace(
        '<h2 class="h-section" style="margin-top:14px">Other '
        '<span class="text-grad">recent wins.</span></h2>',
        '<h2 class="h-section" style="margin-top:14px">Other recent wins '
        '<span class="text-grad">beyond %s.</span></h2>' % esc(label), 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)


def gen_locations():
    n = 0
    for d, ptype, seg in (('data/loc', 'loc', 'locations'),
                          ('data/niche', 'niche', 'industries')):
        for fn in sorted(os.listdir(os.path.join(ROOT, d))):
            if not fn.endswith('.json'):
                continue
            slug = fn[:-5]
            data = json.load(open(os.path.join(ROOT, d, fn), encoding='utf-8'))
            keyword = data.get('keyword', slug)
            intro = data.get('intro', '')
            title = esc(keyword) + ' \u00b7 Globe Skillz'
            desc = meta_desc(keyword, intro)
            out = bake_page('location.html', os.path.join(seg, slug), ptype, slug, 2,
                            '/%s/%s/' % (seg, slug), title, desc)
            bake_loc_headings(out, data, ptype, slug)
            n += 1
    return n


def gen_blogs(only=None):
    posts = json.load(open(os.path.join(ROOT, 'data/blog/index.json'),
                           encoding='utf-8'))
    n = 0
    for p in posts:
        slug = p['slug']
        if only and slug != only:
            continue
        data = json.load(open(os.path.join(ROOT, 'data/blog/%s.json' % slug),
                              encoding='utf-8'))
        title = esc(data['title']) + ' \u00b7 Globe Skillz Blog'
        desc = esc(data.get('meta', data.get('excerpt', ''))[:160])
        out = bake_page('blog.html', os.path.join('blog', slug), 'post', slug, 2,
                        '/blog/%s/' % slug, title, desc)
        bake_blog_headings(out, data)
        n += 1
    if only and n == 0:
        sys.exit('unknown blog slug: %s' % only)
    return n


def project_catalog():
    """Extract project slugs + titles from the PROJECTS map in project.html."""
    html = read('project.html')
    out = []
    for m in re.finditer(r"^  '([a-z0-9-]+)': \{$", html, re.M):
        slug = m.group(1)
        tail = html[m.end():m.end() + 2000]
        t = re.search(r"title: '([^']+)'", tail)
        s = re.search(r"sub: '([^']+)'", tail)
        out.append((slug,
                    js_unescape(t.group(1)) if t else slug,
                    js_unescape(s.group(1)) if s else ''))
    return out


def gen_projects():
    n = 0
    for slug, title, sub in project_catalog():
        out = bake_page('project.html', os.path.join('project', slug), 'project',
                        slug, 2, '/project/%s/' % slug,
                        esc(title) + ' \u00b7 Globe Skillz', esc(sub[:160]))
        bake_project_headings(out, slug)
        n += 1
    return n


def gen_blog_index():
    html = read('blogs.html')
    bake = "<script>var PAGE_TYPE='blogindex';var PAGE_DEPTH=1;</script>"
    m = re.search(r'<body[^>]*>', html)
    assert m, 'no <body> in blogs.html'
    html = html[:m.end()] + '\n' + bake + html[m.end():]
    html = rewrite_relative_urls(html, 1)
    html = bake_head(html, '/blogs/', 'Blog \u00b7 Globe Skillz',
                     esc('Practical SEO and website growth articles for business '
                         'owners, from the Globe Skillz studio.'))
    out = os.path.join(ROOT, 'blogs', 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(html)
    return 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only-blog', metavar='SLUG',
                    help='regenerate a single blog/<slug>/ page')
    args = ap.parse_args()

    if args.only_blog:
        n = gen_blogs(only=args.only_blog)
        print('regenerated blog/%s/ (%d page)' % (args.only_blog, n))
        return

    counts = {
        'locations+industries': gen_locations(),
        'blog posts': gen_blogs(),
        'projects': gen_projects(),
        'blog index': gen_blog_index(),
    }
    total = sum(counts.values())
    for k, v in counts.items():
        print('  %-20s %d' % (k, v))
    print('total generated pages: %d' % total)


if __name__ == '__main__':
    main()
