"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type FindDreamHomeSectionProps = {
  alignWithHeader?: boolean;
};

export function FindDreamHomeSection({
  alignWithHeader = false,
}: FindDreamHomeSectionProps = {}) {
  const innerMax = alignWithHeader
    ? "max-w-[1480px] xl:max-w-[1520px]"
    : "max-w-[1500px]";

  // const sectionRef = useRef<HTMLElement>(null);
  // useScrollReveal(sectionRef);

  return (
    <section  className="w-full bg-white mt-8">
      <div className="mx-auto h-full min-h-[280px] sm:min-h-[340px] md:min-h-[394px]">
        <div
          data-scroll-reveal-img
          className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] md:h-[394px] md:min-h-[394px]"
        >
          <Image
            src="/assets/find_dream_home.png"
            alt="Find your dream home"
            fill
            priority={false}
            className="object-cover w-full h-full"
          />

        

          <div className="absolute inset-0 z-10">
            <div
              className={`mx-auto flex h-full w-full ${innerMax} items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:justify-start lg:px-10 xl:px-12 2xl:px-16`}
            >
              <div className="max-w-[560px] text-center lg:text-left">
                <h3
                  data-scroll-reveal
                  className={`${quattrocento.className} text-[30px] leading-[1.15] text-[#111111] sm:text-[34px] md:text-[40px] lg:text-[42px] `}
                >
                  FIND YOUR DREAM HOME TODAY
                </h3>

                <button
                  data-scroll-reveal-pop
                  type="button"
                  className={`${lato.className} group relative mx-auto mt-5 inline-flex items-center overflow-hidden rounded-[50px] border border-[#111111] pl-3 pr-1 py-1 text-[14px] leading-none lg:mx-0`}
                >
                  <span
                    className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#111111] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                  <span className="relative z-10 inline-flex items-center gap-2 text-[#111111] transition-colors duration-300 group-hover:text-white">
                    Let Connect
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current">
                      <Image
                        src="/assets/diagonal_icon.svg"
                        alt=""
                        width={8}
                        height={8}
                        className="h-2 w-2 object-contain transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
                        aria-hidden
                      />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
