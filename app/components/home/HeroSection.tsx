"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavOverlay } from "../common/NavOverlay";

type HeroSectionProps = {
  startIntroAnimation?: boolean;
};

export function HeroSection({ startIntroAnimation = false }: HeroSectionProps) {
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const piecesContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const introRanRef = useRef(false);

  useLayoutEffect(() => {
    const navItems = navItemsRef.current.filter(Boolean) as HTMLDivElement[];
    const pieces = pieceRefs.current.filter(Boolean) as HTMLDivElement[];
    const pieceContainer = piecesContainerRef.current;
    const heroImage = heroImageRef.current;

    if (navItems.length && pieces.length && pieceContainer && heroImage) {
      gsap.set(navItems, { y: 80, opacity: 0 });
      gsap.set(heroImage, { autoAlpha: 0, scale: 1.05 });
      gsap.set(pieceContainer, { autoAlpha: 1 });
      pieces.forEach((el, i) => {
        gsap.set(el, { x: 260, y: Math.sin(i * 0.9) * 24, opacity: 0 });
      });
    }

    if (!startIntroAnimation || introRanRef.current) return;
    introRanRef.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        pieces,
        {
          x: 260,
          y: (index) => Math.sin(index * 0.9) * 24,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: { each: 0.08, from: "end" },
        }
      )
        .to(
          heroImage,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          pieceContainer,
          {
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "<0.15"
        )
        .to(
          navItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.75"
        );
    });

    return () => {
      ctx.revert();
    };
  }, [startIntroAnimation]);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const pieceClips = [
    "polygon(0% 0%, 12.5% 0%, 12.5% 100%, 0% 100%)",
    "polygon(12.5% 0%, 25% 0%, 25% 100%, 12.5% 100%)",
    "polygon(25% 0%, 37.5% 0%, 37.5% 100%, 25% 100%)",
    "polygon(37.5% 0%, 50% 0%, 50% 100%, 37.5% 100%)",
    "polygon(50% 0%, 62.5% 0%, 62.5% 100%, 50% 100%)",
    "polygon(62.5% 0%, 75% 0%, 75% 100%, 62.5% 100%)",
    "polygon(75% 0%, 87.5% 0%, 87.5% 100%, 75% 100%)",
    "polygon(87.5% 0%, 100% 0%, 100% 100%, 87.5% 100%)",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div ref={heroImageRef} className="absolute inset-0 opacity-0">
        <Image
          src="/assets/banner (1).png"
          alt="Sanskar Realty hero"
          fill
          priority
          fetchPriority="high"
          quality={60}
          className="object-cover"
        />
      </div>

      <div ref={piecesContainerRef} className="pointer-events-none absolute inset-0 z-[1]">
        {pieceClips.map((clip, index) => (
          <div
            key={clip}
            ref={(el) => {
              pieceRefs.current[index] = el;
            }}
            className="absolute inset-0"
            style={{
              clipPath: clip,
            }}
          >
            <Image
              src="/assets/banner (1).png"
              alt=""
              fill
              priority
              quality={60}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`w-full px-4 pt-[max(14px,env(safe-area-inset-top))] pb-3 transition-all duration-300 sm:px-6 sm:pt-4 sm:pb-3.5 md:px-8 md:pt-5 md:pb-4 lg:px-10 lg:pt-5 lg:pb-4 xl:px-12 2xl:px-16 ${isScrolled ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "bg-transparent"
            }`}
        >
          <nav className="mx-auto flex min-h-[48px] w-full max-w-[1200px] items-center justify-between gap-3 sm:min-h-[52px] md:min-h-[56px] xl:max-w-[1280px] 2xl:max-w-[1360px]">
            <div
              ref={(el) => {
                navItemsRef.current[0] = el;
              }}
              className="flex min-w-0 shrink cursor-pointer items-center py-0.5"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Image
                src="/assets/sanskar_logo.png"
                alt="Sanskar Realty logo"
                width={153}
                height={50}
                priority
                quality={100}
                className={`h-9 w-auto max-w-[120px] object-contain transition duration-300 sm:h-10 sm:max-w-[140px] md:h-11 md:max-w-[153px] lg:h-[50px] ${isScrolled ? "brightness-0" : ""
                  }`}
              />
            </div>
            <div className="flex shrink-0 items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
              <div
                ref={(el) => {
                  navItemsRef.current[1] = el;
                }}
                className="hidden md:block"
              >
                <button
                  type="button"
                  onClick={() => document.getElementById('why-invest')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group relative text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] cursor-pointer ${isScrolled ? "text-black" : "text-white"
                    }`}
                >
                  Our Story
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#F5AC00] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
              <div
                ref={(el) => {
                  navItemsRef.current[2] = el;
                }}
                className="hidden md:block"
              >
                <button
                  type="button"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`group relative text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] cursor-pointer ${isScrolled ? "text-black" : "text-white"
                    }`}
                >
                  Projects
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#F5AC00] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
              <div
                ref={(el) => {
                  navItemsRef.current[3] = el;
                }}
              >
                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={() => setMenuOpen(true)}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  <Image
                    src="/assets/hamburger_menu.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={`transition duration-300 ${isScrolled ? "brightness-0" : ""
                      }`}
                  />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}
