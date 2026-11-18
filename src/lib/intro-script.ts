/** Inline <head> script deciding whether the logo intro plays (see intro.ts). No React here: imported by the server layout. */
import { site } from "@/config/site";

export const INTRO_SEEN_KEY = "pg-intro-seen";
const MODE = site.logoIntro;
const RESPECT_RM = site.respectReducedMotion;

/** Inline <head> script. Kept as a string so it runs before React loads. */
export const INTRO_SCRIPT = `(function(){var d=document.documentElement;var on=false;try{var home=window.__pgIsHome?window.__pgIsHome():(/^\\/(nl|pt|es|de)?\\/?$/.test(location.pathname)&&(location.hash===""||location.hash==="#"));var rm=${RESPECT_RM}&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;var mode="${MODE}";if(mode==="off"){home=false}var seen=false;if(mode==="once-per-session")try{seen=!!window.sessionStorage.getItem("${INTRO_SEEN_KEY}")}catch(e){/* storage blocked (e.g. embedded preview): treat as first visit */}var framed=false;try{framed=window.self!==window.top&&window.top.location.pathname.indexOf("/admin")===0}catch(e){framed=false}on=!!(home&&!rm&&!seen&&!framed)}catch(e){on=false}window.__pgIntro=on;if(on){d.classList.add("pg-intro","pg-intro-logo")}})();`;
