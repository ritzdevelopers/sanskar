"use client";

import { useEffect } from "react";
import { scrollAboutUsPageToTop } from "./aboutNavigation";

/** Smooth scroll to top when the about page opens from another route (uses Lenis when active). */
export function AboutUsScrollToTop() {
  useEffect(() => {
    scrollAboutUsPageToTop();
  }, []);
  return null;
}
