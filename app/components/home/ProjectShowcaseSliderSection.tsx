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
    description: (
      <>
        Located at <strong>Noida Extension</strong>, Eternia by Sanskar Realty offers premium <strong>3BHK and 4BHK apartments</strong>. This project promises a luxurious living experience with its <strong>world-class amenities, roomy layouts, and Vastu-compliant design.</strong>
      </>
    ),
    image: "/assets/project_slider_banner.png",
  },
  {
    id: 2,
    headline: "Modern Living, Elevated Daily",
    subtext: "Premium lifestyle spaces",
    projectName: "Project Two",
    description: (
      <>
        High Life In <strong>Greater Noida West</strong>, has <strong>1 & 2 BHK studio apartments</strong> within a <strong>mixed-use development</strong>. Located along a <strong>130-meter road</strong> with <strong>100-meter green belt</strong> views, these homes come <strong>furnished with IKEA</strong>.
      </>
    ),
    image: "/assets/projects_main.png",
  },
  {
    id: 3,
    headline: "Built for Tomorrow's Urban Life",
    subtext: "Thoughtfully crafted homes",
    projectName: "Project Three",
    description: (
      <>
        The Forest Walk in <strong>Ghaziabad</strong> is an exclusive gated villa community that blends urban luxury with nature. With only <strong>97 villas</strong>, large <strong>green spaces</strong> and a <strong>forest trail</strong>, it offers easy connectivity to Delhi and Noida via <strong>NH-24</strong>.
      </>
    ),
    image: "/assets/banner%20(1).png",
  },
];

export function ProjectShowcaseSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overlay, setOverlay] = useState<{ index: number; direction: "next" | "prev" } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const displayIndex = overlay ? overlay.index : activeIndex;
  const activeSlide = showcaseSlides[displayIndex];

  const goPrev = () => {
    if (isTransitioning) return;
    const prevIndex = (activeIndex - 1 + showcaseSlides.length) % showcaseSlides.length;
    setOverlay({ index: prevIndex, direction: "prev" });
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(prevIndex);
      setOverlay(null);
      setIsTransitioning(false);
    }, 1500);
  };

  const goNext = () => {
    if (isTransitioning) return;
    const nextIndex = (activeIndex + 1) % showcaseSlides.length;
    setOverlay({ index: nextIndex, direction: "next" });
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setOverlay(null);
      setIsTransitioning(false);
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="bg-white pb-10 lg:pb-8 xl:pb-0">
      <style>{`
        :root {
          --fill-slider-duration: 1.5s;
          --fill-slider-easing: cubic-bezier(0.34, 1.35, 0.64, 1);
        }
        .fill-slider-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }
        .fill-slider-overlay--next {
          clip-path: inset(0 0 0 100%);
          animation: fillSliderFromRight var(--fill-slider-duration) var(--fill-slider-easing) forwards;
        }
        @keyframes fillSliderFromRight {
          to { clip-path: inset(0 0 0 0); }
        }
        .fill-slider-overlay--prev {
          clip-path: inset(0 100% 0 0);
          animation: fillSliderFromLeft var(--fill-slider-duration) var(--fill-slider-easing) forwards;
        }
        @keyframes fillSliderFromLeft {
          to { clip-path: inset(0 0 0 0); }
        }
      `}</style>
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-4 sm:px-6 md:px-8 lg:px-6 xl:px-0">
        <div className="flex shrink-0 items-center justify-end gap-2 py-3 sm:gap-3 sm:py-4 xl:pr-8">
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

        <div className="relative min-h-[260px] w-full flex-1 overflow-hidden sm:min-h-[340px] md:min-h-[480px] lg:min-h-0 lg:h-[min(520px,70vh)] lg:rounded-lg xl:h-[775px] xl:rounded-none xl:flex-none">
          <div className="absolute inset-0 z-0">
            <Image
              src={showcaseSlides[activeIndex].image}
              alt={showcaseSlides[activeIndex].projectName}
              fill
              className="object-cover"
              quality={100}
              priority
              sizes="(max-width: 1024px) 100vw, 1440px"
            />
          </div>

          {overlay && (
            <div className={`fill-slider-overlay fill-slider-overlay--${overlay.direction}`}>
              <Image
                src={showcaseSlides[overlay.index].image}
                alt={showcaseSlides[overlay.index].projectName}
                fill
                className="object-cover"
                quality={100}
                priority
                sizes="(max-width: 1024px) 100vw, 1440px"
              />
            </div>
          )}

          {/* lg–max-xl: headline on image (bottom, centered). xl+: left, no gradient — wide desktop overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-6 pt-16 text-center sm:px-6 sm:pb-8 sm:pt-20 md:px-8 md:pt-24 lg:inset-x-0 lg:bottom-0 lg:left-0 lg:right-0 lg:top-auto lg:translate-y-0 lg:px-8 lg:pb-8 lg:pt-12 xl:inset-x-auto xl:bottom-auto xl:left-8 xl:right-auto xl:top-[26%] xl:block xl:-translate-y-1/2 xl:bg-transparent xl:bg-none xl:px-0 xl:pb-0 xl:pt-0 xl:text-left 2xl:left-16">
            <h3
              data-scroll-reveal
              className={`${quattrocento.className} mx-auto max-w-[20ch] text-center text-[22px] font-bold leading-[1.15] text-white sm:max-w-[24ch] sm:text-[26px] md:max-w-[28ch] md:text-[30px] lg:max-w-[36ch] lg:text-[32px] xl:mx-0 xl:max-w-[min(320px,40vw)] xl:text-left xl:text-[34px] xl:leading-[100%] 2xl:max-w-[380px] 2xl:text-[36px]`}
            >
              {activeSlide.headline}
            </h3>
            <p
              data-scroll-reveal
              className={`${lato.className} mx-auto mt-2 max-w-md text-center text-[16px] font-normal leading-snug text-white/95 sm:text-[18px] md:text-[20px] lg:text-[22px] xl:mx-0 xl:max-w-[280px] xl:text-left xl:text-[24px] xl:leading-[100%]`}
            >
              {activeSlide.subtext}
            </p>
          </div>
        </div>

        {/* lg–xl: card stacks under hero with clear spacing; xl+: floats over image (desktop) */}
        <div className="relative z-20 mx-auto mt-5 flex w-full max-w-[448px] flex-col gap-3 rounded-[10px] bg-[#F4F4F4] px-5 py-6 shadow-sm sm:mt-6 sm:gap-[10px] sm:px-6 sm:py-8 lg:mt-6 lg:shadow-md xl:absolute xl:left-auto xl:right-[min(134px,8vw)] xl:top-[110px] xl:mt-0 xl:h-[613px] xl:w-[min(448px,42vw)] xl:max-w-[448px] xl:gap-[10px] xl:px-8 xl:py-[71px] xl:shadow-none">
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
            <div className="absolute inset-0 z-0">
              <Image
                src={showcaseSlides[activeIndex].image}
                alt={showcaseSlides[activeIndex].projectName}
                fill
                className="object-cover"
                quality={100}
                sizes="(max-width:1024px) 90vw, 448px"
              />
            </div>

            {overlay && (
              <div className={`fill-slider-overlay fill-slider-overlay--${overlay.direction}`}>
                <Image
                  src={showcaseSlides[overlay.index].image}
                  alt={showcaseSlides[overlay.index].projectName}
                  fill
                  className="object-cover"
                  quality={100}
                  sizes="(max-width:1024px) 90vw, 448px"
                />
              </div>
            )}
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
