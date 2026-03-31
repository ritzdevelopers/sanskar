"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef, useState } from "react";
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
    description: string;
    image: string;
    bullets?: string[];
};

const timelineData: TimelineItem[] = [
  {
    year:"1970 - 1990",
    label: "1970 - 1990",
    title: "The Beginning",
    description: "Diversified manufacturing roots building a strong industrial foundation.",
    image: "/assets/footer.png"
  },
  {
    year: "1994",
    label: "1994",
    title: "GVF Established",
    description: "Strengthened financial presence with Great Value Finance.",
    image: "/assets/footer.png" 
  },
  {
    year: "2008",
    label: "2008",
    title: "Great Value Realty Launched",
    description: "Entered real estate with a vision to build modern communities.",
    image: "/assets/footer.png"
  },
  {
    year: "2009 - 2013",
    label: "2009 - 2013",
    title: "Early Developments",
    description: "",
    bullets: [
      "2009: Sharanam, Noida",
      "2011: Great Value Mall, Aligarh",
      "2013: Casa Uday, New Delhi",
    ],
    image: "/assets/footer.png"
  },
  {
    year: "2015 – 2019",
    label: "2015 – 2019",
    title: "Expansion Phase",
    description: "",
    bullets: [
      "2015: Commercial Complex, Modinagar",
      "2017: Vilasa Residences, Gurgaon",
      "2018: Entry into industrial real estate",
      "2019: Anandam, Noida",
    ],
    image: "/assets/footer.png",
  },
  {
    year: "2020 – 2021",
    label: "2020 – 2021",
    title: "Modern Growth",
    description: "",
    bullets: [
      "2020: Delivered The View, Mumbai",
      "2021: Revitalized Hindon River Mill, Ghaziabad",
    ],
    image: "/assets/footer.png",
  },
  {
    year: "2025 & Beyond",
    label: "2025 & Beyond",
    title: "The Future Ahead",
    description: "",
    bullets: [
      "Eternia, Greater Noida (W) (Ongoing)",
      "High Life I & II, Greater Noida (W) (Ongoing)",
      "Code 107, Noida (Upcoming)",
      "4.5M+ sq.ft. warehousing expansion (Upcoming)",
    ],
    image: "/assets/footer.png",
  },
];

