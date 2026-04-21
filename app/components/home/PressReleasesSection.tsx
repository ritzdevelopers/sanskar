"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

export function PressReleasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  const pressReleases: {
    id: number;
    image: string;
    title: string;
    description: string;
    date: string;
    linkText: string;
    linkUrl: string;
    brandLogo?: string;
    brandLogoAlt?: string;
  }[] = [
    {
      id: 1,
      image: "/assets/2 (1).png",
      brandLogo: "/assets/tribune.webp",
      brandLogoAlt: "The Tribune India",
      title: "Eternia: Spacious Residences For Grand Living | The Tribune India",
      description: "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and...",
      date: "Jun 28, 2025",
      linkText: "Eternia: Spacious Residences For Grand Living - The Tribune",
      linkUrl:"https://www.tribuneindia.com/news/business/eternia-spacious-residences-for-grand-living/",
    },
    {
      id: 2,
      image: "/assets/1.png",
      brandLogo: "/assets/bussiness.webp",
      brandLogoAlt: "Business Standard",
      title: "Eternia: Spacious Residences For Grand Living | The Business Standard",
      description: "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and...",
      date: "Jun 28, 2025",
      linkText: "Eternia: Spacious Residences For Grand Living - The Business Standard",
      linkUrl: "https://www.business-standard.com/content/press-releases-ani/eternia-spacious-residences-for-grand-living-125062800661_1.html",
    },
    {
      id: 3,
      image: "/assets/3.png",
      brandLogo: "/assets/print.png",
      brandLogoAlt: "The Print",
      title: "Eternia: Spacious Residences For Grand Living | The Print ",
      description: " The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and…",
      date: "Jun 28, 2025 ",
      linkText: "nse: yatharth...",
      linkUrl: "https://theprint.in/ani-press-releases/eternia-spacious-residences-for-grand-living/2673731/",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#FAFAFA] py-[35px] md:py-[75px]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
        <h2
          data-scroll-reveal
          className="mb-10 text-center font-quattrocento text-[28px] font-normal uppercase leading-[100%] tracking-[0%] text-[#1A1A1A] sm:mb-12 sm:text-[32px] md:mb-14 md:text-[34px] lg:mb-[60px] lg:text-[36px]"
        >
          PR RELEASES
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-[32px]">
          {pressReleases.map((release) => (
            <div key={release.id} className="flex flex-col gap-5 rounded-lg border border-[#E5E5E5] p-5 hover:shadow-lg">
              <div data-scroll-reveal-img className="relative aspect-[1.5] w-full overflow-hidden">
                <a
                  href={release.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full cursor-pointer"
                  aria-label={`Open press release: ${release.title}`}
                >
                  <Image
                    src={release.image}
                    alt={release.title}
                    title={release.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </a>
                {release.brandLogo ? (
                  <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex w-[min(140px,calc(100%-2rem))] shrink-0 items-center justify-center rounded-sm border border-black/5 bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-[6px] sm:bottom-5 sm:left-4 sm:w-[min(160px,calc(100%-2rem))] sm:px-3 sm:py-2">
                    <div className="relative h-5 w-full sm:h-6">
                      <Image
                        src={release.brandLogo}
                        alt={release.brandLogoAlt ?? "Publication logo"}
                        title={release.brandLogoAlt ?? "Publication logo"}
                        fill
                        className="object-contain object-center"
                        sizes="160px"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div data-scroll-reveal className="flex flex-col gap-2">
                <h3 className="font-quattrocento text-[18px] font-bold leading-[1.3] text-[#1A1A1A] sm:text-[20px]">
                  <a
                    href={release.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer font-inherit text-inherit no-underline decoration-transparent [text-decoration-line:none] visited:text-inherit hover:text-inherit hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]/35"
                  >
                    {release.title.trim()}
                  </a>
                </h3>
                <p className="font-lato text-[14px] text-[#777777]">
                  {release.date}
                </p>
                <p className="mt-1 font-lato text-[16px] font-normal leading-[1.5] tracking-[0.5px] text-[#555555]">
                  {release.description}{" "}
                  <a
                    href={release.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
