"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NAV_LINKS = [
  { label: "Home", href: "#" },
  {
    label: "About Us",
    href: "/about-us",
    sub: [
      "OUR PROFILE",
      "OUR STORY",
      "MISSION & VISION",
      "LEADERSHIP",
      "AWARDS & CERTIFICATIONS",
    ],
  },
  { label: "Careers", href: "#" },
  { label: "Media", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact Us", href: "/contact-us" },
];

const SOCIAL_LINKS = [
  { src: "/assets/Frame 105725.svg", alt: "Facebook", href: "#" },
  { src: "/assets/Frame 105726.svg", alt: "X", href: "#" },
  { src: "/assets/Frame 105727.svg", alt: "LinkedIn", href: "#" },
  { src: "/assets/Frame 105728.svg", alt: "Instagram", href: "#" },
  { src: "/assets/Frame 105729.svg", alt: "YouTube", href: "#" },
];

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navFooterRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setIsMounted(true);
  }, [isOpen]);

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    const footer = navFooterRef.current;
    if (!panel || !content) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.killTweensOf(panel);
      if (footer) gsap.killTweensOf(footer);
      gsap.set(panel, { width: "0%", right: 0, left: "auto" });
      gsap.set(content, { opacity: 0 });
      if (footer) {
        gsap.set(footer, {
          y: 72,
          opacity: 0,
          scale: 0.94,
          transformOrigin: "50% 100%",
        });
      }
      gsap.to(panel, {
        width: "100%",
        duration: 2.2,
        ease: "power2.inOut",
        overwrite: "auto",
      });
      gsap.to(content, {
        opacity: 1,
        duration: 0.6,
        delay: 0.8,
        ease: "power2.out",
      });
      // Bottom bar: popup from bottom (same “pop” feel as footer scroll-reveal icons)
      if (footer) {
        gsap.to(footer, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "back.out(1.45)",
          delay: 1.15,
          overwrite: "auto",
          onComplete: () => {
            gsap.set(footer, { clearProps: "transform" });
          },
        });
      }
    } else if (isMounted) {
      gsap.killTweensOf([panel, content, footer].filter(Boolean));
      if (footer) {
        gsap.to(footer, {
          y: 48,
          opacity: 0,
          scale: 0.96,
          duration: 0.28,
          ease: "power2.in",
          transformOrigin: "50% 100%",
        });
      }
      gsap.to(content, { opacity: 0, duration: 0.2 });
      gsap.to(panel, {
        width: "0%",
        duration: 1,
        ease: "power2.inOut",
        overwrite: "auto",
        onComplete: () => {
          document.body.style.overflow = "";
          setIsMounted(false);
        },
      });
    }
  }, [isOpen, isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end"
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop - click to close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        aria-label="Close menu"
      />

      {/* Panel that fills from right */}
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 h-full min-h-0 w-0 overflow-x-hidden overflow-y-hidden bg-black"
      >
        <div
          ref={contentRef}
          className="relative flex h-full max-h-[100dvh] min-h-0 w-full min-w-0 max-w-full flex-col overscroll-contain px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] text-center sm:px-6 sm:pb-4 sm:pt-4 md:px-8 md:pt-4 lg:px-10 lg:text-left xl:px-12 2xl:px-16"
        >
          {/* Top: search + close in one row — flex gap avoids overlap on narrow screens */}
          <div className="flex w-full shrink-0 items-center justify-between gap-3 pb-2 sm:gap-4">
            <div className="hidden lg:block lg:flex-1" />
            <div className="min-w-0 flex-1 max-w-[min(100%,640px)] lg:flex-none lg:w-[640px] lg:max-w-[640px]">
              <div className="flex items-center gap-2 rounded-full bg-[#D9D9D9] px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
                <input
                  type="search"
                  placeholder="Search a project name or location"
                  className="min-w-0 flex-1 bg-transparent font-lato text-[13px] text-[#1A1A1A] placeholder:text-[#666666] outline-none sm:text-[15px] md:text-base"
                />
                <span className="shrink-0 text-[#1A1A1A]" aria-hidden>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center lg:flex-1 lg:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm transition-opacity hover:opacity-80 sm:h-10 sm:w-10"
                aria-label="Close menu"
              >
                <Image
                  src="/assets/cross_menu.svg"
                  alt=""
                  width={13}
                  height={13}
                  className="h-[13px] w-[13px] object-contain"
                />
              </button>
            </div>
          </div>

          {/* Nav: scrollable links + fixed footer so Call / Follow Us never clip */}
          <nav className="mt-4 flex min-h-0 flex-1 flex-col items-center text-center sm:mt-6 lg:items-stretch lg:text-left">
            <ul className="min-h-0 w-full max-w-full flex-1 touch-pan-y overflow-y-auto overscroll-y-contain pr-0 [-webkit-overflow-scrolling:touch] sm:pr-1 space-y-5 sm:space-y-7 md:space-y-8 lg:w-auto">
              {NAV_LINKS.map((item) => (
                <li
                  key={item.label}
                  className="w-full text-center lg:w-auto lg:text-left"
                >
                  <Link
                    href={item.href}
                    scroll={item.href.startsWith("#") ? false : true}
                    onClick={() => {
                      window.setTimeout(onClose, 0);
                    }}
                    className="block font-lato text-[26px] font-medium leading-tight text-white hover:opacity-90 sm:text-[30px] md:text-[34px]"
                  >
                    {item.label}
                  </Link>
                  {"sub" in item && item.sub && (
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center text-[10px] font-medium uppercase tracking-[0.08em] text-[#9E9E9E] sm:text-[11px] lg:ml-20 lg:justify-start lg:text-left">
                      {item.sub.map((s, i) => (
                        <span key={s} className="flex items-center gap-1">
                          <Link
                            href="#"
                            onClick={onClose}
                            className="hover:text-white"
                          >
                            {s}
                          </Link>
                          {i < item.sub!.length - 1 && (
                            <span className="text-[#5C5C5C]">|</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div
              ref={navFooterRef}
              className="shrink-0 border-t border-[#2A2A2A] pt-4 pb-2 text-center sm:pt-4 lg:text-left"
            >
              <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-center lg:gap-10 xl:gap-12">
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
                  <span
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#F5AC00" }}
                  >
                    <Image
                      src="/assets/calling.png"
                      alt=""
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </span>
                  <div className="text-center lg:text-left">
                    <p className="font-lato text-xs font-medium uppercase tracking-wide text-[#B0B0B0]">
                      Call Us Now
                    </p>
                    <a
                      href="tel:01204491800"
                      className="font-lato text-xl font-semibold sm:text-2xl"
                      style={{ color: "#F5AC00" }}
                    >
                      0120-4491800
                    </a>
                  </div>
                </div>

                <div className="hidden h-10 w-px shrink-0 bg-[#3A3A3A] lg:block" />

                {/* Follow Us - same hover as footer icons */}
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-lato text-sm font-medium text-white">
                    Follow Us
                  </span>
                  <div className="flex max-w-full flex-wrap justify-center gap-3 sm:gap-3.5">
                    {SOCIAL_LINKS.map((social) => (
                      <Link
                        key={social.alt}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex transition-transform hover:scale-110"
                      >
                        <Image
                          src={social.src}
                          alt={social.alt}
                          width={35}
                          height={35}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
