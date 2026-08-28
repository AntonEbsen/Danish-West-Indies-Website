# Storyboards

Shot lists and figure-to-shot mapping — the visual plan that sits between a
[script](../scripts/) and a recording. One file per video (numbered to match the
slate), committed as text. A storyboard answers, for every beat: *what is on
screen, and where does it come from?*

## What goes here

- **Shot list** — an ordered list of shots: visual, source, rough duration.
- **Figure-to-shot mapping** — which plot in
  `results/figures` or slide in
  `slides` backs each beat, so editing is "show this here".
- **Rough sketches** (optional) — if you draw frames, drop the images in and
  reference them; note that image files may be git-ignored (see
  `.gitignore`), so keep the *plan* in Markdown.

## Suggested format

```markdown
# Storyboard — <video title> (NN)

| Shot | Beat | Visual | Source | ~Duration |
|------|------|--------|--------|-----------|
| 1 | Hook   | Title card over headline plot | results/figures/xyz.png | 8s |
| 2 | Beat 1 | Talking head                  | recording               | 20s |
| 3 | Beat 2 | Animated chart                | slides/ slide 4         | 15s |
```

Keep it in lockstep with the matching script in [`../scripts/`](../scripts/) —
if a beat changes there, update the shot here.
