"use client";

import Image from "next/image";
import { useRef } from "react";
import { Lato, Quattrocento } from "next/font/google";
import { useScrollReveal } from "../common/useScrollReveal";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function LegalInformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="legal-overview"
      ref={sectionRef}
      className="relative w-full scroll-mt-[50px] bg-[#FFFFFF] py-[35px] lg:py-[75px]"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-2 md:gap-3 lg:gap-12 lg:grid-cols-2 lg:gap-14 xl:max-w-[1320px]">
          <div className="flex min-w-0 flex-col justify-center text-center lg:text-left">
            <h2
              className={`${quattrocento.className} text-[22px] font-normal uppercase leading-[1.25] tracking-normal text-[#000000] sm:text-[24px] md:text-[28px] lg:text-[32px]`}
            >
              Legal Information
            </h2>
            <p
              className={`${quattrocento.className} mt-4  text-[16px] font-medium leading-[26px] text-[#000000] sm:mt-2 lg:mt-4 sm:text-[17px] sm:leading-[28px] md:text-[16px] `}
            >
              Buying Property in India as an NRI? Here&apos;s What You Need to
              Know
            </p>
            <p
              className={`${lato.className} mt-4 text-[15px] font-normal leading-[26px] text-[#00000099] sm:mt-2 lg:mt-4 sm:text-[16px] sm:leading-[28px] md:text-[16px] lg:text-[16px] max-w-[545px] mx-auto lg:mx-0`}
            >
              At Sanskar Realty, we understand how daunting it can be to invest
              in property in India. Therefore, to make it easier for
              Non-Resident Indians (NRIs) to invest in Indian realty, we have
              listed out the important legal aspects to be considered while
              purchasing a property.
            </p>
          </div>

          <div data-scroll-reveal-img className="relative mx-auto aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:aspect-auto md:h-[min(420px,48vw)] md:w-1/2 md:min-w-0 md:shrink-0 lg:mx-0 lg:h-[450px] lg:w-[min(100%,641px)]">
            <Image
              src="/assets/legalinformation.jpg"
              alt="Legal information — scales of justice and legal symbols"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 641px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
