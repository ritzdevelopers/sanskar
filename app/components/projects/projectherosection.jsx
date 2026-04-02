"use client";

import Image from "next/image";
import { HeroPageHeader } from "../common/HeroPageHeader";

export function ProjectHeroSection() {
  return (
    <section className="relative flex min-h-[min(100dvh,620px)] w-full items-center justify-center overflow-hidden sm:min-h-[640px] lg:min-h-[683px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/project-banner.png"
          alt="Sanskar Realty residential projects"
          fill
          priority
          fetchPriority="high"
          quality={60}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <HeroPageHeader projectsLinkCurrent />

      <div className="relative z-10 flex w-full max-w-[900px] flex-col items-center justify-center px-4 pb-10 pt-20 text-center text-white sm:pb-12 sm:pt-24 md:pt-16">
        <p className="font-lato text-[16px] font-semibold leading-[28px] tracking-normal text-white">
          Your Next Move Starts Here
        </p>
        <h1 className="font-quattrocento mt-3 text-[36px] font-normal uppercase leading-[100%] tracking-normal text-white sm:mt-4">
          Featured Properties
        </h1>
      </div>
    </section>
  );
}
