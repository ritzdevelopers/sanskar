"use client";

import { Lato, Quattrocento } from "next/font/google";
import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [hoverOrigin, setHoverOrigin] = useState<{ x: number; y: number } | null>(null);

  useScrollReveal(sectionRef);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setHoverOrigin({ x, y });

      const fill = fillRef.current;
      if (fill) {
        gsap.set(fill, { left: x, top: y, scale: 0, xPercent: -50, yPercent: -50 });
        gsap.to(fill, { scale: 2.5, duration: 0.45, ease: "power2.out" });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const fill = fillRef.current;
    if (fill) {
      gsap.to(fill, { scale: 0, duration: 0.35, ease: "power2.in", onComplete: () => setHoverOrigin(null) });
    } else {
      setHoverOrigin(null);
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-x-hidden bg-white pt-2 sm:pt-3">
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="absolute left-1/2 top-0 h-[551px] w-full max-w-[1440px] -translate-x-1/2 2xl:max-w-[1600px]">
          <span className="absolute left-[429px] top-0 h-[551px] w-px bg-[#F1F1F1]" />
          <span className="absolute left-[643px] top-0 h-[551px] w-px bg-[#F1F1F1]" />
          <span className="absolute left-[857px] top-0 h-[551px] w-px bg-[#F1F1F1]" />
          <span className="absolute left-[1071px] top-0 h-[551px] w-px bg-[#F1F1F1]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1268px] flex-col items-center gap-6 px-4 py-10 text-center sm:gap-8 sm:px-6 sm:py-12 md:gap-9 md:px-8 md:py-14 lg:items-start lg:gap-[35px] lg:px-10 lg:py-[56px] lg:text-left xl:min-h-[551px] xl:justify-center xl:px-12 2xl:max-w-[1320px] 2xl:px-16">
        <p
          data-scroll-reveal
          className={`${lato.className} w-full text-sm font-normal leading-7 text-[#111111] uppercase sm:text-[15px] md:text-[16px]`}
        >
          Project Overview
        </p>

        <h2
          data-scroll-reveal
          className={`${quattrocento.className} max-w-[995px] align-middle text-[26px] font-normal leading-[1.2] text-[#111111] uppercase sm:text-[30px] sm:leading-[1.25] md:text-[34px] md:leading-[1.3] lg:text-[36px] lg:leading-[46px] xl:text-[38px]`}
        >
          Where Trust Meets Extraordinary Design

        </h2>

        <div
          data-scroll-reveal
          className={`${lato.className} max-w-[1180px] space-y-4 text-[14px] font-normal leading-[1.6] text-[#3b3b3b] sm:text-[15px] md:text-[16px] md:leading-6`}
        >
          <p>
            Sanskar Realty, a renowned name in the luxurious NCR real estate region, and comes with a pedigree that matters. As a venture of the Yatharth Group, North India’s 3rd largest public-listed healthcare company, we bring our legacy of care, honesty and community impact into every home we make.
          </p>
          <p>
            With over 17 years of real estate experience, we have been redefining premium living in Noida Extension, Greater Noida West, Ghaziabad since long. Our houses are not built, they are crafted. Each design, material, and amenity has one purpose only: to create a home that betters your life and appreciates in value with passing time.
          </p>
          <p>
            The developer provides a diverse selection of properties from spacious 3 BHK and 4 BHK luxury apartments in Noida Extension, IKEA-furnished studio apartments to exclusive gated villas.
          </p>
        </div>

        <button
          data-scroll-reveal
          type="button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${lato.className} relative inline-flex h-11 w-full max-w-[184px] items-center justify-center gap-[10px] overflow-hidden rounded-[50px] border border-[#111111] px-[12px] py-[11px] text-[13px] font-semibold leading-[100%] capitalize transition-colors duration-200 sm:h-[46px] sm:text-[14px] lg:mx-0`}
        >
          <span
            ref={fillRef}
            className="absolute inline-block h-[280px] w-[280px] rounded-full bg-[#111111] will-change-transform"
            style={{ left: 0, top: 0, transform: "translate(-50%, -50%) scale(0)" }}
            aria-hidden
          />
          <span
            className={`relative z-10 flex items-center gap-[10px] ${hoverOrigin ? "text-white" : "text-[#111111]"}`}
          >
            Discover Our Story
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[12px] leading-none ${hoverOrigin ? "border-white text-white" : "border-[#111111] text-[#111111]"}`}
            >
              ↗
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
