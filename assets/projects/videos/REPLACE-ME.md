# Portfolio Videos — Drop Your Real Reels Here

The site expects **five .mp4 files** in this folder:

```
PR1.mp4
PR2.mp4
PR3.mp4
PR4.mp4
PR5.mp4
```

## How to replace

1. Rename your videos to `PR1.mp4` → `PR5.mp4` (in the order you want them shown left→right)
2. Drag & drop them into this folder (`assets/projects/videos/`)
3. Commit + push to GitHub — the "Motion showreel" row picks them up automatically on next load

## Recommendations

- **Format:** `.mp4` (H.264 / AAC) — best browser support
- **Aspect:** 9:16 (portrait) matches the card layout perfectly; 1:1 or 16:9 also work but will crop
- **Length:** 6–15 seconds — they loop silently on hover
- **Size:** keep each under 3 MB for fast loading. Compress with HandBrake or `ffmpeg`:
  ```bash
  ffmpeg -i input.mov -vcodec libx264 -crf 24 -preset slow -an -movflags +faststart PR1.mp4
  ```

## Behavior

- Cards show a soft gradient placeholder when a file is missing (no broken UI)
- On hover the video plays; off hover it pauses
- Audio is always muted (autoplay policy)

## Adding more or fewer than 5

Open `/index.html`, find the `<div class="portfolio__video-grid" id="videoGrid">` block, and add/remove `<div class="video-card" data-video="assets/projects/videos/PRX.mp4">…</div>` entries as needed. The grid auto-fits.
