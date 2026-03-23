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

type LocationImage = {
  id: string;
  image: string;
  /** Bold label (black) */
  title: string;
  /** Normal body after em dash (black) */
  description: string;
  width: number;
  height: number;
};

const leftColumn: LocationImage[] = [
  {
    id: "metro",
    image: "/assets/Rectangle 45088.png",
    title: "Metro",
    description:
      "Aqua Line & proposed metro extension within 8–10 mins",
    width: 522,
    height: 365,
  },
  {
    id: "highways",
    image: "/assets/Rectangle 45210 (1).png",
    title: "Highways",
    description: "NH-24, Noida Expressway & FNG all within easy reach",
    width: 451,
    height: 379,
  },
];

const rightColumn: LocationImage[] = [
  {
    id: "amenities",
    image: "/assets/Rectangle 45210.png",
    title: "Schools, Hospitals & Malls",
    description:
      "Yatharth Hospital (1.2 km), top schools nearby & Gaur City Mall (8 km)",
    width: 451,
    height: 536,
  },
  {
    id: "lifestyle",
    image: "/assets/Rectangle 45210 (2).png",
    title: "Dining & Entertainment",
    description:
      "Gaur City Mall, Barbeque Nation, Punjab Grill & D-Mart within 15 mins",
    width: 576,
    height: 576,
  },
];

export function LocationAdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.08, duration: 0.6 });

  return (
    <section
      id="location-advantage"
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24"
      style={{
        background:
          "radial-gradient(150% 150% at 0% 0%, #FEFCF8 0%, #F5F5F5 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute right-[-100px] top-[-160px] z-0 h-[720px] w-[720px] rounded-[720px] opacity-80"
        style={{
          background: "#FFF9E4",
          filter: "blur(400px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1320px] xl:px-12 2xl:px-16">
        <div className="mx-auto mb-8 max-w-[920px] text-center sm:mb-10 md:mb-12 lg:mb-14">
          <h2
            data-scroll-reveal
            className={`${quattrocento.className} text-[24px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#1A1A1A] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[38px]`}
          >
            Location Advantage
          </h2>
          <p
            data-scroll-reveal
            className={`${lato.className} mx-auto mt-3 max-w-[780px] px-1 text-center text-[13px] font-normal leading-[1.65] text-[#555555] sm:mt-4 sm:text-[15px] md:mt-5 md:text-[16px] lg:px-0`}
          >
            Where lifestyle destinations, urban convenience, and seamless connectivity come together in one address.
          </p>
        </div>

        {/* md+ = tablet (iPad mini portrait) two-column; images scale with min(100%, design px) */}
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-start md:gap-x-6 md:gap-y-0 lg:gap-x-10 xl:gap-x-16">
          {/* Left column */}
          <div className="flex min-w-0 basis-0 grow flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[72px]">
            {leftColumn.map((item) => (
              <article
                key={item.id}
                className="mx-auto flex w-full max-w-full flex-col gap-3 sm:gap-4 md:mx-0 md:max-w-none md:self-start"
              >
                <div
                  data-scroll-reveal-img
                  className="relative w-full max-w-full overflow-hidden rounded-none"
                  style={{
                    maxWidth: `min(100%, ${item.width}px)`,
                    aspectRatio: `${item.width} / ${item.height}`,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title}: ${item.description}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, (max-width: 1280px) 42vw, 522px"
                    quality={85}
                  />
                </div>
                <p
                  data-scroll-reveal
                  className={`${lato.className} w-full text-left text-[13px] leading-snug text-[#111111] sm:text-[14px] md:text-[15px] lg:text-[16px]`}
                  style={{ maxWidth: `min(100%, ${item.width}px)` }}
                >
                  <span className="font-bold">{item.title}</span>
                  <span className="font-normal"> — {item.description}</span>
                </p>
              </article>
            ))}
          </div>

          {/* Right column — stagger offset scales by breakpoint (tablet vs desktop) */}
          <div className="flex min-w-0 basis-0 grow flex-col gap-8 sm:gap-10 md:gap-12 md:pt-10 lg:gap-16 lg:pt-16 xl:gap-[72px] xl:pt-24 2xl:pt-28">
            {rightColumn.map((item) => (
              <article
                key={item.id}
                className="mx-auto flex w-full max-w-full flex-col gap-3 sm:gap-4 md:mx-0 md:max-w-none md:self-start"
              >
                <div
                  data-scroll-reveal-img
                  className="relative w-full max-w-full overflow-hidden rounded-none"
                  style={{
                    maxWidth: `min(100%, ${item.width}px)`,
                    aspectRatio: `${item.width} / ${item.height}`,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title}: ${item.description}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, (max-width: 1280px) 42vw, 576px"
                    quality={85}
                  />
                </div>
                <p
                  data-scroll-reveal
                  className={`${lato.className} w-full text-left text-[13px] leading-snug text-[#111111] sm:text-[14px] md:text-[15px] lg:text-[16px]`}
                  style={{ maxWidth: `min(100%, ${item.width}px)` }}
                >
                  <span className="font-bold">{item.title}</span>
                  <span className="font-normal"> — {item.description}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
