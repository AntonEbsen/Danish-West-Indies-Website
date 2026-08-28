# Publishing — YouTube metadata + captions

Everything that goes *around* the video on YouTube: title, description, tags,
chapter timestamps, and captions. One file per video, numbered to match the slate
in [`../series_plan.md`](../series_plan.md). Committed as text so we can draft and
review the copy before upload.

## Contents

- [`_template.md`](_template.md) — copy this to start a new metadata file.
- [`01_findings_explainer.md`](01_findings_explainer.md)
- [`02_methods_walkthrough.md`](02_methods_walkthrough.md)
- [`03_process_diary.md`](03_process_diary.md)

## Captions

- Store captions as `NN_slug.srt` (or `.vtt`) next to the metadata file — these
  are small text files and **are** committed (whitelisted in
  `.gitignore`).
- Captions help reach and accessibility; auto-generate a draft on YouTube, then
  correct it against the [script](../scripts/).

## Checklist before upload

- [ ] Title and description filled in (description includes credits/attribution
      required by anything in [`../assets/`](../assets/)).
- [ ] Chapters/timestamps added (improves watch time).
- [ ] Captions uploaded.
- [ ] Link back to the thesis / repo in the description.
- [ ] After publishing: paste the public URL below and set the row in
      [`../series_plan.md`](../series_plan.md) to ✅.
