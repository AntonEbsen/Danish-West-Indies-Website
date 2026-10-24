# Danish West Indies — history, sources and method

An independent educational website developed by **Anton Meier Ebsen Jørgensen**,
MSc student in Economics at the University of Copenhagen. The related St. Croix
thesis is joint, ongoing work with Jonas Skov Nielsen and Sheng Ye Michael Chen,
supervised by Paul Sharp. Expected MSc completion: January 2027.

This is not an official university or Rigsarkivet website, a peer-reviewed
publication, a comprehensive archive, or a release of final thesis findings.

## Published selection

- Three short historical readings: the 1792 ordinance, emancipation in 1848,
  and Fireburn in 1878. Each separates source types, precise references and limits.
- English and Danish versions, with working page-to-page language links.
- One approved source-to-data excerpt: two cropped archival images, three counts,
  downloadable CSV and provenance JSON. It is not human ground truth or a linkage test.
- Honest project/contribution statements, source policy, AI disclosure and corrections link.

## Publication boundary

`publication/` is the only Astro source directory; `publication/public/` is the
only copied public-assets directory. The existing `src/`, `public/`, `scratch/`
and `editorial/` contain legacy prototypes or drafts and are **not deployed**.
They remain in this public source repository: “not deployed” does not mean private.
Their old descriptions, placeholder statistics and implied feature availability
are not statements about the current publication.

Do not switch back to `src/` or copy all of legacy `public/` into the build.
Unverified chart series, generated descendant testimony, manuscript placeholders,
fake-success forms and server-only AI tools must not silently return.
Retired routes return the explicit bilingual 404 page. No API key is needed.
There are no visitor uploads, live AI calls, trackers or remote fonts.

## Local verification

Node 24 and npm are used by CI.

```sh
npm ci
npm audit --audit-level=high
npm run check
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run preview -- --host 127.0.0.1 --port 4382
```

The browser suite launches its own **production preview** on port 4382; do not run
another preview on that port at the same time. Tests check both languages, 320px
and 390px mobile widths, WCAG A/AA rules via axe, keyboard access, actual
CSV/JSON downloads, print styles, no-JavaScript navigation and network isolation.
Static tests crawl built links/fragments/assets and pin approved image hashes.

For a dev server, follow `AGENTS.md` and the installed Astro command's documented
background controls. The reader audit does not need a dev server.

## Hosting and release

GitHub Pages is the existing host; `danishwestindies.org` is the existing custom
domain. The build is explicitly static, with `dist/index.html`, `CNAME` and
`.nojekyll` at the artifact root. There is no Node adapter or runtime API.
DNS and repository Pages settings are not changed by this source revision.

Pull requests run the entire build/audit/test workflow without deploying.
A successful push to main (or manual workflow on main) uploads **dist**, then
deploys it with GitHub Pages. Verify the actual domain after deployment; a local
build or green PR is not evidence that the public 404 has already been fixed.
Do not restore unsupported server features on Pages.

## Editorial and reuse rules

New article revisions are AI-assisted educational summaries, not falsely credited
to thesis coauthors. Each must identify sources and distinguish facts,
interpretation, uncertainty and teaching prompts. The current reference check
was AI-assisted on 24 October 2026, not independent human historical review.

Source-image permission and coauthor approval were confirmed by Anton for the
bounded example. No general archival-image reuse licence is granted.
`publication/public/evidence/provenance.json` records source IDs, hashes,
crop coordinates, reading method and limited checks. Never add full scans,
private logs, names or linkage data without a new scope/permission review.

MIT covers software; third-party archival rights remain separate. Contact Anton
about reuse of educational text. Report corrections through the linked GitHub
issue form, keeping private information out of public issues.

See [implementation and verification notes](docs/application-readiness-2026-10-24.md).
