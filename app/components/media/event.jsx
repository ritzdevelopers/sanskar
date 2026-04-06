"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Quattrocento } from "next/font/google";
import { AWARDS_CERTIFICATIONS_SECTION_ID } from "../common/mediaNavigation";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const eventImages = [
  {
    src: "/assets/event-1image.jpg",
    alt: "Outdoor evening event with stage lighting and audience",
  },
  {
    src: "/assets/event-2image.jpg",
    alt: "Indoor exhibition hall with colorful balloon display",
  },
  {
    src: "/assets/gallery-2.jpg",
    alt: "Family on a balcony overlooking greenery",
  },
  {
    src: "/assets/gallery-1.jpg",
    alt: "Modern interior with sculptural pendant lighting",
  },
  {
    src: "/assets/building.jpg",
    alt: "Sanskar residential towers and landscaped surroundings",
  },
  {
    src: "/assets/building_trust.png",
    alt: "Family at playground with modern apartment buildings",
  },
];

const AUTO_SLIDE_MS = 5000;

export default function OurEvents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = eventImages.length;

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % n);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [n]);

  const cardShell =
    "overflow-hidden bg-white p-1  ring-1 ring-black/[0.04]";
  const cardShellActive =
    "overflow-hidden bg-white p-1  ring-1 ring-black/[0.04]";

  /** 4 tiles: prev, current (only one “active” / large), next, next+1 */
  const slotIndex = (offset) => (activeIndex + offset - 1 + n) % n;

  return (
    <section
      id={AWARDS_CERTIFICATIONS_SECTION_ID}
      className="relative w-full min-w-0 scroll-mt-[88px] overflow-x-hidden"
    >
      <div className="relative z-10 w-full pb-[35px] md:pb-[75px]">
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1520px] xl:px-12 2xl:px-16">
          <h2
            className={`${quattrocento.className} mb-8 text-center align-middle text-[20px] font-normal uppercase leading-[100%] tracking-normal text-[#111111] md:mb-10 md:text-[36px] lg:mb-12 lg:text-left`}
          >
            Awards & Certifications
          </h2>
        </div>

        {/* Full-bleed strip: images align to viewport left / right */}
        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden">
          {/* Mobile — height auto (intrinsic image); crossfade via stacked grid */}
          <div className="w-full md:hidden">
            <div className={`grid w-full ${cardShell}`}>
              {eventImages.map((item, i) => (
                <div
                  key={item.src}
                  className={`col-start-1 row-start-1 w-full transition-opacity duration-500 ease-in-out ${
                    i === activeIndex ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={i !== activeIndex}
                >
                  <div className="box-border w-full border border-[#EDEDED] p-[10px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={750}
                      className="h-auto w-full object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* md–lg: two images (active + next), height auto from image */}
          <div className="hidden w-full items-start justify-center gap-3 px-4 sm:gap-4 md:flex lg:hidden">
            <div className={`grid min-w-0 flex-1 ${cardShell}`}>
              {eventImages.map((item, i) => (
                <div
                  key={item.src}
                  className={`col-start-1 row-start-1 w-full transition-opacity duration-500 ease-in-out ${
                    i === activeIndex ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
                  }`}
                  aria-hidden={i !== activeIndex}
                >
                  <div className="box-border w-full border border-[#EDEDED] p-[10px]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={750}
                      className="h-auto w-full object-cover"
                      sizes="(max-width: 1023px) 45vw, 400px"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={`grid min-w-0 flex-1 ${cardShell}`}>
              {eventImages.map((item, i) => {
                const nextIdx = (activeIndex + 1) % n;
                return (
                  <div
                    key={item.src}
                    className={`col-start-1 row-start-1 w-full transition-opacity duration-500 ease-in-out ${
                      i === nextIdx ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
                    }`}
                    aria-hidden={i !== nextIdx}
                  >
                    <div className="box-border w-full border border-[#EDEDED] p-[10px]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={1200}
                        height={750}
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 1023px) 45vw, 400px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* lg+ — centered row clips at viewport: first/last images peek off-screen */}
          <div className="hidden w-full items-center justify-center gap-2 px-0 lg:flex lg:gap-4">
          {[0, 1, 2, 3].map((offset) => {
            const idx = slotIndex(offset);
            const item = eventImages[idx];
            const isActive = offset === 1;
            return (
              <button
                key={offset}
                type="button"
                className={`relative shrink-0 cursor-pointer p-0 text-left transition-[width,height,opacity,box-shadow,transform] duration-500 ease-in-out focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#111111] ${
                  isActive
                    ? `z-10 h-[419px] w-[584px] ${cardShellActive}`
                    : `h-[267px] w-[372px] opacity-90 ${cardShell}`
                }`}
                aria-label={item.alt}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="absolute inset-0 overflow-hidden">
                  {eventImages.map((img, imgI) => (
                    <div
                      key={img.src}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        imgI === idx ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
                      }`}
                      aria-hidden={imgI !== idx}
                    >
                      <div
                        className={`box-border h-full w-full p-[10px] ${
                          isActive
                            ? "border border-[#EDEDED]"
                            : "border-[1px] border-solid border-[#EDEDED]"
                        }`}
                      >
                        <div className="relative h-full w-full overflow-hidden">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes={isActive ? "584px" : "372px"}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1520px] xl:px-12 2xl:px-16">
          <div
            className="mt-6 flex justify-center gap-2 md:mt-8 md:gap-2.5"
            role="tablist"
            aria-label="Event slides"
          >
            {eventImages.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2 w-2 shrink-0 rounded-full transition-colors md:h-2.5 md:w-2.5 ${
                  i === activeIndex
                    ? "bg-[#111111]"
                    : "bg-[#111111]/25 hover:bg-[#111111]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
