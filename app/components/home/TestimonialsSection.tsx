"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { useScrollReveal } from "../common/useScrollReveal";
import { Lato, Quattrocento } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const quattrocento = Quattrocento({ subsets: ["latin"], weight: ["400", "700"] });

type Testimonial = {
  id: string;
  name: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: "ravi-1",
    name: "Rajesh Kumar | Resident, Noida Extension.",
    image: "/assets/testimonial_ravi.png",
    quote:
      '"Living in a house of Sanskar Realty is a dream come true. The contemporary facilities, superior construction and fittings, and fine details exceed anything we saw in Noida Extension."',
  },
  {
    id: "mohit-1",
    name: "Priya Mehta | Investor, Delhi NCR.",
    image: "/assets/testimonial_mohit.png",
    quote:
      '"Our family could not be happier. My investment has paid much more than I could have hoped, plus the quality is there. The site, layout and credentials of Yatharth Group makes this my smartest NCR real estate investment."',
  },
  {
    id: "ravi-2",
    name: "Rajesh Kumar | Resident, Noida Extension.",
    image: "/assets/testimonial_ravi.png",
    quote:
      '"Living in a house of Sanskar Realty is a dream come true. The contemporary facilities, superior construction and fittings, and fine details exceed anything we saw in Noida Extension."',
  },
  {
    id: "mohit-2",
    name: "Priya Mehta | Investor, Delhi NCR.",
    image: "/assets/testimonial_mohit.png",
    quote:
      '"Our family could not be happier. My investment has paid much more than I could have hoped, plus the quality is there. The site, layout and credentials of Yatharth Group makes this my smartest NCR real estate investment."',
  },
];

// Group testimonials into paired slides for desktop (2 per row)
const desktopSlides: Testimonial[][] = [];
for (let i = 0; i < testimonials.length; i += 2) {
  desktopSlides.push(testimonials.slice(i, i + 2));
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="flex w-full flex-col items-center rounded-[6px] bg-white px-5 py-6 text-center shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:px-6 sm:py-7 md:px-8 lg:px-10">
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px]">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" />
      </div>
      <h3 className={`${quattrocento.className} mt-3 text-[16px] font-bold text-[#111111] sm:text-[17px] md:text-[18px]`}>
        {item.name}
      </h3>
      <p className={`${lato.className} mt-4 max-w-[387px] text-[14px] leading-[1.55] text-[#5A5A5A] sm:mt-5 sm:text-[15px] md:mt-6 md:text-[16px]`}>
        {item.quote}
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  // Mobile: one card at a time (horizontal)
  const [mobileIndex, setMobileIndex] = useState(0);
  // Desktop: one paired slide at a time (vertical)
  const [desktopIndex, setDesktopIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const nextMobile = useCallback(
    () => setMobileIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const nextDesktop = useCallback(
    () => setDesktopIndex((i) => (i + 1) % desktopSlides.length),
    []
  );

  // Auto-advance both
  useEffect(() => {
    const t = setInterval(() => {
      nextMobile();
      nextDesktop();
    }, 4000);
    return () => clearInterval(t);
  }, [nextMobile, nextDesktop]);

  return (
    <section ref={sectionRef} className="bg-[#FFFFFF] py-10 sm:py-12 md:py-14">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <p
          data-scroll-reveal
          className={`${lato.className} text-center text-[15px] font-normal uppercase tracking-[0.08em] text-[#111111] sm:text-[16px] md:text-[18px]`}
        >
          Testimonials
        </p>
        <h2
          data-scroll-reveal
          className={`${quattrocento.className} mt-2 text-center text-[26px] font-normal uppercase leading-[1.2] text-[#111111] sm:mt-3 sm:text-[30px] md:text-[34px] lg:text-[36px]`}
        >
          What Our Customers&apos; Say?
        </h2>

        {/* ── MOBILE SLIDER (< md): one card, horizontal translateX ── */}
        <div data-scroll-reveal className="relative mt-8 md:hidden">
          {/* Track */}
          <div className="overflow-hidden rounded-[6px]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="w-full shrink-0 px-1">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setMobileIndex(i)}
                className={`h-[10px] w-[10px] rounded-full border transition-all duration-200 ${
                  mobileIndex === i
                    ? "border-[#1F1F1F] bg-transparent"
                    : "border-transparent bg-[#1F1F1F]"
                }`}
              >
                {mobileIndex === i && (
                  <span className="block h-full w-full flex items-center justify-center">
                    <span className="h-[4px] w-[4px] rounded-full bg-[#1F1F1F]" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP SLIDER (md+): 2 cards per row, vertical translateY ── */}
        <div data-scroll-reveal className="relative mt-8 hidden md:block sm:mt-10 lg:pr-12">
          <div className="h-[430px] overflow-hidden py-3 sm:py-4">
            <div
              className="h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateY(-${desktopIndex * 100}%)` }}
            >
              {desktopSlides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex h-full flex-row items-stretch justify-center gap-6 px-1 pb-6 sm:px-0 lg:gap-[60px]"
                >
                  {slide.map((item) => (
                    <div
                      key={item.id}
                      className="h-[360px] w-[min(100%,548px)] flex-none"
                    >
                      <TestimonialCard item={item} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop dots — vertical on the right */}
          <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-2 sm:mt-6 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:items-center lg:gap-2">
            {desktopSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to testimonial slide ${index + 1}`}
                onClick={() => setDesktopIndex(index)}
                className={`relative h-[12px] w-[12px] rounded-full border ${
                  desktopIndex === index
                    ? "border-[#1F1F1F] bg-transparent"
                    : "border-transparent bg-[#1F1F1F]"
                }`}
              >
                {desktopIndex === index && (
                  <span className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1F1F1F]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
