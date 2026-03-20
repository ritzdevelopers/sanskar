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

type Testimonial = {
  id: string;
  name: string;
  image: string;
  quote: string;
};

const testimonialSlides: Testimonial[][] = [
  [
    {
      id: "ravi-1",
      name: "Rajesh Kumar | Resident, Noida Extension.",
      image: "/assets/testimonial_ravi.png",
      quote:
        '"Living in a house of Sanskar Realty is a dream come true. The contemporary facilities, superior construction and fittings, and fine details exceed anything we saw in Noida Extension. "',
    },
    {
      id: "mohit-1",
      name: "Priya Mehta | Investor, Delhi NCR.",
      image: "/assets/testimonial_mohit.png",
      quote:
        '"Our family could not be happier. My investment has paid much more than I could have hoped, plus the quality is there.  The site, layout and credentials of Yatharth Group makes this my smartest NCR real estate investment."',
    },
  ],
  [
    {
      id: "mohit-2",
      name: "Mohit Sharma",
      image: "/assets/testimonial_mohit.png",
      quote:
        '"The team delivered quality construction and timely handover. The overall buying and support experience was smooth."',
    },
    {
      id: "ravi-2",
      name: "Ravi Gupta",
      image: "/assets/testimonial_ravi.png",
      quote:
        '"Their planning and amenities are impressive. We feel confident about long-term value and community growth."',
    },
  ],
  [
    {
      id: "ravi-3",
      name: "Ravi Gupta",
      image: "/assets/testimonial_ravi.png",
      quote:
        '"Excellent connectivity and thoughtful layout made this project the right choice for my family and investment goals."',
    },
    {
      id: "mohit-3",
      name: "Mohit Sharma",
      image: "/assets/testimonial_mohit.png",
      quote:
        '"Professional site team, clear communication, and strong design quality throughout the entire development process."',
    },
  ],
  [
    {
      id: "mohit-4",
      name: "Mohit Sharma",
      image: "/assets/testimonial_mohit.png",
      quote:
        '"From booking to possession, everything felt transparent and customer-focused. Highly recommended experience."',
    },
    {
      id: "ravi-4",
      name: "Ravi Gupta",
      image: "/assets/testimonial_ravi.png",
      quote:
        '"A reliable developer with premium quality standards. The project has exceeded our expectations in every aspect."',
    },
  ],
];

export function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

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
          What Our Customers' Say?
        </h2>

        <div data-scroll-reveal className="relative mt-8 sm:mt-10 lg:pr-12">
          <div className="min-h-[320px] overflow-hidden py-3 sm:min-h-[360px] sm:py-4 md:min-h-[380px] lg:h-[430px]">
            <div
              className="h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateY(-${activeSlide * 100}%)` }}
            >
              {testimonialSlides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex h-full flex-col items-stretch justify-start gap-4 px-1 pb-6 sm:px-0 md:flex-row md:flex-wrap md:justify-center md:gap-6 lg:flex-nowrap lg:gap-[60px]"
                >
                  {slide.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-h-[280px] w-full max-w-[548px] flex-col items-center rounded-[6px] bg-white px-5 py-6 text-center shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:min-h-[300px] sm:flex-1 sm:px-6 sm:py-7 md:px-8 lg:h-[360px] lg:min-h-0 lg:w-[min(100%,548px)] lg:flex-none lg:px-10"
                    >
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
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-2 sm:mt-6 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:items-center lg:gap-2">
            {testimonialSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to testimonial slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`relative h-[12px] w-[12px] rounded-full border ${
                  activeSlide === index ? "border-[#1F1F1F] bg-transparent" : "border-transparent bg-[#1F1F1F]"
                }`}
              >
                {activeSlide === index && (
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
