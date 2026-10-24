# Methods, teaching and a bounded memorial — 24 October 2026

## Requested scope

Implement the real research-decision note and printable teaching activity, and
make a reviewed portion of the former memorial visitable again. Built from the
merged first release (6a5aa5e), on a separate follow-up branch. No thesis data or
code is modified and the original website checkout’s local edits are untouched.

## Methods note: number evidence is not independent name evidence

`/methods/linkage/` and `/da/methods/linkage/` describe an existing rule in
`code/data_acquisition/tabell_links.py`, not a newly invented demonstration.
The original module and `tests/test_tabell_links.py` were inspected read-only
at thesis revision 4d6e23bceecbcee3b486fc21b108be814b485bf4. Both selected files
were unmodified in the thesis worktree when inspected. Fingerprints and review
scope are published in `publication/public/methods/linkage-review.json`; the
underlying files and their records are not distributed with the website.

The rule drops aliases derived from a plot number written in place of a name,
retains the number-based route, and excludes that route from the routine’s
single-estate, name-based subset. Related safeguards distinguish a near spelling
from another row’s exact name and flag competing positive-count same-name rows
as ambiguous. The zero-count exception is not described as missing-data imputation.

All six existing `test_tabell_links.py` tests passed using the bundled Python
runtime, with pytest installed only in this task’s ignored test-runtime folder.
The thesis virtualenv and bundled runtime lack pytest, so neither was modified.
Bytecode and pytest cache writes were disabled; temporary fixtures went into this
task’s `tmp/`. No production data build, linkage export or thesis analysis ran.

The note explicitly separates programmed behaviour from historical linkage
precision, sample selection and causal identification. Anton’s confirmed project
responsibility is not converted into a claim of sole authorship of this routine.
The existing three-count excerpt is not misrepresented as a linkage example.

## Teaching activity

English and Danish versions each have a student worksheet at `/teaching/` and
separate teacher notes at `/teaching/teacher-notes/` (with `/da/` prefix for Danish).
The proposed 20–25 minute activity links the 1792 ordinance’s first clause to the
already approved three-cell transcription example. It includes goals, four
questions, an exit sentence, possible responses, source limits and facilitation
notes. No learner data is submitted and no account or AI tool is needed.
No classroom use, effectiveness, accreditation or curriculum alignment is claimed.

The four one-page A4 PDFs are generated from the same JSON as the HTML component,
using ReportLab 4.4.9, bundled Vera fonts and invariant metadata. A canonical
content hash plus PDF byte hashes catches stale HTML/PDF combinations in static CI.
`--check` can regenerate in memory and compare deterministic bytes. Authoring
copies are in ignored `output/pdf/`; only the four named handouts and manifest
are published. The PDF generator never reads private research data or scans.
These print PDFs are not fully tagged accessible documents; HTML alternatives
remain available. All four are rendered with Poppler for visual inspection.

## Memorial restoration

The earlier memorial UI cannot be restored wholesale without re-publishing
unsupported testimony, biographies, geographic links and statistical features.
Instead, `/memorial/` and its existing `/hans-jonathan/` and `/queen-mary/` slugs
are rebuilt as a small bilingual, no-JavaScript selection. No legacy content
collection is imported. There are no invented portraits, voice recordings,
descendant quotations, family links, tribute collection, numeric population
claims or apparently measured relationship/network statistics.

Sources read and linked:

- Erik Gøbel, *Hans Jonathan*, Lex: court outcome and life in Iceland.
- Visit Austurland, *LIBERTY and Hans Jonathan*: regional memorial account.
- Rikke Lie Halberg, *Mary Thomas*, Lex: biography and reproduced prison-register
  entry, particularly “Dom og løsladelse”.
- Government of the U.S. Virgin Islands, *8 Women Who Changed VI History*,
  “Queen Mary”: commemoration and transfer back to St. Croix in 1887.

The old Mary biography incorrectly said she spent the remainder of her life in a
Danish prison. The revised profile describes her transfer back in December 1887.
The sources differ on her birth year (circa 1842 versus circa 1848); the profile
does not silently choose one. Hans’s accounts differ about his age on arrival in
Copenhagen; no arrival age or date is asserted. No living descendants are named.
The old museum PDF link returned HTTP 404 and is not published as a working source.
The prison entry is cited through Halberg’s biography, not falsely presented as
an independently read original scan. No new third-party image is copied.

## Verification / release boundary

Local checks pass: 10 static integrity tests, 39 Chromium reader tests with no
retries or skips, and zero Astro diagnostics. The six thesis regression tests
are a separate bounded local check, not part of the website CI. PDF generation
also passes its deterministic `--check`; all four downloads are one-page A4
files and were rendered for visual review. No PDF authoring dependency was added
to the ordinary Node build. The dependency audit still reports zero vulnerabilities.

The follow-up adds six content routes per language, for 32 content pages plus
the custom 404. Static tests extend the publication allowlist to the four named
teaching PDFs and exactly two reviewed memorial profiles; removed prototypes
remain excluded. Browser checks extend to all new bilingual pages and actual
downloads. Updated navigation and HTML remain usable without JavaScript.

The first release’s post-merge workflow succeeded and the custom domain returned
HTTP 200 during this follow-up. This revision is a separate review change and is
not production merely because the first release was deployed. PR validation and
preview are separate from a merge and subsequent Pages deployment.
