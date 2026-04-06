"use client";

import { useEffect } from "react";
import {
  AWARDS_CERTIFICATIONS_SECTION_ID,
  MEDIA_GALLERY_SECTION_ID,
  smoothScrollToAwardsCertificationsSection,
  smoothScrollToMediaGallerySection,
} from "./mediaNavigation";

function scrollMediaPageFromHash() {
  const hash = window.location.hash;
  const run = () => {
    if (hash === `#${AWARDS_CERTIFICATIONS_SECTION_ID}`) {
      smoothScrollToAwardsCertificationsSection();
    } else if (hash === `#${MEDIA_GALLERY_SECTION_ID}`) {
      smoothScrollToMediaGallerySection();
    }
  };
  if (
    hash !== `#${AWARDS_CERTIFICATIONS_SECTION_ID}` &&
    hash !== `#${MEDIA_GALLERY_SECTION_ID}`
  ) {
    return;
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

/** Deep links on /media: #awards-certifications, #media-gallery */
export function MediaHashScroll() {
  useEffect(() => {
    scrollMediaPageFromHash();
    window.addEventListener("hashchange", scrollMediaPageFromHash);
    return () =>
      window.removeEventListener("hashchange", scrollMediaPageFromHash);
  }, []);
  return null;
}
