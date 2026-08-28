# Video

> **Status: deferred to post-submission.** Dissemination, not a thesis deliverable — not
> maintained during the thesis. Scaffolding stays ready; we resume after submission. See
> `notes/decision_log.md`.

YouTube videos about the project — planned, scripted, and published from here.
When results exist, this folder is where we turn the thesis into a few short
videos for a wider audience, without bloating git with raw footage.

> **Status:** scaffolded ahead of time. The topic is still in selection
> (see `notes/topic_scouting.md`), so the scripts
> and metadata below are stubs to fill in once we have findings.

## The slate

Three videos are planned — see [`series_plan.md`](series_plan.md) for status,
owners, and target lengths:

1. **Findings explainer** — general audience: what we found and why it matters.
2. **Methods walkthrough** — technical: how the data and analysis pipeline works.
3. **Process / behind-the-scenes** — the research journey.

## Layout

```
video/
├── series_plan.md   # the slate: videos, status, owner, length, audience
├── scripts/         # narration scripts — one .md per video (committed)
├── storyboards/     # shot lists / figure-to-shot mapping (committed)
├── assets/          # brand kit: logo, lower-thirds, thumbnails, music (licensed only)
├── recordings/      # raw screen/camera captures — NOT in git (large)
├── exports/         # final rendered videos — NOT in git (large)
└── publishing/      # per-video YouTube metadata + captions (committed)
```

## Workflow

1. Pick the next video in [`series_plan.md`](series_plan.md).
2. Write the narration in [`scripts/`](scripts/) (copy [`scripts/_template.md`](scripts/_template.md)).
3. Plan the shots in [`storyboards/`](storyboards/) — map each beat to a figure,
   slide, or screen capture.
4. Record into [`recordings/`](recordings/) (screen/camera; stays local).
5. Edit using the brand kit in [`assets/`](assets/) and export to [`exports/`](exports/).
6. Fill in the YouTube metadata + captions in [`publishing/`](publishing/).
7. Upload, then mark the video **done** in [`series_plan.md`](series_plan.md).

## Reuse what already exists

These videos should pull from the rest of the repo rather than re-create assets:

- **Slides** — `slides` (the Beamer defense deck) is the obvious
  source of explainer visuals.
- **Figures** — `results/figures` holds the generated
  plots; show these on screen instead of remaking them.
- **Citations** — credit sources on screen straight from
  `references/citation.bib`.

## File policy

Same rule as `data`: **text is committed, big binaries are not.**

- **Committed:** scripts, storyboards, planning docs, publishing metadata,
  captions (`.srt` / `.vtt`), and small licensed brand assets.
- **Git-ignored:** raw recordings in `recordings/` and renders in `exports/`,
  plus any stray `*.mp4` / `*.mov` / project files (see the `Video media` block
  in `.gitignore`). Keep footage on your machine; if we ever
  need to share it across the team, version it with **DVC** exactly like the
  datasets (see `data/README.md`).
