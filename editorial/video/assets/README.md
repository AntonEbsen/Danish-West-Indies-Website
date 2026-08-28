# Assets — brand kit

Reusable visual and audio assets shared across all the videos: logo, lower-thirds
/ title cards, thumbnails, intro/outro stingers, and background music. Keeping
them here makes the three videos look like one series.

## Contents

- `logo.*` — channel / project logo (add when designed).
- [`thumbnails/`](thumbnails/) — one thumbnail per video (`NN_slug.*`).
- `lower_thirds/`, `music/`, `stingers/` — create as needed.

## Licensing policy — read before adding anything

Only add media we are **allowed to use and to monetize/publish**:

- **Music & SFX:** royalty-free or properly licensed only. No copyrighted tracks
  (YouTube will claim or mute them).
- **Fonts / icons / stock:** check the license permits this use.
- **Keep the proof.** For every non-original asset, save its license/attribution
  next to it — e.g. `music/track.LICENSE.txt` — noting the source URL, license
  name, and any required on-screen credit. List required credits in the relevant
  [`../publishing/`](../publishing/) description.

This mirrors the repo's stance on data and figures: prose and figures are
CC BY 4.0 (see `LICENSE`), but **third-party media keeps its
own license** — confirm before publishing.

## Note on file size

Small static brand assets (logo, thumbnails) can be committed. Large or binary
source files (e.g. `*.psd`, raw music masters) may be git-ignored — see the
`Video media` block in `.gitignore`. Keep the *design
intent* documented here in text so the kit is reproducible.
