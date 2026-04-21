"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Quattrocento } from "next/font/google";
import { MEDIA_GALLERY_SECTION_ID } from "../common/mediaNavigation";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const galleryImages = [
  { src: "/assets/womengallery.jpg", alt: "Resident on a balcony overlooking landscaped grounds" },
  { src: "/assets/gymgallery.jpg", alt: "Modern fitness centre interior" },
  { src: "/assets/treegallery.jpg", alt: "Landscaped courtyard with trees and water features" },
  { src: "/assets/viewgallery.jpg", alt: "Garden walkways and central fountain" },
  { src: "/assets/insidehomegallery.jpg", alt: "Bright indoor children's activity space" },
  { src: "/assets/watergallery.jpg", alt: "Water feature in the community landscape" },
  { src: "/assets/petrolpump.jpg", alt: "Electric vehicle charging area" },
  { src: "/assets/tenisgallery.jpg", alt: "Tennis court and sports facilities" },
];

/** Each slide: left panel shows image k, right shows k+1 (wraps) — loops through all images */
const slidePairs = Array.from({ length: galleryImages.length }, (_, k) => [
  k,
  (k + 1) % galleryImages.length,
]);

const AUTO_SLIDE_MS = 5000;

const slideTrackClass =
  "flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none";

export default function Gallery() {
  const nSlides = slidePairs.length;
  const nImages = galleryImages.length;
  const [activeSlide, setActiveSlide] = useState(() =>
    Math.min(Math.floor(nImages / 2), Math.max(0, nSlides - 1))
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slidePairs.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex]);

  const [leftIdx, rightIdx] = slidePairs[activeSlide];

  return (
    <section
      id={MEDIA_GALLERY_SECTION_ID}
      className="relative w-full min-w-0 scroll-mt-[88px] overflow-x-hidden pt-[35px] lg:pt-[75px]"
    >
      <div className="relative z-10 w-full px-4 pb-[35px] sm:px-6 md:px-8 md:pb-[75px] lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
        <h2
          className={`${quattrocento.className} mb-8 text-center align-middle text-[20px] font-normal uppercase leading-[100%] tracking-normal text-[#111111] md:mb-10 lg:text-left md:text-[36px] lg:mb-12`}
        >
          Gallery
        </h2>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            <button
              type="button"
              className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-neutral-200 p-0 text-left ring-offset-2 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#111111]"
              aria-label={`Open large view: ${galleryImages[leftIdx].alt}`}
              onClick={() => setLightboxIndex(leftIdx)}
            >
              <div
                className={slideTrackClass}
                style={{
                  width: `${nSlides * 100}%`,
                  transform: `translateX(-${(activeSlide / nSlides) * 100}%)`,
                }}
              >
                {slidePairs.map((pair, i) => {
                  const img = galleryImages[pair[0]];
                  return (
                    <div
                      key={i}
                      className="relative h-full shrink-0"
                      style={{ width: `${100 / nSlides}%` }}
                      aria-hidden={i !== activeSlide}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        title={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  );
                })}
              </div>
            </button>
            <button
              type="button"
              className="relative hidden aspect-[16/10] w-full cursor-pointer overflow-hidden bg-neutral-200 p-0 text-left ring-offset-2 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#111111] md:block"
              aria-label={`Open large view: ${galleryImages[rightIdx].alt}`}
              onClick={() => setLightboxIndex(rightIdx)}
            >
              <div
                className={slideTrackClass}
                style={{
                  width: `${nSlides * 100}%`,
                  transform: `translateX(-${(activeSlide / nSlides) * 100}%)`,
                }}
              >
                {slidePairs.map((pair, i) => {
                  const img = galleryImages[pair[1]];
                  return (
                    <div
                      key={i}
                      className="relative h-full shrink-0"
                      style={{ width: `${100 / nSlides}%` }}
                      aria-hidden={i !== activeSlide}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        title={img.alt}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                    </div>
                  );
                })}
              </div>
            </button>
          </div>

          <div className="flex justify-center gap-2 md:gap-2.5" role="tablist" aria-label="Gallery slides">
            {slidePairs.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeSlide}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActiveSlide(i)}
                className={`h-2 w-2 shrink-0 rounded-full transition-colors md:h-2.5 md:w-2.5 ${
                  i === activeSlide ? "bg-[#111111]" : "bg-[#111111]/25 hover:bg-[#111111]/40"
                }`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md transition-colors hover:bg-white"
            aria-label="Close preview"
            onClick={() => setLightboxIndex(null)}
          >
            <i className="ri-close-line text-2xl leading-none" aria-hidden="true" />
          </button>
          <div
            className="relative mx-auto flex w-full max-w-[min(100vw-2rem,720px)] items-center justify-center px-10 sm:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md transition-colors hover:bg-white sm:h-11 sm:w-11"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
                );
              }}
            >
              <i className="ri-arrow-left-s-line text-xl leading-none sm:text-2xl" aria-hidden="true" />
            </button>
            <div className="relative aspect-[16/10] w-full max-h-[min(58vh,480px)] overflow-hidden md:max-h-[min(62vh,520px)]">
              <div
                className={slideTrackClass}
                style={{
                  width: `${nImages * 100}%`,
                  transform: `translateX(-${(lightboxIndex / nImages) * 100}%)`,
                }}
              >
                {galleryImages.map((img, i) => (
                  <div
                    key={img.src}
                    className="relative h-full shrink-0"
                    style={{ width: `${100 / nImages}%` }}
                    aria-hidden={i !== lightboxIndex}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      title={img.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 85vw, 720px"
                      priority={i === lightboxIndex}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md transition-colors hover:bg-white sm:h-11 sm:w-11"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
              }}
            >
              <i className="ri-arrow-right-s-line text-xl leading-none sm:text-2xl" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
