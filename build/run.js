// Regenerate the whole site from build/*.js into the repo root.
// Usage from the repo root:  node build/run.js
// Writes every page plus sitemap.xml, robots.txt, llms.txt and _redirects.
// Static files (CNAME, .nojekyll, assets/) are left untouched.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const G = {};
const sandbox = { G, console };
vm.createContext(sandbox);
const files = [
  'build/lib.js', 'build/data.js', 'build/services-seo.js', 'build/services-dev.js',
  'build/pages-core.js', 'build/pages-services.js', 'build/pages-misc.js',
  'build/pages-blog.js', 'build/build.js',
];
for (const f of files) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
}
for (const p of G.pages) {
  const dest = path.join(root, p.path);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, p.html);
}
for (const [name, content] of [['sitemap.xml', G.sitemap], ['robots.txt', G.robots], ['llms.txt', G.llms], ['_redirects', G.redirects]]) {
  fs.writeFileSync(path.join(root, name), content);
}
