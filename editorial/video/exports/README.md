# Exports — final renders (NOT in git)

Finished, rendered videos ready to upload to YouTube. Like
[`../recordings/`](../recordings/), these are **large binaries and git-ignored** —
only this README and `.gitkeep` are tracked.

## What goes here

- The final render per video: `NN_slug.mp4` (e.g. `01_findings_explainer.mp4`).
- Optionally a lower-res preview for review before upload.

## Conventions

- One canonical export per video, named to match the slate in
  [`../series_plan.md`](../series_plan.md).
- Captions ship alongside the upload but live as text in
  [`../publishing/`](../publishing/) (`.srt` / `.vtt`), not here.
- After uploading, record the public URL in the video's
  [`../publishing/`](../publishing/) metadata and flip its status to ✅ in
  [`../series_plan.md`](../series_plan.md).
