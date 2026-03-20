"use client";

import Image from "next/image";
import { useRef } from "react";
import { Lato, Quattrocento } from "next/font/google";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-[radial-gradient(#ebebeb_1px,transparent_1px)] [background-size:12px_12px] py-10 sm:py-12 md:py-14 md:[background-size:16px_16px] lg:py-20 xl:py-24 2xl:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-4 sm:gap-12 sm:px-6 md:gap-14 md:px-8 lg:gap-16 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10 xl:gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:max-h-[420px] lg:aspect-auto lg:h-[450px] lg:max-h-none lg:w-[min(100%,641px)] lg:shrink-0">
            <Image
              src="/assets/creating_communities.png"
              alt="Building trust visual"
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 1024px) 100vw, 641px"
            />
          </div>

          <div className="flex h-auto w-full flex-col items-center gap-4 text-center sm:gap-[18px] lg:max-w-[507px] lg:items-start lg:justify-center lg:text-left">
            <h3
              data-scroll-reveal
              className={`${quattrocento.className} text-[22px] font-normal uppercase leading-[1.08] tracking-[0.01em] text-[#202020] sm:text-[24px] md:text-[26px]`}
            >
              Building A Legacy of Excellence

            </h3>
            <p
              data-scroll-reveal
              className={`${lato.className} text-[14px] font-normal leading-[1.5] text-[#555555] sm:text-[15px] md:text-[16px] md:leading-[1.45] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden md:[-webkit-line-clamp:3] lg:[display:block] lg:[-webkit-line-clamp:unset] lg:overflow-visible`}
            >
              Our mission is to deliver exceptional living spaces with a blend of luxury, comfort and sustainable design. Our organization builds residential and commercial properties which deliver enduring worth through innovative solutions that meet customer needs while setting new standards in the real estate industry.
            </p>
            <button
              data-scroll-reveal
              type="button"
              className={`${lato.className} mx-auto inline-flex w-fit items-center gap-2 text-[17px] font-bold uppercase leading-none text-[#3A3A3A] sm:text-[18px] md:text-[20px] lg:mx-0`}
            >
              <span className="border-b border-[#3A3A3A] pb-1">Our Mission</span>
              <span aria-hidden>›</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-10 xl:gap-12">
          <div className="flex h-auto w-full flex-col items-center gap-4 text-center sm:gap-[18px] lg:max-w-[507px] lg:items-start lg:justify-center lg:text-left">
            <h3
              data-scroll-reveal
              className={`${quattrocento.className} text-[22px] font-normal uppercase leading-[1.08] tracking-[0.01em] text-[#202020] sm:text-[24px] md:text-[26px] lg:whitespace-nowrap`}
            >
              Redefining Living, Inspiring Futures

            </h3>
            <p
              data-scroll-reveal
              className={`${lato.className} text-[14px] font-normal leading-[1.5] text-[#555555] sm:text-[15px] md:text-[16px] md:leading-[1.45] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden md:[-webkit-line-clamp:3] lg:[display:block] lg:[-webkit-line-clamp:unset] lg:overflow-visible`}
            >

              Our vision is to be a trusted leader and reliable real estate company creating sustainable communities and forward-thinking spaces for better customer lifestyles. Our goal is to expand our reach across NCR and beyond, offering high-quality residential and commercial properties that maintain their value throughout time.

            </p>
            <button
              data-scroll-reveal
              type="button"
              className={`${lato.className} mx-auto inline-flex w-fit items-center gap-2 text-[17px] font-bold uppercase leading-none text-[#3A3A3A] sm:text-[18px] md:text-[20px] lg:mx-0`}
            >
              <span className="border-b border-[#3A3A3A] pb-1">Our Vision</span>
              <span aria-hidden>›</span>
            </button>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:max-h-[420px] lg:aspect-auto lg:h-[450px] lg:max-h-none lg:w-[min(100%,641px)] lg:shrink-0">
            <Image
              src="/assets/building_trust.png"
              alt="Creating communities visual"
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 1024px) 100vw, 641px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
