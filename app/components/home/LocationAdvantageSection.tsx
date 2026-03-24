"use client";

import Image from "next/image";
import { useRef } from "react";
import { Lato, Quattrocento } from "next/font/google";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const quattrocento = Quattrocento({ subsets: ["latin"], weight: ["400", "700"] });

type LocationItem = {
  id: string;
  image: string;

  title: string;

  detail: string;

  w: number;

  h: number;
};

const leftColumn: LocationItem[] = [
  {
    id: "metro",
    image: "/assets/Rectangle 45088.png",
    title: "Metro",
    detail: "Aqua Line & proposed metro extension within 8–10 mins",
    w: 522,
    h: 365,
  },
  {
    id: "highways",
    image: "/assets/Rectangle 45210 (1).png",
    title: "Highways",
    detail: "NH-24, Noida Expressway & FNG all within easy reach",
    w: 451,
    h: 379,
  },
];

const rightColumn: LocationItem[] = [
  {
    id: "amenities",
    image: "/assets/Rectangle 45210.png",
    title: "Schools, Hospitals & Malls",
    detail: "Yatharth Hospital (1.2 km), top schools nearby & Gaur City Mall (8 km)",
    w: 451,
    h: 536,
  },
  {
    id: "lifestyle",
    image: "/assets/Rectangle 45210 (2).png",
    title: "Dining & Entertainment",
    detail: "Gaur City Mall, Barbeque Nation, Punjab Grill & D-Mart within 15 mins",
    w: 576,
    h: 576,
  },
];

function LocationCard({ item, sizes }: { item: LocationItem; sizes: string }) {
  return (
    <article className="flex flex-col gap-3 sm:gap-4">
      {/* Image */}
      <div
        data-scroll-reveal-img
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `${item.w} / ${item.h}` }}
      >
        <Image
          src={item.image}
          alt={`${item.title} — ${item.detail}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          sizes={sizes}
          quality={90}
        />
      </div>

      {/* Caption */}
      <p
        data-scroll-reveal
        className={`${lato.className} text-left text-[13px] leading-[1.6] text-[#1A1A1A] sm:text-[14px] md:text-[15px] lg:text-[16px]`}
      >
        <span className="font-bold">{item.title} — </span>
        <span className="font-normal">{item.detail}</span>
      </p>
    </article>
  );
}

export function LocationAdvantageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.08, duration: 0.6 });

  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 500px";

  return (
    <section
      id="location-advantage"
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24"
      style={{
        background:
          "radial-gradient(120% 100% at 0% 0%, #FEFCF8 0%, #F5F5F5 100%)",
      }}
    >
      {/* Soft glow */}
      <div
        className="pointer-events-none absolute right-[-100px] top-[-160px] z-0 h-[720px] w-[720px] rounded-full opacity-70"
        style={{ background: "#FFF9E4", filter: "blur(400px)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1320px] xl:px-12 2xl:px-16">

        {/* ── Heading ── */}
        <div className="mx-auto mb-10 max-w-[920px] text-center sm:mb-12 md:mb-14 lg:mb-16">
          <h2
            data-scroll-reveal
            className={`${quattrocento.className} text-[24px] font-bold uppercase leading-[1.2] tracking-[0.02em] text-[#1A1A1A] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[38px]`}
          >
            Location Advantage
          </h2>
          <p
            data-scroll-reveal
            className={`${lato.className} mx-auto mt-3 max-w-[780px] px-1 text-center text-[13px] font-normal leading-[1.65] text-[#555555] sm:mt-4 sm:text-[15px] md:mt-5 md:text-[16px] lg:px-0`}
          >
            Where lifestyle destinations, urban convenience, and seamless
            connectivity come together in one address.
          </p>
        </div>

        {/* ── Two-column masonry grid ── */}
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row md:items-start md:gap-x-6 lg:gap-x-10 xl:gap-x-14">

          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
            {leftColumn.map((item) => (
              <LocationCard key={item.id} item={item} sizes={sizes} />
            ))}
          </div>

          {/* Right column — staggered down so images read as a masonry offset */}
          <div className="flex min-w-0 flex-1 flex-col gap-8 sm:gap-10 md:gap-12 md:pt-16 lg:gap-14 lg:pt-20 xl:gap-16 xl:pt-24 2xl:pt-28">
            {rightColumn.map((item) => (
              <LocationCard key={item.id} item={item} sizes={sizes} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
