// Read-only external GET checks. Separate from deterministic CI: publishers may
// rate-limit bots, so a failed request requires investigation, not silent removal.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'parse5';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);
const nodes = node => [node, ...(node.childNodes || []).flatMap(nodes)];
const urls = new Set();
for (const file of walk('dist').filter(file => file.endsWith('.html'))) {
  for (const node of nodes(parse(readFileSync(file, 'utf8')))) {
    if (node.tagName !== 'a') continue;
    const href = node.attrs?.find(a => a.name === 'href')?.value;
    if (href?.startsWith('https://') && new URL(href).hostname !== 'danishwestindies.org') urls.add(href);
  }
}
const results = await Promise.all([...urls].sort().map(async url => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
    await response.body?.cancel();
    return { url, status: response.status, finalUrl: response.url };
  } catch (error) { return { url, status: 'unverified', reason: error.message }; }
}));
for (const result of results) console.log(JSON.stringify(result));
if (results.some(result => typeof result.status !== 'number' || result.status >= 400)) process.exitCode = 1;
