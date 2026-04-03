"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
    
    style: ["normal", "italic"]
});

const quattrocento = Quattrocento({
    subsets: ["latin"],
    weight: ["400", "700"],
});

type TimelineItem = {
    year: string;
    label: string;
    title: string;
    description?: string;
    image: string;
    subtitle?: string;
    subtitle2?: string;
};

const timelineData: TimelineItem[] = [
  {
    year: "2023",
    label: "2023",
    title: "Laying the Foundation",
    subtitle: "FOREST WALK: 52 Acres | Dasna, Ghaziabad",
    subtitle2:
      "Strategic Land Acquisition: 205 Acres | Noida (Former Daewoo Motors Site) Acquired 205 acres of industrial land in Noida, formerly home to Daewoo Motors, significantly expanding our presence in the region.",
    description:
      "Secured 52 acres of prime land, setting the stage for our vision of luxury villa developments.",
    image: "/assets/footer.png",
  },
  {
    year: "2025",
    label: "2025",
    title: "Expanding Our Vision",
    subtitle:
      "ETERNIA: 6 Acres | Tech Zone-4, Greater Noida West Unveiling Eternia – a premium group housing project offering spacious 3 & 4 BHK residences, designed for luxurious living.",
    subtitle2:
      "HIGH LIFE: 2.5 Acres | Tech Zone-4, Greater Noida West Introducing Highlife – thoughtfully designed modern 1 & 2 BHK studio apartments, created for the smart, urban lifestyle.",
    image: "/assets/footer.png",
  },
  {
    year: "2026",
    label: "2026",
    title: "Strategic Expansion",
    description:
      "Acquired 74 premium flats in Jaypee Wish Town, Sector-128, Noida, through a bank auction, reinforcing our residential portfolio in one of Noida’s most iconic townships.",
    image: "/assets/footer.png",
  },
  {
    year: "",
    label: "Up Coming",
    title:
      "From Vision to Reality – A Commitment to Excellence, Shaping Iconic Landmarks for the Future.",
    image: "/assets/footer.png",
  },
];

const INITIAL_TIMELINE_YEAR = "2023";

function getInitialTimelineIndex() {
    const idx = timelineData.findIndex((item) => item.year === INITIAL_TIMELINE_YEAR);
    return idx >= 0 ? idx : 0;
}

const SUBTITLE_BOLD_PREFIXES = [
    "FOREST WALK:",
    "Strategic Land Acquisition:",
    "ETERNIA:",
    "HIGH LIFE:",
] as const;

function renderTimelineSubtitle(subtitle: string) {
    for (const prefix of SUBTITLE_BOLD_PREFIXES) {
        if (subtitle.startsWith(prefix)) {
            return (
                <>
                    <span className="font-bold text-[#111111]">{prefix}</span>
                    {subtitle.slice(prefix.length)}
                </>
            );
        }
    }
    return subtitle;
}

/** Active underline: narrower than grid column, centered on the dot */
function timelineActiveBarPercent(activeIndex: number, count: number) {
    if (count <= 0) return { left: "0%", width: "0%" };
    const colPct = 100 / count;
    const widthPct = colPct * 0.48;
    const leftPct = (activeIndex + 0.5) * colPct - widthPct / 2;
    return { left: `${leftPct}%`, width: `${widthPct}%` };
}

