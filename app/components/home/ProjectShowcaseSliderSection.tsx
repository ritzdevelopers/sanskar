"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";
import { Lato, Quattrocento } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const showcaseSlides = [
  {
    id: 1,
    headline: "Towering at a Trailblazing Pace",
    subtext: "Construction in full swing",
    projectName: "Project One",
    description:
      "Located at Noida Extension, Eternia by Sanskar Realty offers premium 3BHK and 4BHK apartments. This project promises a luxurious living experience with its contemporary amenities, roomy layouts, and Vastu-compliant design.",
    image: "/assets/project_slider_banner.png",
  },
  {
    id: 2,
    headline: "Modern Living, Elevated Daily",
    subtext: "Premium lifestyle spaces",
    projectName: "Project Two",
    description:
      "In Greater Noida West, High Life offers 1 & 2 BHK studio apartments . High Life 1 is set in a G+26-story tower, while High Life 2 in a G+18-story tower. Both projects are ideally situated along a 130-meter road, views of a 100-meter green belt and come furnished with IKEA. Enjoy quick access to commercial districts, retail establishments, and entertainment venues.",
    image: "/assets/project_slider_banner.png",
  },
  {
    id: 3,
    headline: "Built for Tomorrow's Urban Life",
    subtext: "Thoughtfully crafted homes",
    projectName: "Project Three",
    description:
      "Ghaziabad's exclusive gated villa community, The Forest Walk, combines urban luxury with a natural lifestyle. With only 97 villas, residents enjoy large green spaces to a forest trail right outside. It is an ideal combination of seclusion and connectivity and is conveniently accessible from Delhi and Noida thanks to its location on NH-24.",
    image: "/assets/project_slider_banner.png",
  },
];

export function ProjectShowcaseSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const activeSlide = showcaseSlides[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseSlides.length);
  };

  return (
    <section ref={sectionRef} className="bg-white pb-10 lg:h-[775px] lg:pb-0">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-6 md:px-8 lg:h-full lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex shrink-0 items-center justify-end gap-2 py-3 sm:gap-3 sm:py-4">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E2E2E2] bg-[#EDEDED] sm:h-[52px] sm:w-[52px]"
          >
            <Image src="/assets/left_arrow.svg" alt="" width={13} height={21} className="scale-90 sm:scale-100" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E2E2E2] bg-[#EDEDED] sm:h-[52px] sm:w-[52px]"
          >
            <Image src="/assets/right_arrow.svg" alt="" width={13} height={21} className="scale-90 sm:scale-100" />
          </button>
        </div>

        <div className="relative min-h-[260px] w-full flex-1 overflow-hidden sm:min-h-[340px] md:min-h-[420px] lg:min-h-0 lg:h-[691px] lg:flex-none">
          {showcaseSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={slide.image}
                alt={slide.projectName}
                fill
                className="object-cover"
                quality={100}
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 1440px"
              />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-5 pt-20 sm:px-6 sm:pb-6 sm:pt-24 md:pt-28 lg:inset-x-auto lg:bottom-auto lg:left-6 lg:right-auto lg:top-[26%] lg:block lg:-translate-y-1/2 lg:bg-transparent lg:bg-none lg:px-0 lg:pb-0 lg:pt-0 xl:left-10 2xl:left-16">
            <h3
              data-scroll-reveal
              className={`${quattrocento.className} text-center text-[22px] font-bold leading-[1.15] text-white sm:text-[26px] md:text-[30px] lg:text-left lg:text-[34px] lg:leading-[100%] xl:text-[36px]`}
            >
              {activeSlide.headline}
            </h3>
            <p
              data-scroll-reveal
              className={`${lato.className} mt-2 text-center text-[16px] font-normal leading-snug text-white/95 sm:text-[18px] md:text-[20px] lg:text-left lg:text-[24px] lg:leading-[100%]`}
            >
              {activeSlide.subtext}
            </p>
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-4 flex w-full max-w-[448px] flex-col gap-3 rounded-[10px] bg-[#F4F4F4] px-5 py-6 sm:mt-5 sm:gap-[10px] sm:px-6 sm:py-8 lg:absolute lg:left-auto lg:right-6 lg:top-[81px] lg:mt-0 lg:h-auto lg:min-h-[560px] lg:w-[min(calc(100%-3rem),448px)] lg:px-8 lg:py-12 xl:right-10 xl:min-h-[613px] xl:py-[71px] 2xl:right-12">
          <p
            data-scroll-reveal
            className={`${lato.className} text-center text-[16px] font-normal leading-none text-[#2F2F2F] sm:text-[17px] md:text-[18px]`}
          >
            {String(activeIndex + 1).padStart(2, "0")} - {String(showcaseSlides.length).padStart(2, "0")}
          </p>
          <h4
            data-scroll-reveal
            className={`${quattrocento.className} text-center text-[20px] font-normal uppercase leading-[1.1] text-[#1A1A1A] sm:text-[22px] md:text-[24px]`}
          >
            {activeSlide.projectName}
          </h4>

          <div className="relative aspect-[16/10] w-full overflow-hidden sm:max-h-[240px] sm:aspect-auto sm:h-[200px] md:max-h-none">
            <Image
              src={activeSlide.image}
              alt={activeSlide.projectName}
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width:1024px) 90vw, 448px"
            />
          </div>

          <p
            data-scroll-reveal
            className={`${lato.className} text-center text-[14px] leading-[1.5] text-[#555555] sm:text-[15px] md:text-[16px]`}
          >
            {activeSlide.description}
          </p>

          <button
            data-scroll-reveal
            type="button"
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#8C8C8C] sm:h-[52px] sm:w-[52px]"
            aria-label="Open project"
          >
            <Image src="/assets/diagonal_arrow.png" alt="" width={20} height={20} className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
