"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Lato, Quattrocento } from "next/font/google";
import { STORY_IMPACT_SECTION_ID } from "../common/aboutNavigation";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id={STORY_IMPACT_SECTION_ID}
      ref={sectionRef}
      className="scroll-mt-[min(5rem,12vh)] bg-[radial-gradient(#ebebeb_1.5px,transparent_1.5px)] [background-size:14px_14px] py-10 sm:py-12 md:py-14 md:[background-size:18px_18px] lg:py-20"
    >
      <h2 className="sr-only">Our Story and Impact</h2>
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:max-w-[1320px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-10 xl:gap-12">
          <div data-scroll-reveal-img className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:aspect-auto md:h-[min(420px,48vw)] md:w-1/2 md:min-w-0 md:shrink-0 lg:h-[450px] lg:w-[min(100%,641px)]">
            <Image
              src="/assets/creating_communities.png"
              alt="Building trust visual"
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 1024px) 100vw, 641px"
            />
          </div>

          <div className="flex h-auto w-full min-w-0 flex-col items-center gap-4 text-center sm:gap-[18px] md:w-1/2 md:max-w-[507px] md:items-start md:justify-center md:text-left">
            <h3
              data-scroll-reveal
              className={`${quattrocento.className} text-[22px] font-normal uppercase leading-[1.08] tracking-[0.01em] text-[#202020] sm:text-[24px] md:text-[26px]`}
            >
              BUILDING TRUST, CREATING HOMES


            </h3>
            <p
              data-scroll-reveal
              className={`${lato.className} text-[14px] font-normal leading-[1.5] text-[#555555] sm:text-[15px] md:text-[16px] md:leading-[1.45] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden md:[-webkit-line-clamp:3] lg:[display:block] lg:[-webkit-line-clamp:unset] lg:overflow-visible`}
            >
              Our journey started with a simple brief - every family deserves a home crafted with honesty, consideration, and foresight. Backed by the Yatharth Group's legacy, we are redefining luxury living throughout Delhi NCR.
            </p>
            <Link
              href="/about-us"
              data-scroll-reveal
              className={`${lato.className} mx-auto inline-flex w-fit cursor-pointer items-center gap-2 text-[17px] font-bold uppercase leading-none text-[#3A3A3A] no-underline transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A3A3A] sm:text-[18px] md:mx-0 md:text-[16px]`}
            >
              <span className="border-b border-[#3A3A3A] pb-1">Our Story</span>
              <Image
                src="/assets/bracket.svg"
                alt=""
                width={8}
                height={13}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-10 xl:gap-12">
          <div className="flex h-auto w-full min-w-0 flex-col items-center gap-4 text-center sm:gap-[18px] md:w-1/2 md:max-w-[507px] md:items-start md:justify-center md:text-left">
            <h3
              data-scroll-reveal
              className={`${quattrocento.className} text-[22px] font-normal uppercase leading-[1.08] tracking-[0.01em] text-[#202020] sm:text-[24px] md:text-[26px] xl:whitespace-nowrap`}
            >
              CREATING COMMUNITIES THAT LAST


            </h3>
            <p
              data-scroll-reveal
              className={`${lato.className} text-[14px] font-normal leading-[1.5] text-[#555555] sm:text-[15px] md:text-[16px] md:leading-[1.45] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden md:[-webkit-line-clamp:3] lg:[display:block] lg:[-webkit-line-clamp:unset] lg:overflow-visible`}
            >

              Our influence goes beyond real estate; we create communities where families develop, bond, and prosper. Across Ghaziabad, Noida Extension, and Greater Noida West we’ve helped hundreds find their forever homes.


            </p>
            <Link
              href="/about-us"
              data-scroll-reveal
              className={`${lato.className} mx-auto inline-flex w-fit cursor-pointer items-center gap-2 text-[17px] font-bold uppercase leading-none text-[#3A3A3A] no-underline transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A3A3A] sm:text-[18px] md:mx-0 md:text-[17px]`}
            >
              <span className="border-b border-[#3A3A3A] pb-1">Our Impact</span>
              <Image
                src="/assets/bracket.svg"
                alt=""
                width={8}
                height={13}
                aria-hidden="true"
              />
            </Link>
          </div>

          <div data-scroll-reveal-img className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:aspect-auto md:h-[min(420px,48vw)] md:w-1/2 md:min-w-0 md:shrink-0 lg:h-[450px] lg:w-[min(100%,641px)]">
            <Image
              src="/assets/building_trust.png"
              alt="Creating communities visual"
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 1024px) 100vw, 641px"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
