/**
 * Logo intro state, shared by the intro overlay and the homepage animations
 * (which wait for the intro to finish before they play).
 *
 * The decision to play is made by a tiny inline script in <head> (INTRO_SCRIPT) before
 * the page paints: only on the homepage, once per browser session, and never when the
 * visitor prefers reduced motion. It sets `window.__pgIntro` and the `pg-intro` class,
 * which covers the page in charcoal until the intro takes over (no flash of content).
 */
import { useSyncExternalStore } from "react";
import { INTRO_SEEN_KEY } from "./intro-script";

declare global {
  interface Window { __pgIntro?: boolean; __pgIsHome?: () => boolean }
}

let playing: boolean | undefined;
const subs = new Set<() => void>();
const read = () => {
  if (playing === undefined) playing = typeof window !== "undefined" && Boolean(window.__pgIntro);
  return playing;
};

/** True while the logo intro is on screen. Server render assumes "playing" so entrance animations start from their initial state. */
export function useIntroPlaying() {
  return useSyncExternalStore((f) => { subs.add(f); return () => { subs.delete(f); }; }, read, () => true);
}

export function introWillPlay() { return read(); }

/** Called when the intro starts leaving: page animations may begin. */
export function finishIntro() {
  if (playing === false) return;
  playing = false;
  try { sessionStorage.setItem(INTRO_SEEN_KEY, "1"); } catch { /* storage blocked — intro may replay, harmless */ }
  document.documentElement.classList.remove("pg-intro");
  subs.forEach((f) => f());
}

/** Called when the flying logo has landed in the header. */
export function revealHeaderLogo() {
  document.documentElement.classList.remove("pg-intro", "pg-intro-logo");
}
