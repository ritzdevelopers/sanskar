"use client";

import Link from "next/link";
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

const eterniaBody =
  "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and a shared commitment to enhancing community well-being. The grand launch celebration of Eternia on June 6, 2025, marks the beginning of a new era in spacious living.";

const TRIBUNE_URL =
  "https://www.tribuneindia.com/news/business/eternia-spacious-residences-for-grand-living/";
const THEPRINT_URL =
  "https://theprint.in/ani-press-releases/eternia-spacious-residences-for-grand-living/2673731/";

const entries = [
  {
    id: 1,
    day: "28",
    monthYear: "JUNE / 25",
    body: eterniaBody,
    href: TRIBUNE_URL,
  },
  {
    id: 2,
    day: "28",
    monthYear: "JUNE / 25",
    body: eterniaBody,
    href: TRIBUNE_URL,
  },
  {
    id: 3,
    day: "28",
    monthYear: "JUNE / 25",
    body: eterniaBody,
    href: THEPRINT_URL,
  },
];

export default function PressRelease() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-w-0 overflow-x-hidden bg-[#FAFAFA] pt-[35px] lg:pt-[75px]"
    >
      <div className="w-full border-b border-[#E0E0E0]">
        <div className="relative z-10 w-full px-4 pb-8 sm:px-6 sm:pb-10 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <header className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:flex-row lg:items-end lg:justify-between lg:text-left lg:gap-8">
            <div className="min-w-0">
              <p
                data-scroll-reveal
                className={`${lato.className} align-middle text-[18px] font-normal leading-[100%] tracking-[0.05em] text-[#111111]`}
              >
                Latest News
              </p>
              <h2
                data-scroll-reveal
                className={`${quattrocento.className} mt-3 align-middle text-[20px] md:text-[36px] font-normal uppercase leading-[46px] tracking-normal text-[#111111] sm:mt-4`}
              >
                Press Releases
              </h2>
            </div>
            <Link
              data-scroll-reveal
              href="#"
              className={`${lato.className} inline-flex shrink-0 items-center gap-1 align-middle text-[18px] font-normal leading-[100%] tracking-[0.05em] text-[#F5AC00] transition-opacity hover:opacity-80`}
            >
              Know More
              <i className="ri-arrow-right-up-line text-[20px] leading-none" aria-hidden="true" />
            </Link>
          </header>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
        <ul className="divide-y divide-[#E0E0E0]">
          {entries.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-[minmax(4rem,7rem)_1fr] sm:items-start sm:gap-8 md:grid-cols-[minmax(4rem,7.5rem)_1fr_auto] md:items-center md:gap-10 md:py-10 lg:gap-12"
            >
              <div data-scroll-reveal className="flex flex-col sm:block">
                <p
                  className={`${quattrocento.className} align-middle text-[56px] font-normal uppercase leading-[100%] tracking-normal text-[#111111]`}
                >
                  {item.day}
                </p>
                <p
                  className={`${quattrocento.className} mt-1 align-middle text-[20px] font-normal uppercase leading-[100%] tracking-normal text-[#111111] sm:mt-2`}
                >
                  {item.monthYear}
                </p>
              </div>
              <div
                data-scroll-reveal
                className={`${lato.className} max-w-[880px] text-[16px] font-normal leading-[28px] tracking-normal text-[#00000099]`}
              >
                <p>{item.body}</p>
             
              </div>
              <div className="flex justify-start sm:col-span-2 md:col-span-1 md:justify-end">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-scroll-reveal-pop
                  aria-label="Open press release in new tab"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#111111] transition-colors hover:bg-black/5"
                >
                  <i className="ri-arrow-right-up-line text-[20px] leading-none text-[#111111]" aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
