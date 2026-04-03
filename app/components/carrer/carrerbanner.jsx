"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { HeroPageHeader } from "../common/HeroPageHeader";

/** Lato: next/font only exposes 100/300/400/700/900 — 700 is closest to “semibold”. */
const latoCareer = Lato({
  subsets: ["latin"],
  weight: ["700"],
});

const quattroCareer = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Carrerbanner() {
  return (
    <section className="relative flex min-h-[min(100dvh,620px)] w-full items-center justify-center overflow-hidden sm:min-h-[640px] lg:min-h-[683px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/carrerbanner.png"
          alt="Careers at Sanskar Realty"
          fill
          priority
          fetchPriority="high"
          quality={60}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <HeroPageHeader contactPageStyle />

      <div className="relative z-10 w-full px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8 md:pt-16 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center">
            <p
              className={`${latoCareer.className} text-[18px] leading-[28px] tracking-normal text-[#FFFFFF]`}
            >
              Career
            </p>
            <h1
              className={`${quattroCareer.className} mt-3 text-[20px] md:text-[36px] font-normal uppercase leading-[100%] tracking-normal text-[#FFFFFF] sm:mt-4`}
            >
              Create the Extraordinary, Every Day
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
