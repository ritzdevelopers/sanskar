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

const bodyCopy =
  "At Sanskar, we are dedicated to helping individuals, families, and investors navigate the real estate market with confidence. With a deep understanding of local trends and a commitment to personalized service, we turn property goals into successful outcomes.";

const entries = [
  { id: 1, day: "12", monthYear: "JAN / 26" },
  { id: 2, day: "12", monthYear: "JAN / 26" },
  { id: 3, day: "12", monthYear: "JAN / 26" },
];

export default function PressRelease() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-w-0 overflow-x-hidden bg-[#FAFAFA] py-12 sm:py-14 md:py-16 lg:py-20"
    >
      <div className="w-full border-b border-[#E0E0E0]">
        <div className="mx-auto w-full max-w-[1480px] px-4 pb-8 sm:px-6 sm:pb-10 md:px-8 lg:px-10 xl:max-w-[1520px] xl:px-12 2xl:px-16">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <p
                data-scroll-reveal
                className={`${lato.className} align-middle text-[18px] font-normal leading-[100%] tracking-[0.05em] text-[#111111]`}
              >
                Latest News
              </p>
              <h2
                data-scroll-reveal
                className={`${quattrocento.className} mt-3 align-middle text-[36px] font-normal uppercase leading-[46px] tracking-normal text-[#111111] sm:mt-4`}
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

      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-10 xl:max-w-[1520px] xl:px-12 2xl:px-16">
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
              <p
                data-scroll-reveal
                className={`${lato.className} max-w-[880px] text-[16px] font-normal leading-[28px] tracking-normal text-[#00000099]`}
              >
                {bodyCopy}
              </p>
              <div className="flex justify-start sm:col-span-2 md:col-span-1 md:justify-end">
                <button
                  type="button"
                  data-scroll-reveal-pop
                  aria-label="Open press release"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#111111] transition-colors hover:bg-black/5"
                >
                  <i className="ri-arrow-right-up-line text-[20px] leading-none text-[#111111]" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
