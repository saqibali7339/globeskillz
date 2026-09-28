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
SITE_BASE = 'https://saqibali7339.github.io/globeskillz'

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


def js_unescape(s):
    """Decode JS \\uXXXX escapes found in the PROJECTS map into real chars."""
    return re.sub(r'\\u([0-9a-fA-F]{4})',
                  lambda m: chr(int(m.group(1), 16)), s)


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
            desc = esc(intro[:160])
            bake_page('location.html', os.path.join(seg, slug), ptype, slug, 2,
                      '/%s/%s/' % (seg, slug), title, desc)
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
        bake_page('blog.html', os.path.join('blog', slug), 'post', slug, 2,
                  '/blog/%s/' % slug, title, desc)
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
        bake_page('project.html', os.path.join('project', slug), 'project',
                  slug, 2, '/project/%s/' % slug,
                  esc(title) + ' \u00b7 Globe Skillz', esc(sub[:160]))
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