export function OurJourney() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineScrollRef = useRef<HTMLDivElement>(null);
    const timelineNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const skipTimelineScroll = useRef(true);
    const [activeIndex, setActiveIndex] = useState(getInitialTimelineIndex);

    useScrollReveal(sectionRef);

    useEffect(() => {
        if (skipTimelineScroll.current) {
            skipTimelineScroll.current = false;
            return;
        }
        const scroller = timelineScrollRef.current;
        const node = timelineNodeRefs.current[activeIndex];
        if (!scroller || !node) return;
        if (scroller.scrollWidth <= scroller.clientWidth) return;

        const scrollerRect = scroller.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        const delta =
            nodeRect.left + nodeRect.width / 2 - (scrollerRect.left + scrollerRect.width / 2);
        scroller.scrollBy({ left: delta, behavior: "smooth" });
    }, [activeIndex]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
    };

    return (
        <section ref={sectionRef} className="relative w-full min-w-0 overflow-x-hidden pt-8 md:pt-12 lg:pt-24 pb-20 lg:py-18 bg-[#FAFAFA]">
            {/* Background vertical line grid */}
            <div className="absolute inset-0 -z-10 pointer-events-none hidden xl:block">
                <div className="absolute left-1/2 top-0 h-full w-full max-w-[1500px] -translate-x-1/2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                    <div className="flex h-full w-full justify-evenly">
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex flex-col items-center">

                {/* Header Text */}
                <div data-scroll-reveal className="text-center mb-12 md:mb-20 w-full flex flex-col items-center">
                    <p className={`${lato.className} text-[#4A4A4A] text-[15px] font-medium sm:text-[16px] mb-3 md:mb-5`}>
                        Our Journey
                    </p>
                    <h2 className={`${quattrocento.className} text-[26px] leading-[1.2] text-[#111111] uppercase sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[42px] mb-4 md:mb-5`}>
                        A LEGACY CRAFTED OVER 17 YEARS
                    </h2>
                    <p className={`${lato.className} text-[#666666] text-[15px] md:text-[16px] leading-[1.6] max-w-[800px]`}>
                        From a healthcare vision to a Delhi NCR real estate force, here's how Sanskar Realty came to be.
                    </p>
                </div>

                {/* Timeline Dots — horizontal scroll on small screens so labels do not collide */}
                <div data-scroll-reveal className="relative mx-auto mb-16 w-full max-w-[1200px] md:mb-24">
                    <div
                        ref={timelineScrollRef}
                        className="-mx-4 scroll-smooth overflow-x-auto overflow-y-visible px-1.5 pb-1.5 sm:-mx-0 sm:px-0 sm:pb-2 md:overflow-visible md:px-[5%] lg:px-8 [scrollbar-width:thin]"
                    >
                    <div className="relative w-full min-w-[460px] sm:min-w-[540px] md:min-w-0">
                        {/* The background Track */}
                        <div className="absolute left-0 right-0 bottom-[6px] h-[2px] bg-[#E5E5E5] -z-10 sm:bottom-[7px] md:bottom-[8px]" />

                        {/* Active segment — single bar animates left/width for smooth motion */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute bottom-[6px] z-[0] h-[2px] bg-[#111111] transition-[left,width] duration-500 ease-out sm:bottom-[7px] md:bottom-[8px]"
                            style={timelineActiveBarPercent(activeIndex, timelineData.length)}
                        />
                        <div
                            className="relative z-10 grid w-full place-items-end justify-items-center gap-x-0 px-0 sm:gap-x-px sm:px-0 md:gap-x-4 md:px-0 lg:gap-x-5 xl:gap-x-6"
                            style={{
                                gridTemplateColumns: `repeat(${timelineData.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {timelineData.map((item, idx) => (
                                <div 
                                    key={item.year} 
                                    ref={(el) => {
                                        timelineNodeRefs.current[idx] = el;
                                    }}
                                    className="group relative flex min-w-0 w-full cursor-pointer flex-col items-center px-0 sm:px-0.5"
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <div
                                        className={`mb-1 inline-flex max-w-full min-h-7 min-w-[3.75rem] shrink-0 items-center justify-center rounded-none border bg-[#FAFAFA] px-2 py-0.5 transition-colors duration-300 ease-out sm:mb-3 sm:min-h-9 sm:min-w-[5.25rem] sm:px-4 sm:py-1 md:mb-5 md:min-w-[6.75rem] md:px-6 md:py-1 ${
                                            idx === activeIndex
                                                ? "border-[#111111] text-[#111111]"
                                                : "border-[#CCCCCC] text-[#666666]"
                                        } `}
                                    >
                                        <span
                                            className={`${lato.className} whitespace-nowrap text-center text-[13px] font-medium leading-tight tracking-normal sm:text-[15px] md:text-[16px]`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    <div
                                        className={`h-3 w-3 shrink-0 rounded-full transition-colors duration-500 ease-out sm:h-[14px] sm:w-[14px] md:h-4 md:w-4 ${idx === activeIndex ? "bg-[#111111]" : "bg-[#E5E5E5]"}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>

                {/* Slider: mobile = content then arrows bottom row; lg+ = absolute side arrows */}
                <div
                    data-scroll-reveal
                    className="relative mx-auto flex w-full max-w-[1100px] flex-col items-center lg:flex-row lg:items-center lg:justify-center"
                >
                    {/* Active Slide Wrapper */}
                    <div
                        className="order-1 flex min-w-0 w-full max-w-full flex-1 flex-col items-center gap-8 overflow-hidden px-1 transition-opacity duration-500 ease-out sm:gap-10 sm:px-2 md:gap-12 md:px-4 lg:order-2 lg:flex-row lg:items-center lg:gap-16 lg:px-12 xl:gap-20 xl:px-16 2xl:px-8"
                        key={activeIndex}
                    >
                        {/* Left side Image */}
          
                            {/* Force an aspect ratio for the image container */}
                            <div className="relative aspect-[408/341] w-full max-w-[408px] shrink-0 overflow-hidden bg-gray-100 lg:aspect-[1.1] lg:max-w-none lg:w-[408px] lg:h-[341px] lg:flex-none">
                                <Image 
                                    src={timelineData[activeIndex].image}
                                    alt={`Timeline ${timelineData[activeIndex].year}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                   

                        {/* Right side Text */}
                        <div className="flex w-full min-w-0 flex-col justify-center pt-0 text-center lg:w-1/2 lg:text-left">
                            <h3 className={`${quattrocento.className} mb-3 text-[32px] font-normal leading-[100%] tracking-[0] text-[#111111] sm:mb-4 sm:text-[40px] md:mb-2 md:text-[48px] lg:text-[56px]`}>
                                {timelineData[activeIndex].year}
                            </h3>
                            <h4 className={`${quattrocento.className} mb-4 text-[18px] leading-[1.3] text-[#111111] sm:mb-5 sm:text-[20px] md:mb-3 md:text-[26px] lg:text-[28px]`}>
                                {timelineData[activeIndex].title}
                            </h4>
                            {timelineData[activeIndex].subtitle ? (
                                <p
                                    className={`${lato.className} mx-auto mb-2 max-w-[500px] text-center text-[15px] font-normal leading-[26px] tracking-[0] text-[#666666] sm:mb-5 sm:text-[16px] sm:leading-[29px] md:mb-1 lg:mx-0 lg:text-left`}
                                >
                                    {renderTimelineSubtitle(timelineData[activeIndex].subtitle!)}
                                </p>
                            ) : null}
                            {timelineData[activeIndex].subtitle2 ? (
                                <p
                                    className={`${lato.className} mx-auto mb-4 max-w-[500px] text-center text-[15px] font-normal leading-[26px] tracking-[0] text-[#666666] sm:mb-5 sm:text-[16px] sm:leading-[29px] md:mb-3 lg:mx-0 lg:text-left`}
                                >
                                    {renderTimelineSubtitle(timelineData[activeIndex].subtitle2!)}
                                </p>
                            ) : null}
                            {timelineData[activeIndex].description ? (
                                <p className={`${lato.className} mx-auto max-w-[500px] text-[15px] font-normal leading-[26px] tracking-[0] text-[#666666] align-middle sm:text-[16px] sm:leading-[29px] lg:mx-0`}>
                                    {timelineData[activeIndex].description}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="order-2 mt-2 flex flex-row items-center justify-center gap-2 sm:mt-3 sm:gap-3 md:mt-4 md:gap-4 lg:contents">
                        <button
                            onClick={handlePrev}
                            type="button"
                            aria-label="Previous timeline slide"
                            className="relative z-20 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#CCCCCC] bg-[#FAFAFA] shadow-sm transition-colors hover:bg-gray-100 active:scale-[0.97] sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] lg:order-1 lg:absolute lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2 lg:shadow-none lg:-left-10 xl:-left-16 2xl:-left-24"
                        >
                            <i
                                className="ri-arrow-left-line text-[20px] leading-none text-[#111111] sm:text-[22px] lg:text-2xl"
                                aria-hidden
                            />
                        </button>

                        <button
                            onClick={handleNext}
                            type="button"
                            aria-label="Next timeline slide"
                            className="relative z-20 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#CCCCCC] bg-[#FAFAFA] shadow-sm transition-colors hover:bg-gray-100 active:scale-[0.97] sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] lg:order-3 lg:absolute lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2 lg:shadow-none lg:-right-10 xl:-right-16 2xl:-right-24"
                        >
                            <i
                                className="ri-arrow-right-line text-[20px] leading-none text-[#111111] sm:text-[22px] lg:text-2xl"
                                aria-hidden
                            />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