export function OurJourney() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useScrollReveal(sectionRef);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
    };

    return (
        <section ref={sectionRef} className="relative w-full min-w-0 overflow-x-hidden pt-16 md:pt-24 pb-20 lg:pb-32 bg-[#FAFAFA]">
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
                    <div className="-mx-4 overflow-x-auto overflow-y-visible px-4 pb-2 sm:-mx-0 sm:px-0 md:overflow-visible md:px-[5%] lg:px-8 [scrollbar-width:thin]">
                    <div className="relative w-full min-w-[820px] md:min-w-0">
                        {/* The background Track */}
                        <div className="absolute left-0 right-0 bottom-[7px] md:bottom-[8px] h-[2px] bg-[#E5E5E5] -z-10" />
                        
                        {/* The Active Track filling */}
                        <div 
                            className="absolute left-0 bottom-[7px] md:bottom-[8px] h-[2px] bg-[#111111] -z-10 transition-all duration-500 ease-out"
                            style={{ width: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
                        />

                        {/* Nodes — equal columns so spacing is even (flex+justify-between caused uneven gaps) */}
                        <div
                            className="relative z-10 grid w-full place-items-end justify-items-center gap-x-2 px-0.5 sm:gap-x-3 sm:px-1 md:gap-x-4 md:px-0 lg:gap-x-5 xl:gap-x-6"
                            style={{
                                gridTemplateColumns: `repeat(${timelineData.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {timelineData.map((item, idx) => (
                                <div 
                                    key={item.year} 
                                    className="group flex min-w-0 w-full cursor-pointer flex-col items-center px-0.5 sm:px-0.5"
                                    onClick={() => setActiveIndex(idx)}
                                >
                                    <div
                                        className={`mb-2 inline-flex max-w-full min-h-7 shrink-0 items-center justify-center rounded-none border bg-[#FAFAFA] px-1.5 py-0 sm:mb-3 sm:min-h-7 sm:px-2 sm:py-0 md:mb-5 md:px-2 md:py-0.5 ${
                                            idx === activeIndex
                                                ? "border-[#111111] text-[#111111]"
                                                : "border-[#CCCCCC] text-[#666666]"
                                        } `}
                                    >
                                        <span
                                            className={`${lato.className} whitespace-nowrap text-center text-[9px] font-medium leading-none tracking-normal sm:text-[10px] md:text-[10px] lg:text-[11px]`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                    <div
                                        className={`h-[14px] w-[14px] shrink-0 rounded-full transition-colors duration-500 md:h-4 md:w-4 ${idx <= activeIndex ? "bg-[#111111]" : "bg-[#E5E5E5]"}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>

                {/* Slider: mobile/tablet = flex row + side arrows; lg+ = full-width slide + absolute arrows */}
                <div
                    data-scroll-reveal
                    className="relative mx-auto flex w-full max-w-[1100px] flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4"
                >
                    <button
                        onClick={handlePrev}
                        type="button"
                        aria-label="Previous timeline slide"
                        className="relative z-20 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#CCCCCC] bg-[#FAFAFA] shadow-sm transition-colors hover:bg-gray-100 active:scale-[0.97] sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] lg:absolute lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2 lg:shadow-none lg:-left-10 xl:-left-16 2xl:-left-24"
                    >
                        <Image
                            src="/assets/left_slider.svg"
                            alt=""
                            width={24}
                            height={24}
                            className="h-5 w-5 object-contain sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6"
                            aria-hidden
                        />
                    </button>

                    {/* Active Slide Wrapper */}
                    <div
                        className="flex min-w-0 w-full max-w-full flex-1 flex-col items-center gap-8 overflow-hidden px-1 transition-opacity duration-300 sm:gap-10 sm:px-2 md:gap-12 md:px-4 lg:flex-row lg:items-start lg:gap-16 lg:px-12 xl:gap-20 xl:px-16 2xl:px-8"
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
                        <div className="flex w-full min-w-0 flex-col justify-center pt-0 text-center lg:w-1/2 lg:pt-4 lg:text-left">
                            <h3 className={`${quattrocento.className} mb-3 text-[32px] font-normal leading-[100%] tracking-[0] text-[#111111] sm:mb-4 sm:text-[40px] md:mb-6 md:text-[48px] lg:text-[56px]`}>
                                {timelineData[activeIndex].year}
                            </h3>
                            <h4 className={`${quattrocento.className} mb-4 text-[18px] leading-[1.3] text-[#111111] sm:mb-5 sm:text-[20px] md:mb-6 md:text-[26px] lg:text-[28px]`}>
                                {timelineData[activeIndex].title}
                            </h4>
                            {timelineData[activeIndex].description ? (
                                <p className={`${lato.className} mx-auto max-w-[500px] text-[15px] font-normal leading-[26px] tracking-[0] text-[#666666] align-middle sm:text-[16px] sm:leading-[29px] lg:mx-0`}>
                                    {timelineData[activeIndex].description}
                                </p>
                            ) : null}
                            {timelineData[activeIndex].bullets?.length ? (
                                <ul
                                    className={`${lato.className} mx-auto mt-0 max-w-[500px] list-disc space-y-2 pl-5 text-left text-[15px] font-normal leading-[26px] tracking-[0] text-[#666666] marker:text-[#666666] sm:text-[16px] sm:leading-[29px] lg:mx-0`}
                                >
                                    {timelineData[activeIndex].bullets!.map((line) => (
                                        <li key={line} className="pl-1">
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        type="button"
                        aria-label="Next timeline slide"
                        className="relative z-20 flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#CCCCCC] bg-[#FAFAFA] shadow-sm transition-colors hover:bg-gray-100 active:scale-[0.97] sm:h-12 sm:w-12 md:h-[52px] md:w-[52px] lg:absolute lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2 lg:shadow-none lg:-right-10 xl:-right-16 2xl:-right-24"
                    >
                        <Image
                            src="/assets/right_slider.svg"
                            alt=""
                            width={24}
                            height={24}
                            className="h-5 w-5 object-contain sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6"
                            aria-hidden
                        />
                    </button>
                </div>

            </div>
        </section>
    );
}
