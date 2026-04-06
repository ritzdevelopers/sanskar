import type { MouseEvent } from "react";
import {
  getLenisInstance,
  LENIS_PROGRAMMATIC_DURATION,
} from "./lenisInstance";

/** `id` on `event.jsx` (Awards & Certifications) — footer / nav. */
export const AWARDS_CERTIFICATIONS_SECTION_ID = "awards-certifications";

export const AWARDS_CERTIFICATIONS_HREF = `/media#${AWARDS_CERTIFICATIONS_SECTION_ID}`;

/** `id` on `gallery.jsx` — footer / quick links. */
export const MEDIA_GALLERY_SECTION_ID = "media-gallery";

export const MEDIA_GALLERY_HREF = `/media#${MEDIA_GALLERY_SECTION_ID}`;

const MEDIA_SECTION_LENIS_OFFSET_PX = -80;

function smoothScrollToMediaSectionById(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, {
      duration: LENIS_PROGRAMMATIC_DURATION,
      force: true,
      offset: MEDIA_SECTION_LENIS_OFFSET_PX,
    });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function smoothScrollToAwardsCertificationsSection() {
  smoothScrollToMediaSectionById(AWARDS_CERTIFICATIONS_SECTION_ID);
}

export function smoothScrollToMediaGallerySection() {
  smoothScrollToMediaSectionById(MEDIA_GALLERY_SECTION_ID);
}

export function handleAwardsCertificationsNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
) {
  if (pathname !== "/media") return;
  e.preventDefault();
  smoothScrollToAwardsCertificationsSection();
  window.history.replaceState(
    null,
    "",
    `/media#${AWARDS_CERTIFICATIONS_SECTION_ID}`,
  );
}

export function handleMediaGalleryNavClick(
  e: MouseEvent<HTMLAnchorElement>,
  pathname: string,
) {
  if (pathname !== "/media") return;
  e.preventDefault();
  smoothScrollToMediaGallerySection();
  window.history.replaceState(
    null,
    "",
    `/media#${MEDIA_GALLERY_SECTION_ID}`,
  );
}
