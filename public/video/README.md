# Homepage video

1. Upload your video here (e.g. `hero.mp4`). MP4 (H.264), ideally under 8 MB, 10–20 seconds that loop smoothly.
2. Optional: upload a still image (e.g. `hero-poster.jpg`) shown while the video loads.
3. In `src/config/site.ts`, set `heroVideo.src` to `"/video/hero.mp4"` (and `poster` if you added one).
   The video fills the top of the homepage behind the headline.

The video plays muted and on a loop, has a pause button, and does not autoplay for
visitors who have turned on "reduce motion" in their device settings.
