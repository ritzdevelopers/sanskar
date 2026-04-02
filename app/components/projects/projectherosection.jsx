"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavOverlay } from "../common/NavOverlay";
import { scrollAboutUsToTopIfSamePage } from "../common/aboutNavigation";

export function ProjectHeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <Image
          src="/assets/project-banner.png"
          alt="Sanskar Realty residential projects"
          width={1440}
          height={583}
          priority
          fetchPriority="high"
          quality={60}
          className="h-auto w-full"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-4">
          <div className="flex max-w-[900px] flex-col items-center text-center">
            <p className="font-lato text-[16px] font-semibold leading-[28px] tracking-normal text-white">
              Your Next Move Starts Here
            </p>
            <h1 className="font-quattrocento mt-3 text-[36px] font-normal uppercase leading-[100%] tracking-normal text-white sm:mt-4">
              Featured Properties
            </h1>
          </div>
        </div>
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto w-full">
          <div
            className={`w-full px-4 transition-all duration-300 ease-out sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ${
              isScrolled
                ? "pt-[max(8px,env(safe-area-inset-top))] pb-2 sm:pt-2.5 sm:pb-2 md:pt-3 md:pb-2.5 lg:pt-3 lg:pb-2.5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                : "pt-[max(14px,env(safe-area-inset-top))] pb-3 sm:pt-4 sm:pb-3.5 md:pt-5 md:pb-4 lg:pt-5 lg:pb-4 bg-transparent"
            }`}
          >
            <nav
              className={`mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 transition-all duration-300 ease-out xl:max-w-[1320px] ${
                isScrolled
                  ? "min-h-[40px] sm:min-h-[42px] md:min-h-[44px]"
                  : "min-h-[48px] sm:min-h-[52px] md:min-h-[56px]"
              }`}
            >
              <Link
                href="/"
                className="flex min-w-0 shrink cursor-pointer items-center py-0.5"
              >
                <Image
                  src="/assets/sanskar_logo.png"
                  alt="Sanskar Realty logo"
                  width={153}
                  height={50}
                  priority
                  quality={100}
                  className={`w-auto object-contain transition-all duration-300 ease-out ${
                    isScrolled
                      ? "h-8 max-w-[104px] sm:h-9 sm:max-w-[122px] md:h-9 md:max-w-[132px] lg:h-[42px] lg:max-w-[136px] brightness-0"
                      : "h-9 max-w-[120px] sm:h-10 sm:max-w-[140px] md:h-11 md:max-w-[153px] lg:h-[50px]"
                  }`}
                />
              </Link>
              <div className="flex shrink-0 items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
                <div className="hidden md:block">
                  <Link
                    href="/about-us"
                    onClick={() => scrollAboutUsToTopIfSamePage()}
                    className={`group relative cursor-pointer text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                  >
                    Our Story
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#F5AC00] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <Link
                    href="/projects"
                    className={`group relative cursor-pointer text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] ${
                      isScrolled ? "text-black" : "text-white"
                    }`}
                    aria-current="page"
                  >
                    Projects
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#F5AC00]" />
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen(true)}
                    className="flex h-8 w-8 items-center justify-center"
                  >
                    <Image
                      src="/assets/hamburger_menu.svg"
                      alt=""
                      width={52}
                      height={52}
                      className={`transition duration-300 ${
                        isScrolled ? "brightness-0" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}
