"use client";

import { useEffect } from "react";
import {
  ABOUT_SANSKAR_GROUP_SECTION_ID,
  MISSION_VISION_SECTION_ID,
  scrollAboutUsPageToTop,
  smoothScrollToAboutSanskarGroupSection,
  smoothScrollToMissionVisionSection,
} from "./aboutNavigation";

function runAboutUsDeepLinkScrollFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (id === MISSION_VISION_SECTION_ID) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        smoothScrollToMissionVisionSection();
      });
    });
    return;
  }
  if (id === ABOUT_SANSKAR_GROUP_SECTION_ID) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        smoothScrollToAboutSanskarGroupSection();
      });
    });
    return;
  }
}

function isAboutUsDeepLinkHash(): boolean {
  const h = window.location.hash;
  return (
    h === `#${MISSION_VISION_SECTION_ID}` ||
    h === `#${ABOUT_SANSKAR_GROUP_SECTION_ID}`
  );
}

/** Top of page on enter, except known #section deep links. */
export function AboutUsScrollToTop() {
  useEffect(() => {
    runAboutUsDeepLinkScrollFromHash();
    window.addEventListener("hashchange", runAboutUsDeepLinkScrollFromHash);

    if (isAboutUsDeepLinkHash()) {
      return () =>
        window.removeEventListener(
          "hashchange",
          runAboutUsDeepLinkScrollFromHash,
        );
    }

    scrollAboutUsPageToTop();
    return () =>
      window.removeEventListener("hashchange", runAboutUsDeepLinkScrollFromHash);
  }, []);
  return null;
}
