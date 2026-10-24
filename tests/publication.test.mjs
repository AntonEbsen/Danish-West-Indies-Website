import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';

const root = resolve('dist');
const walkFiles = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walkFiles(join(dir, entry.name)) : [join(dir, entry.name)]);
const files = walkFiles(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const nodes = node => [node, ...(node.childNodes || []).flatMap(nodes)];
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const targetFile = pathname => {
  const local = resolve(root, `.${decodeURIComponent(pathname)}`);
  assert.ok(local === root || local.startsWith(`${root}\\`) || local.startsWith(`${root}/`), `Path escapes build: ${pathname}`);
  return existsSync(local) && statSync(local).isDirectory() ? join(local, 'index.html') : local;
};

test('Pages artifact is static, contains root entry and correct domain', () => {
  assert.ok(existsSync(join(root, 'index.html')));
  assert.equal(readFileSync(join(root, 'CNAME'), 'utf8').trim(), 'danishwestindies.org');
  assert.ok(existsSync(join(root, '.nojekyll')));
  assert.ok(!existsSync(join(root, 'server')));
  assert.ok(!existsSync(join(root, 'api')));
  assert.ok(!existsSync(join(root, 'images', 'colonial_ledger.jpg')), 'Unverified legacy public assets must not ship');
});

test('every internal link, asset and fragment resolves in the built publication', () => {
  const fragmentIds = new Map();
  for (const file of htmlFiles) fragmentIds.set(file, new Set(nodes(parse(readFileSync(file, 'utf8'))).map(n => attr(n, 'id')).filter(Boolean)));
  for (const file of htmlFiles) {
    const path = file.slice(root.length).replaceAll('\\', '/').replace(/index\.html$/, '');
    const url = new URL(path, 'https://danishwestindies.org');
    for (const node of nodes(parse(readFileSync(file, 'utf8')))) {
      const value = attr(node, node.tagName === 'img' ? 'src' : 'href');
      if (!value) continue;
      assert.notEqual(value, '#', `${file}: empty placeholder link`);
      const to = new URL(value, url);
      if (to.origin !== url.origin) continue;
      const target = targetFile(to.pathname);
      assert.ok(existsSync(target), `${file}: missing ${value}`);
      if (to.hash && fragmentIds.has(target)) assert.ok(fragmentIds.get(target).has(decodeURIComponent(to.hash.slice(1))), `${file}: missing fragment ${value}`);
    }
  }
});

test('pages have accessible structure, matching language alternates and no live tools', () => {
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const all = nodes(parse(html));
    assert.equal(all.filter(n => n.tagName === 'h1').length, 1, file);
    assert.equal(all.filter(n => n.tagName === 'main').length, 1, file);
    assert.ok(['en', 'da'].includes(attr(all.find(n => n.tagName === 'html'), 'lang')), file);
    for (const img of all.filter(n => n.tagName === 'img')) assert.ok(attr(img, 'alt')?.length, file);
    assert.equal(all.filter(n => ['form', 'iframe', 'audio', 'canvas'].includes(n.tagName)).length, 0, file);
    assert.equal(all.filter(n => n.tagName === 'script' && attr(n, 'src')).length, 0, file);
    assert.doesNotMatch(html, /Placeholder Descendant|Documents Searched Today|1420|counter-searches|human_breathing|Buy the Book|href="#"/i);
    assert.doesNotMatch(html, /(?:src|href)="https:\/\/(?:unpkg|images\.unsplash|fonts\.google|cdn\.jsdelivr)/);
    if (!file.endsWith('404.html')) {
      const alternates = all.filter(n => n.tagName === 'link' && attr(n, 'rel') === 'alternate');
      assert.deepEqual(alternates.map(n => attr(n, 'hreflang')).sort(), ['da', 'en', 'x-default']);
      for (const node of alternates) assert.ok(existsSync(targetFile(new URL(attr(node, 'href')).pathname)));
    }
  }
});

test('only curated articles and no unfinished manuscript are published', () => {
  const articles = htmlFiles.filter(file => /[/\\]history[/\\][^/\\]+[/\\]index\.html$/.test(file));
  assert.equal(articles.length, 6, '3 articles in 2 languages');
  for (const file of articles) {
    const html = readFileSync(file, 'utf8');
    assert.match(html, /2026/);
    assert.match(html, /lex\.dk/);
    assert.match(html, /\[1/);
  }
  assert.ok(!existsSync(join(root, 'thesis', '15-empirical-results')));
  assert.ok(!existsSync(join(root, 'memorial', 'descendants')));
});

test('approved crops and structured data match the bounded provenance', () => {
  const provenance = JSON.parse(readFileSync(join(root, 'evidence/provenance.json'), 'utf8'));
  assert.deepEqual(provenance.record, { creoles: 54, africans: 32, total: 86 });
  assert.equal(provenance.source.imageId, 58788329);
  assert.equal(provenance.record.creoles + provenance.record.africans, provenance.record.total);
  assert.equal(provenance.checks.scope, 'Not independent human ground truth; not a linkage or full-sheet accuracy test');
  const hashes = {
    '1792-origin-headings.png': 'c671f2dd0945785d60968865fae9091700e038a4e78c77cee6d3b6ef4186a75c',
    '1792-origin-row.png': '2cd4546e76e3243d6950eb7b009546db1ab764b1347e7a62ba1ccf6dd4dc8cf1'
  };
  for (const [name, expected] of Object.entries(hashes)) assert.equal(createHash('sha256').update(readFileSync(join(root, 'evidence', name))).digest('hex'), expected);
  assert.equal(readFileSync(join(root, 'evidence/record.csv'), 'utf8').trim().split(/\r?\n/)[1], '1792-12-31,2,3,persons recorded as enslaved,54,32,86,58788329');
  assert.deepEqual(files.filter(f => /[/\\]evidence[/\\]/.test(f)).map(f => f.split(/[/\\]/).at(-1)).sort(), ['1792-origin-headings.png', '1792-origin-row.png', 'provenance.json', 'record.csv']);
});

test('sitemap has no unpublished languages, tools or manuscript routes', () => {
  const maps = files.filter(file => /^sitemap.*\.xml$/.test(file.split(/[/\\]/).at(-1)));
  assert.ok(maps.length >= 2);
  for (const file of maps) {
    const xml = readFileSync(file, 'utf8');
    assert.doesNotMatch(xml, /\/(api|transcriber|interview|essay-grader|memorial|es|yo|fr|nl)\//);
    assert.doesNotMatch(xml, /404/);
  }
});

test('confirmed identity, dates, individual role and research status stay aligned', () => {
  const en = readFileSync(join(root, 'about/index.html'), 'utf8');
  const da = readFileSync(join(root, 'da/about/index.html'), 'utf8');
  for (const html of [en, da]) {
    assert.match(html, /Anton Meier Ebsen Jørgensen/);
    assert.match(html, /Jonas Skov Nielsen/);
    assert.match(html, /Sheng Ye Michael Chen/);
    assert.match(html, /Paul Sharp/);
  }
  assert.match(en, /May 2024/);
  assert.match(en, /September 2024/);
  assert.match(en, /January 2027/);
  assert.match(en, /developed this website independently/);
  assert.match(en, /responsible for transcription, linkage and cleaning/);
  assert.match(da, /maj 2024/);
  assert.match(da, /september 2024/);
  assert.match(da, /januar 2027/);
  assert.equal(files.filter(file => extname(file) === '.pdf').length, 0, 'No unfinished manuscript or placeholder PDF is published');
});
