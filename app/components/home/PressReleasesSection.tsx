"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

export function PressReleasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const pressReleases = [
    {
      id: 1,
      image: "/assets/2 (1).png",
      title: "Eternia: Spacious Residences For Grand Living | The Tribune India",
      description: "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and...",
      date: "Jun 28, 2025",
      linkText: "Eternia: Spacious Residences For Grand Living - The Tribune",
      linkUrl: "https://www.tribuneindia.com/",
    },
    {
      id: 2,
      image: "/assets/1.png",
      title: "Eternia: Spacious Residences For Grand Living | The Business Standard",
      description: "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and...",
      date: "Jun 28, 2025",
      linkText: "Eternia: Spacious Residences For Grand Living - The Business Standard",
      linkUrl: "https://www.business-standard.com/",
    },
    {
      id: 3,
      image: "/assets/3.png",
      title: "Yatharth Hospital lists on NSE/BSE: The trust behind Sanskar Realty",
      description: "Yatharth Hospital & Trauma Care Services Ltd. was successfully listed on NSE and BSE, which raised ₹687 Cr. This has made Yatharth Hospital the most reliable public-listed hospital...",
      date: "Aug 07, 2023",
      linkText: "nse: yatharth...",
      linkUrl: "https://www.nseindia.com/",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] py-16 sm:py-20 md:py-24 lg:py-[100px]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
        <h2
          data-scroll-reveal
          className="mb-10 text-center font-quattrocento text-[28px] font-normal uppercase leading-[100%] tracking-[0%] text-[#1A1A1A] sm:mb-12 sm:text-[32px] md:mb-14 md:text-[34px] lg:mb-[60px] lg:text-[36px]"
        >
          PR RELEASES
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-[32px]">
          {pressReleases.map((release) => (
            <div key={release.id} className="flex flex-col gap-5">
              <div data-scroll-reveal-img className="relative aspect-[1.5] w-full overflow-hidden">
                <Image
                  src={release.image}
                  alt={release.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div data-scroll-reveal className="flex flex-col gap-2">
                <h3 className="font-quattrocento text-[18px] font-bold leading-[1.3] text-[#1A1A1A] sm:text-[20px]">
                  {release.title}
                </h3>
                <p className="font-lato text-[14px] text-[#777777]">
                  {release.date}
                </p>
                <p className="mt-1 font-lato text-[16px] font-normal leading-[1.5] tracking-[0.5px] text-[#555555]">
                  {release.description}{" "}
                  <a
                    href={release.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#1A1A1A] underline transition-colors duration-300 hover:text-[#F5AC00]"
                  >
                    Read more
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
