"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef } from "react";
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

  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-x-hidden bg-white pt-2 sm:pt-3">
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="absolute left-1/2 top-0 flex h-full w-full max-w-[1440px] -translate-x-1/2 justify-center gap-[280px] 2xl:max-w-[1600px]">
          <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
          <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
          <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
          <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
          <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1268px] flex-col items-center gap-6 px-4 py-10 text-center sm:gap-8 sm:px-6 sm:py-12 md:items-start md:gap-8 md:px-8 md:py-14 md:text-left lg:gap-[35px] lg:px-10 lg:py-[56px] xl:min-h-[551px] xl:justify-center xl:px-12 2xl:max-w-[1320px] 2xl:px-16">
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
          className={`${lato.className} group relative inline-flex h-11 w-full max-w-[184px] items-center justify-center gap-[10px] overflow-hidden rounded-[50px] border border-[#111111] px-[12px] py-[11px] text-[13px] font-semibold leading-[100%] capitalize transition-all duration-700 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,17,17,0.18)] active:translate-y-0 active:shadow-none sm:h-[46px] sm:text-[14px] lg:mx-0`}
        >
          <span
            className="absolute inset-0 -translate-x-full bg-[#111111] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
            aria-hidden
          />
          <span className="relative z-10 flex items-center gap-[10px] text-[#111111] transition-colors duration-700 group-hover:text-white">
            Discover Our Story
            <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#111111] transition-[border-color,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-transparent group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45)]">
              {/* Black dot grows from center; faint ring keeps it readable on the filled black button */}
              <span
                className="absolute inset-0 scale-0 rounded-full bg-[#111111] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
                aria-hidden
              />
              {/* Arrow emerges from inside the dot */}
              <Image
                src="/assets/arrow-discovery.svg"
                alt=""
                width={9}
                height={9}
                className="relative z-10 h-[9px] w-[9px] origin-center scale-0 opacity-0 transition-[transform,opacity,filter] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:delay-[140ms] group-hover:duration-[850ms] group-hover:brightness-0 group-hover:invert"
                aria-hidden
              />
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
