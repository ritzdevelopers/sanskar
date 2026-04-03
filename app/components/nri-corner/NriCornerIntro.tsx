"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Poppins, Quattrocento } from "next/font/google";
import {
  getLenisInstance,
  LENIS_PROGRAMMATIC_DURATION,
} from "../common/lenisInstance";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const SUB_NAV = [
  { label: "Legal Overview", href: "#legal-overview" },
  { label: "NRI Home Loans", href: "#nri-home-loans" },
  { label: "NRIs FAQ", href: "#nri-faq" },
  { label: "Enquire Now", href: "#nri-enquire" },
] as const;

/** Matches `scroll-mt-[50px]` on anchor sections; Lenis ignores CSS scroll-margin. */
const SECTION_SCROLL_TOP_OFFSET_PX = -50;

function scrollToSectionHash(hash: string) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, {
      duration: LENIS_PROGRAMMATIC_DURATION,
      force: true,
      offset: SECTION_SCROLL_TOP_OFFSET_PX,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Scrolls with the page; sits under fixed nav. Black band, left-aligned. */
export function NriCornerIntro() {
  const inlineNavRef = useRef<HTMLElement>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    const nav = inlineNavRef.current;
    if (!nav) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingNav(!entry.isIntersecting);
      },
      { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    scrollToSectionHash(hash);
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
    }
  };

  const linkClassFloating =
    "whitespace-nowrap text-center text-[13px] font-medium leading-snug tracking-normal text-white/95 transition-opacity hover:opacity-80 sm:text-[14px]";

  return (
    <div className="bg-[#000000]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] border-t border-white/20 xl:max-w-[1320px]">
          <div className="pb-10 pt-6 text-left sm:pb-12 sm:pt-8 md:pb-8">
            <h1
              className={`${quattrocento.className} text-[20px] font-bold leading-[28px] tracking-normal text-white`}
            >
              NRI Corner
            </h1>
            <nav
              ref={inlineNavRef}
              className={`${poppins.className} mt-4 flex flex-wrap items-center justify-start gap-x-10 gap-y-4 sm:mt-5 sm:gap-x-14 md:gap-x-16 lg:gap-x-20`}
              aria-label="NRI Corner sections"
            >
              {SUB_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="text-left text-[15px] font-medium leading-[28px] tracking-normal text-white transition-opacity hover:opacity-80"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-[90] hidden justify-center transition-opacity duration-300 ease-out md:flex ${
          showFloatingNav
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        }}
        aria-hidden={!showFloatingNav}
      >
        <div
          className={`${poppins.className} mx-3 max-w-[min(100%,calc(100vw-1.5rem))] rounded-full border border-white/20 bg-black/90 px-3 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-md sm:px-5 sm:py-3`}
        >
          <nav
            className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5 sm:gap-y-1"
            aria-label="NRI Corner section links"
          >
            {SUB_NAV.map((item) => (
              <a
                key={`float-${item.label}`}
                href={item.href}
                tabIndex={showFloatingNav ? undefined : -1}
                onClick={(e) => onNavClick(e, item.href)}
                className={linkClassFloating}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
