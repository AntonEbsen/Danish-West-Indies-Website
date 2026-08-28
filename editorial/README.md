# Editorial — outreach drafts and production plans

Scripts, drafts and production plans for reaching an audience beyond the examiners:
the [video series](video/) and the [popular](articles/popular/) and
[op-ed](articles/oped/) article tracks.

**Everything here is currently a stub.** Every substantive field reads `TBD`, by
design — these are placeholders to be filled in once the thesis has results.

## Why it lives here

These files started in the `Master-Thesis` repository, alongside the manuscript.
They were moved here because this is where the work will actually happen after
submission, and because they have no build-time dependency on the thesis — unlike
the working paper, the book and the defence deck, which share the thesis's
bibliography, macros and figures and therefore stay with it.

Paths written as `code` (for example `results/figures/`) refer to files in the
private `Master-Thesis` repository, not to anything in this one.

## Not part of the site build

This directory is plain Markdown for people to read and edit. It is deliberately
outside `src/content/`, which is a typed Astro content collection governed by
[`src/content.config.ts`](../src/content.config.ts) — dropping loose Markdown in
there would break `astro check`.

## The wider slate

The full article slate, including the academic working paper, is tracked in
`dissemination/pipeline.md` in the thesis repository.
