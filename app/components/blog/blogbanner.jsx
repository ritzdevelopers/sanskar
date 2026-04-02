"use client";

import Image from "next/image";
import { HeroPageHeader } from "../common/HeroPageHeader";

export default function BlogBanner() {
  return (
    <section className="relative flex min-h-[min(100dvh,620px)] w-full items-center justify-center overflow-hidden sm:min-h-[640px] lg:min-h-[683px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/blog-banner.jpg"
          alt=""
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
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center text-white">
            <p className="font-lato text-[18px] font-semibold leading-[28px] tracking-normal text-[#FFFFFF]">
              Blog
            </p>
            <h1 className="font-quattrocento mt-3 text-[36px] font-normal uppercase leading-[100%] tracking-normal text-[#FFFFFF] sm:mt-4">
              Turning Spaces into Stories
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
