import type { MouseEvent } from "react";
import {
  getLenisInstance,
  LENIS_PROGRAMMATIC_DURATION,
} from "./lenisInstance";

/** `id` on `StorySection` — Mission & Vision links scroll here on the home page. */
export const STORY_IMPACT_SECTION_ID = "our-story-impact";

export const MISSION_VISION_HREF = `/#${STORY_IMPACT_SECTION_ID}`;

function smoothScrollToTop() {
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(0, { duration: LENIS_PROGRAMMATIC_DURATION, force: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollAboutUsToTopIfSamePage() {
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/about-us") {
    smoothScrollToTop();
  }
}

/** Used when the about page mounts (Lenis-aware). */
export function scrollAboutUsPageToTop() {
  smoothScrollToTop();
}

export function smoothScrollToStoryImpactSection() {
  const el = document.getElementById(STORY_IMPACT_SECTION_ID);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, {
      duration: LENIS_PROGRAMMATIC_DURATION,
      force: true,
    });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function handleMissionVisionNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
) {
  if (pathname !== "/") return;
  e.preventDefault();
  smoothScrollToStoryImpactSection();
  window.history.replaceState(null, "", `/#${STORY_IMPACT_SECTION_ID}`);
}
