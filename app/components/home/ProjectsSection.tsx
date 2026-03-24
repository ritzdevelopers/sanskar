"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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

const slides = [
  {
    id: 1,
    title: "Eternia Project",
    image: "/assets/eternia.webp",
    url: "https://eternia.greatvaluerealty.com/",
  },
  {
    id: 2,
    title: "High Life",
    image: "/assets/high_life.jpg",
    url: "https://highlife.greatvaluerealty.com/",
  },
  {
    id: 3,
    title: "Forest Walk",
    image: "/assets/forest_walk.png",
    url: "https://theforestwalk.com/",
  },
];

export function ProjectsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[637px] bg-[#F8F8F8]" />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col items-center px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex w-full max-w-[1004px] flex-col items-center gap-5 text-center sm:gap-6 md:gap-[27px]">
          <p
            data-scroll-reveal
            className={`${lato.className} text-[15px] font-normal uppercase leading-[100%] tracking-[0.05em] text-[#111111] sm:text-[16px] md:text-[18px]`}
          >
            Our Projects
          </p>

          <h2
            data-scroll-reveal
            className={`${quattrocento.className} max-w-[750px] text-[26px] font-normal uppercase leading-[1.2] text-[#111111] sm:text-[30px] md:text-[34px] lg:text-[36px] lg:leading-[46px]`}
          >
            Three Projects<br /> One Standard - Extraordinary

          </h2>

          <p
            data-scroll-reveal
            className={`${lato.className} max-w-[760px] text-[14px] font-normal leading-6 text-[#00000099] sm:text-[15px] md:text-[16px]`}
          >

            From luxury 3 & 4 BHK residences in Noida Extension to studio apartments in Greater Noida West and gated forest villas in Ghaziabad, we have it all.

          </p>
        </div>

        <div className="mt-6 w-full max-w-[1284px] sm:mt-8">
          <div className="relative aspect-[4/3] min-h-[220px] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[5/3] md:min-h-[360px] lg:aspect-auto lg:h-[520px] xl:h-[580px] 2xl:h-[611px]">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${activeSlide === index ? "opacity-100" : "opacity-0"
                  }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className={`object-cover ${slide.id === 2 ? "scale-[1.02]" : ""}`}
                  priority={index === 0}
                  quality={60}
                  sizes="(max-width: 1284px) 100vw, 1284px"
                />

                <div className="absolute left-3 top-3 flex h-9 max-w-[min(167px,70%)] items-center justify-center border border-white/25 bg-[rgba(0,0,0,0.10)] px-3 backdrop-blur-md sm:left-6 sm:top-6 sm:h-[45px] md:left-[37px] md:top-[44px] md:w-[167px]">
                  <span
                    className={`${quattrocento.className} truncate text-[14px] font-normal leading-none text-white sm:text-[16px] md:text-[18px]`}
                  >
                    {slide.title}
                  </span>
                </div>
              </div>
            ))}

            <a
              href={slides[activeSlide].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${slides[activeSlide].title} project`}
              className="group absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-lg text-[#111111] transition-transform hover:scale-105 sm:right-6 sm:top-6 sm:h-11 sm:w-11 sm:text-xl md:right-8 md:top-8"
            >
              <Image
                src="/assets/diagonal_icon.svg"
                alt=""
                width={15}
                height={15}
                className="absolute transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[200%] group-hover:-translate-y-[200%]"
                aria-hidden="true"
              />
              <Image
                src="/assets/diagonal_icon.svg"
                alt=""
                width={15}
                height={15}
                className="absolute -translate-x-[200%] translate-y-[200%] transition-transform duration-[400ms] ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-4 w-4 rounded-full transition-colors ${activeSlide === index ? "bg-[#666666]" : "bg-[#E2E2E2]"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
