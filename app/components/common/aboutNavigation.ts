import type { MouseEvent } from "react";
import {
  getLenisInstance,
  LENIS_PROGRAMMATIC_DURATION,
} from "./lenisInstance";

/** `id` on `StorySection` — deep link scroll on the home page. */
export const STORY_IMPACT_SECTION_ID = "our-story-impact";

/** `id` on About Us — Mission & Vision (footer / nav). */
export const MISSION_VISION_SECTION_ID = "mission-vision";

export const MISSION_VISION_HREF = `/about-us#${MISSION_VISION_SECTION_ID}`;

/** `id` on `AboutSanskarGroup` — Our Profile (footer / nav). */
export const ABOUT_SANSKAR_GROUP_SECTION_ID = "about-sanskar-group";

export const OUR_PROFILE_HREF = `/about-us#${ABOUT_SANSKAR_GROUP_SECTION_ID}`;

/** Lenis ignores CSS scroll-margin; keep section clear of fixed header. */
const ABOUT_PAGE_SECTION_LENIS_OFFSET_PX = -80;

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

export function smoothScrollToMissionVisionSection() {
  const el = document.getElementById(MISSION_VISION_SECTION_ID);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, {
      duration: LENIS_PROGRAMMATIC_DURATION,
      force: true,
      offset: ABOUT_PAGE_SECTION_LENIS_OFFSET_PX,
    });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function smoothScrollToAboutSanskarGroupSection() {
  const el = document.getElementById(ABOUT_SANSKAR_GROUP_SECTION_ID);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, {
      duration: LENIS_PROGRAMMATIC_DURATION,
      force: true,
      offset: ABOUT_PAGE_SECTION_LENIS_OFFSET_PX,
    });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function handleMissionVisionNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
) {
  if (pathname !== "/about-us") return;
  e.preventDefault();
  smoothScrollToMissionVisionSection();
  window.history.replaceState(
    null,
    "",
    `/about-us#${MISSION_VISION_SECTION_ID}`,
  );
}

export function handleOurProfileNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
) {
  if (pathname !== "/about-us") return;
  e.preventDefault();
  smoothScrollToAboutSanskarGroupSection();
  window.history.replaceState(
    null,
    "",
    `/about-us#${ABOUT_SANSKAR_GROUP_SECTION_ID}`,
  );
}

