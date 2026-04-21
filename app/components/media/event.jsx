"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
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
/** Must match Tailwind `duration-500` on the slide track */
const SLIDE_TRANSITION_MS = 500;

const slideTrackClass =
  "flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none";

export default function OurEvents() {
  const n = eventImages.length;
  const loopSlides = useMemo(
    () => [eventImages[n - 1], ...eventImages, eventImages[0]],
    [n]
  );
  const loopLen = n + 2;

  /** 1..n = real slides; 0 and n+1 are clones for seamless loop */
  const [trackPos, setTrackPos] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);

  const realIndex =
    trackPos === 0 ? n - 1 : trackPos === n + 1 ? 0 : trackPos - 1;

  const col2TrackPos = ((realIndex + 1) % n) + 1;

  useEffect(() => {
    if (trackPos !== n + 1 && trackPos !== 0) return undefined;
    const id = window.setTimeout(() => {
      setEnableTransition(false);
      setTrackPos(trackPos === n + 1 ? 1 : n);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
    }, SLIDE_TRANSITION_MS);
    return () => clearTimeout(id);
  }, [trackPos, n]);

  useEffect(() => {
    const id = setInterval(() => {
      setTrackPos((prev) => {
        if (prev === 0 || prev === n + 1) return prev;
        if (prev === n) return n + 1;
        return prev + 1;
      });
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [n]);

  const goPrev = useCallback(() => {
    setTrackPos((prev) => {
      if (prev === 0 || prev === n + 1) return prev;
      if (prev === 1) return 0;
      return prev - 1;
    });
  }, [n]);

  const goNext = useCallback(() => {
    setTrackPos((prev) => {
      if (prev === 0 || prev === n + 1) return prev;
      if (prev === n) return n + 1;
      return prev + 1;
    });
  }, [n]);

  const trackClassName = enableTransition
    ? slideTrackClass
    : "flex h-full motion-reduce:transition-none";

  const arrowBtnClass =
    "pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#111111]/15 bg-white/95 text-[#111111] shadow-md transition hover:bg-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#111111] sm:h-11 sm:w-11";

  const cardShell =
    "overflow-hidden bg-white p-1  ring-1 ring-black/[0.04]";
  const cardShellActive =
    "overflow-hidden bg-white p-1  ring-1 ring-black/[0.04]";

  /** 4 tiles: prev, current (only one “active” / large), next, next+1 */
  const slotIndex = (offset) => (realIndex + offset - 1 + n) % n;

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

        {/* Full-bleed strip + left/right controls */}
        <div className="relative w-full">
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden">
          {/* Mobile — same card frame; images slide horizontally one by one */}
          <div className="w-full md:hidden">
            <div className={`w-full ${cardShell}`}>
              <div className="box-border w-full border border-[#EDEDED] p-[10px]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div
                    className={trackClassName}
                    style={{
                      width: `${loopLen * 100}%`,
                      transform: `translateX(-${(trackPos / loopLen) * 100}%)`,
                    }}
                  >
                    {loopSlides.map((item, i) => (
                      <div
                        key={`${item.src}-loop-${i}`}
                        className="relative h-full shrink-0"
                        style={{ width: `${100 / loopLen}%` }}
                        aria-hidden={i !== trackPos}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          title={item.alt}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* md–lg: two cards (current + next); each slides through images */}
          <div className="hidden w-full items-start justify-center gap-3 px-4 sm:gap-4 md:flex lg:hidden">
            <div className={`min-w-0 flex-1 ${cardShell}`}>
              <div className="box-border w-full border border-[#EDEDED] p-[10px]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div
                    className={trackClassName}
                    style={{
                      width: `${loopLen * 100}%`,
                      transform: `translateX(-${(trackPos / loopLen) * 100}%)`,
                    }}
                  >
                    {loopSlides.map((item, i) => (
                      <div
                        key={`${item.src}-loop-${i}`}
                        className="relative h-full shrink-0"
                        style={{ width: `${100 / loopLen}%` }}
                        aria-hidden={i !== trackPos}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          title={item.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 45vw, 400px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`min-w-0 flex-1 ${cardShell}`}>
              <div className="box-border w-full border border-[#EDEDED] p-[10px]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div
                    className={trackClassName}
                    style={{
                      width: `${loopLen * 100}%`,
                      transform: `translateX(-${(col2TrackPos / loopLen) * 100}%)`,
                    }}
                  >
                    {loopSlides.map((item, i) => (
                      <div
                        key={`${item.src}-loop-b-${i}`}
                        className="relative h-full shrink-0"
                        style={{ width: `${100 / loopLen}%` }}
                        aria-hidden={i !== col2TrackPos}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          title={item.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 45vw, 400px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                  onClick={() => setTrackPos(idx + 1)}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className={`box-border h-full w-full p-[10px] ${
                        isActive
                          ? "border border-[#EDEDED]"
                          : "border-[1px] border-solid border-[#EDEDED]"
                      }`}
                    >
                      <div className="relative h-full w-full overflow-hidden">
                        <div
                          className={slideTrackClass}
                          style={{
                            width: `${n * 100}%`,
                            transform: `translateX(-${(idx / n) * 100}%)`,
                          }}
                        >
                          {eventImages.map((img, imgI) => (
                            <div
                              key={img.src}
                              className="relative h-full shrink-0"
                              style={{ width: `${100 / n}%` }}
                              aria-hidden={imgI !== idx}
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                title={img.alt}
                                fill
                                className="object-cover"
                                sizes={isActive ? "584px" : "372px"}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-[100vw] items-center justify-between px-2 sm:px-4 md:px-6 lg:px-3 xl:px-8">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className={arrowBtnClass}
            >
              <i
                className="ri-arrow-left-s-line text-xl leading-none sm:text-2xl"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className={arrowBtnClass}
            >
              <i
                className="ri-arrow-right-s-line text-xl leading-none sm:text-2xl"
                aria-hidden="true"
              />
            </button>
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
                aria-selected={i === realIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setTrackPos(i + 1)}
                className={`h-2 w-2 shrink-0 rounded-full transition-colors md:h-2.5 md:w-2.5 ${
                  i === realIndex
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
