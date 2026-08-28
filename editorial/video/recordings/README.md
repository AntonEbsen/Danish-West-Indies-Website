# Recordings — raw footage (NOT in git)

Raw screen captures, camera footage, voice-over takes, and b-roll go here. These
files are **large and binary, so they are git-ignored** — only this README and
`.gitkeep` are tracked, to keep the folder alive (same policy as
`data/raw`).

## What goes here

- Screen recordings of the code / pipeline running (for the methods walkthrough).
- Talking-head / voice-over takes.
- B-roll captured throughout the project (especially for the process diary —
  grab clips *as you go*, there's no re-shooting the research).

## Conventions

- Name takes so they sort and map to a video: `NN_slug__shotNN_takeNN.mp4`
  (e.g. `02_methods__shot03_take02.mp4`).
- Keep raws here untouched; do the cutting in your editor and render to
  [`../exports/`](../exports/).

## Sharing across the team

Footage stays on your machine by default. If we need to share raws across the
team, version them with **DVC** exactly like the datasets — see
`data/README.md` (`dvc add` → `dvc push`).
