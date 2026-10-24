# Educational-site application readiness — 24 October 2026

## Scope and sequence

Implemented the requested order: (1) compatible hosting, (2) prototype cleanup,
(3) accurate contribution/status, (4) sources, (5) approved example, (6) reader QA.

This is deliberately a smaller publication, not a claim that all legacy features
are ready. Dark charcoal/brass styling is retained, with readable text, simple
navigation, no remote fonts and no required JavaScript. English is at `/`, Danish
at `/da/`; page-level language links preserve the corresponding route.

## 1. Hosting boundary

The old config combined a Node adapter and non-prerendered APIs with GitHub Pages.
The public domain returned the GitHub Pages missing-file page during inspection.
We have not assumed this was the only possible cause of that 404.

The new config uses static output and an explicit `publication/` source root.
Only `publication/public/` assets are copied. The generated artifact includes
`dist/index.html`, the existing-domain `CNAME` and `.nojekyll` at its root.
No Node adapter, server bundle or API routes are deployed. Unneeded AI/server
dependencies are removed from the active dependency tree, not retained at risk
solely for unpublished prototypes. The lockfile is regenerated normally.

CI now installs before auditing, checks/builds/tests PRs without deployment, and
uploads exactly `dist` on main only. Pages deployment permissions are restricted
to the deploy job. No DNS, account setting, repository visibility or domain-owner
change is part of this revision. A successful PR build is not a live release.

## 2. Legacy material

The pre-existing `src/` and `public/` files are retained, not deleted or rewritten.
They are public repository history/source, **not private**. They are not included
in the site build. This excludes generated descendant quotations and stock photos,
invented usage counters, untraceable chart series, fake-success forms, unimplemented
downloads, book promotion, placeholder chapters and unsourced extra translations.
No AI routes remain in the published artifact. A bilingual custom 404 explains
why retired and unfinished routes are absent. Existing article slugs for the
three revised topics are retained.

Anton’s original checkout had four dirty files at the start: Layout.astro,
the homepage, history index and thesis index. Work takes place on an isolated
branch from eb24bea; those four local files are not imported, reset or staged.

## 3. Attribution

Anton confirmed in this chat that he alone worked on the website. The site states
that explicitly. The MSc thesis remains joint with Jonas Skov Nielsen and Sheng
Ye Michael Chen, supervised by Paul Sharp, and is work in progress. Anton’s
confirmed responsibilities are transcription, linkage and cleaning, with the
main contribution to empirical design and planter-model calibration.

The qualification is MSc **Economics**; economic history describes the research
area, not an invented degree title. Dates are May 2024 (BSc), September 2024 (MSc
start), January 2027 (expected completion). There is no claim of a defended thesis,
completed causal results, institutional partnership, independent historical peer
review or completed replication package. New AI-assisted summaries are not
falsely attributed as articles authored by the thesis coauthors.

## 4. Historical readings and primary-source checks

Three concise bilingual readings replace the broad unreviewed publication:

| Reading | Evidence used | Deliberate limit |
| --- | --- | --- |
| 1792 ordinance / 1803 implementation | Primary ordinance, clauses 1, 2, 4–5, printed collection pp. 69–71 via Danmarkshistorien/Lex; National Museum object 17/2001 (DNT-25582) | Legal provisions are not causal estimates of prices or health |
| Emancipation, 1848 | HistorieLab source 9: adapted primary proclamation and historical poster; Rikke Lie Halberg’s Lex account | Official declaration is not evidence of complete implementation |
| Fireburn, 1878 | Halberg’s Lex account; Rigsarkivet catalogue item 20196384, military-court records | Finding aid is not testimony; a case file does not prove guilt or genealogy |

Source types, locators, bracketed references, uncertainty and teaching questions
are explicit. This is AI-assisted source checking on 24 October 2026, not an
independent human historian’s review. Historical titles can contain offensive
language and are contextualized. No lengthy source text or external image is
copied. The former National Museum narrative-page URLs returned 404 in live
requests and are not used; the working collection-item URL is used instead.

## 5. Approved source-to-data example

Only two previously approved crops and the three counts 54, 32, 86 are copied
from the personal-site evidence branch. Crop bytes are pinned in tests. Public
image reproduction and coauthor approval were confirmed by Anton. No full scan,
name, private reading JSON, linkage keys or other thesis data is exported.

Source: Rigsarkivet, St. Croix General Tabell, 31 December 1792, Dronningens
Quarteer, third estate row; viewer image 207; epid 20201795, bsid 292226,
imageID 58788329. Source URL, hashes, crop boxes, reading date/method and limited
checks are retained in the public provenance JSON. The CSV corresponds to that
record. Historical labels are not represented as validated identities.

The existing reading is model-assisted (19 September 2026); the subsequent
comparison is AI-assisted, not independent human ground truth. The arithmetic
54 + 32 = 86 does not demonstrate transcription accuracy, full-sheet validation,
genealogical linkage or a causal finding. No general image licence is granted.

## 6. Reader verification

- Production static build: 21 HTML pages (10 English, 10 Danish, custom 404).
- Astro diagnostics: zero errors, warnings or hints.
- Dependency audit: zero reported vulnerabilities; no gate disabled.
- Static checks cover all built internal links, anchors and assets; language
  alternates; page structure; publication boundaries; evidence hashes/CSV; sitemap;
  confirmed dates, name, role and work-in-progress status.
- Browser tests cover 20 content routes, mobile widths 320px/390px, axe WCAG
  A/AA checks, actual CSV/JSON downloads, language round trip, keyboard skip link,
  no-JavaScript navigation, print styles, screenshots and no third-party requests.
- Local result: all 7 static integrity tests and all 25 browser tests pass,
  without retries or skips. Desktop, mobile and print screenshots were inspected.
- External-link GET check: all 11 unique links returned HTTP 200, including the
  archive viewer. The GitHub correction link resolves to login for anonymous
  visitors; the page explicitly warns that issues are public and may need an account.
- Print QA uses temporary Chromium-generated A4 PDFs, rendered with bundled
  Poppler for visual inspection. These are ignored QA files, not published
  manuscripts or new academic downloads. Browser-generated print PDFs are not
  offered as fully tagged accessible document deliverables.
- The rendered English and Danish source examples each occupy two A4 pages;
  print spacing was corrected after the first render exposed a footer-only third
  page. The sample historical reading occupies two pages, with readable sources.

### Remaining release step

The original public domain must be checked **after** the reviewed change is
merged and GitHub Pages deploys. Do not claim public availability on the basis
of local tests alone. Preserve the original checkout’s unrelated local edits
when later updating it; do not hard-reset or force-checkout it.
