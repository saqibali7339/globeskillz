#!/usr/bin/env python3
"""Regenerate sitemap.xml with clean URLs only (no .html, no query strings).

Run after tools/build_clean_urls.py. Shares its SITE_BASE constant so the
domain flip happens in one place.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_clean_urls import SITE_BASE, ROOT, project_catalog

TODAY = '2026-09-27'

urls = [SITE_BASE + '/']
urls.append(SITE_BASE + '/blogs/')

posts = json.load(open(os.path.join(ROOT, 'data/blog/index.json'), encoding='utf-8'))
for p in posts:
    urls.append(SITE_BASE + '/blog/%s/' % p['slug'])

for slug, _t, _s in project_catalog():
    urls.append(SITE_BASE + '/project/%s/' % slug)

for d, seg in (('data/loc', 'locations'), ('data/niche', 'industries')):
    for fn in sorted(os.listdir(os.path.join(ROOT, d))):
        if fn.endswith('.json'):
            urls.append(SITE_BASE + '/%s/%s/' % (seg, fn[:-5]))

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls:
    lines.append('  <url><loc>%s</loc><lastmod>%s</lastmod></url>' % (u, TODAY))
lines.append('</urlset>')

out = os.path.join(ROOT, 'sitemap.xml')
with open(out, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines) + '\n')
print('sitemap.xml: %d urls' % len(urls))
