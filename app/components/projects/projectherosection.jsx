"use client";

import Image from "next/image";
import { HeroPageHeader } from "../common/HeroPageHeader";

export function ProjectHeroSection() {
  return (
    <section className="relative flex min-h-[min(100dvh,620px)] w-full items-center justify-center overflow-hidden sm:min-h-[640px] md:min-h-[375px] lg:min-h-[500px] xl:min-h-[750px]">
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="/assets/projectmobilebanner.jpg"
          alt="Sanskar Realty residential projects"
          fill
          priority
          fetchPriority="high"
          quality={60}
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <Image
          src="/assets/projectbannerdeskstop.jpg"
          alt="Sanskar Realty residential projects"
          fill
          priority
          fetchPriority="high"
          quality={60}
          className="hidden object-cover md:block"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <HeroPageHeader contactPageStyle projectsLinkCurrent />

      <div className="relative z-10 w-full px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8 md:pt-16 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center text-white">
            <p className="font-lato text-[16px] font-semibold leading-[28px] tracking-normal text-white">
           Our Projects
            </p>
            <h1 className="font-quattrocento mt-3 text-[30px] md:text-[36px] font-normal uppercase leading-[100%] tracking-normal text-white sm:mt-4">
            Where design meets exceptional quality
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
