"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  smoothScrollToStoryImpactSection,
  STORY_IMPACT_SECTION_ID,
} from "./aboutNavigation";

/**
 * When the home page loads with #our-story-impact (or hash changes on /),
 * scrolls to the Our Story / Our Impact section.
 */
export function ScrollToStorySectionOnHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollIfHashMatches = () => {
      if (window.location.hash !== `#${STORY_IMPACT_SECTION_ID}`) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          smoothScrollToStoryImpactSection();
        });
      });
    };

    scrollIfHashMatches();
    window.addEventListener("hashchange", scrollIfHashMatches);
    return () => window.removeEventListener("hashchange", scrollIfHashMatches);
  }, [pathname]);

  return null;
}
