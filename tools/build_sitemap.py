#!/usr/bin/env python3
"""Regenerate sitemap.xml with clean URLs only (no .html, no query strings).

Includes: homepage, blogs listing, blog posts, projects, ALL service pages,
all location pages, all industry pages. lastmod comes from each page's actual
file mtime so Google sees honest dates. Every URL is verified to exist on
disk before inclusion (a sitemap full of 404s is a quality signal problem).
"""
import json
import os
import sys
from datetime import date, datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_clean_urls import SITE_BASE, ROOT, project_catalog

def mtime_of(*rel):
    p = os.path.join(ROOT, *rel)
    if os.path.isfile(p):
        return date.fromtimestamp(os.path.getmtime(p)).isoformat()
    return None

entries = []  # (url, lastmod)

def add(url, *rel):
    lm = mtime_of(*rel)
    if lm is None:
        print('SKIP (missing file):', url, file=sys.stderr)
        return
    entries.append((url, lm))

add(SITE_BASE + '/', 'index.html')
add(SITE_BASE + '/blogs/', 'blogs.html')

posts = json.load(open(os.path.join(ROOT, 'data/blog/index.json'), encoding='utf-8'))
for p in posts:
    add(SITE_BASE + '/blog/%s/' % p['slug'], 'blog', p['slug'], 'index.html')

for slug, _t, _s in project_catalog():
    add(SITE_BASE + '/project/%s/' % slug, 'project', slug, 'index.html')

for svc in sorted(os.listdir(os.path.join(ROOT, 'services'))):
    if os.path.isdir(os.path.join(ROOT, 'services', svc)):
        add(SITE_BASE + '/services/%s/' % svc, 'services', svc, 'index.html')

for d, seg in (('data/loc', 'locations'), ('data/niche', 'industries')):
    for fn in sorted(os.listdir(os.path.join(ROOT, d))):
        if fn.endswith('.json'):
            slug = fn[:-5]
            add(SITE_BASE + '/%s/%s/' % (seg, slug), seg, slug, 'index.html')

seen = set()
lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u, lm in entries:
    if u in seen:
        print('SKIP (duplicate):', u, file=sys.stderr)
        continue
    seen.add(u)
    lines.append('  <url><loc>%s</loc><lastmod>%s</lastmod></url>' % (u, lm))
lines.append('</urlset>')

out = os.path.join(ROOT, 'sitemap.xml')
with open(out, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines) + '\n')
print('sitemap.xml: %d urls' % len(seen))
