"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { Lato, Quattrocento } from "next/font/google";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const bodyClass = `${lato.className} text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]`;

const ITEMS: { id: string; title: string; content: ReactNode }[] = [
  {
    id: "01",
    title: "Repatriation Benefit - Your Money, Your Way",
    content: (
      <p className={bodyClass}>
        One of the greatest advantages of investing in India as an NRI is the
        facility to withdraw up to 60 % of the money they have invested in the
        country. Therefore, India has become a financial haven for those who wish
        to invest in the country.
      </p>
    ),
  },
  {
    id: "02",
    title: "Are You Eligible for a Home Loan?",
    content: (
      <div className="space-y-3">
        <p className={bodyClass}>
          Eligibility criteria same as for the Indian Residents, also certain
          parameters to be considered:
        </p>
        <ul
          className={`${lato.className} list-disc space-y-2 pl-5 text-[16px] font-normal leading-[24px] text-[#00000099]`}
        >
          <li>Employment Status - Salaried or Self-Employed</li>
          <li>Income level - Your monthly earnings</li>
          <li>
            Credit history – Domestic as well as international credit history
            can be taken into consideration
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "03",
    title: "Property Documents You'll Need",
    content: (
      <ul
        className={`${lato.className} list-disc space-y-2 pl-5 text-[16px] font-normal leading-[24px] text-[#00000099]`}
      >
        <li>Sale Deed</li>
        <li>Title Deed</li>
        <li>Proof of property ownership</li>
        <li>Other documents required by the lending institution</li>
      </ul>
    ),
  },
  {
    id: "04",
    title: "Additional Requirements for Persons of Indian Origin (PIOs)",
    content: (
      <ul
        className={`${lato.className} list-disc space-y-2 pl-5 text-[16px] font-normal leading-[24px] text-[#00000099]`}
      >
        <li>Proof of Indian origin</li>
        <li>Copies of valid passports</li>
        <li>Additional KYC documents</li>
      </ul>
    ),
  },
];

export function NriHomeLoansSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="nri-home-loans"
      className="w-full scroll-mt-28 bg-[#FFFFFF] py-10 pb-12 sm:scroll-mt-32 sm:pb-16 md:py-14 md:pb-20 lg:py-16 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
          <h2
            className={`${quattrocento.className} text-left align-middle text-[36px] font-normal uppercase lg:leading-[50px] leading-[100%] tracking-normal text-[#111111] max-w-[700px]`}
          >
            NRI Home Loans - Helping Your India Investment Work for You
          </h2>

          <div className="mt-6 flex flex-col gap-3 pb-2 md:mt-8 md:gap-4 md:pb-4">
            {ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className="overflow-visible rounded-[12px] bg-white px-4 py-4 pb-5 shadow-[0px_4px_20px_0px_#7272721F] md:px-6 md:py-5 md:pb-6"
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-start gap-3 text-left md:gap-4"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
                      <span
                        className={`${lato.className} shrink-0 pt-0.5 text-[20px] font-normal leading-snug tracking-normal text-[#111111]`}
                      >
                        {item.id}
                      </span>
                      <span
                        className={`${lato.className} min-w-0 text-[20px] font-normal leading-snug tracking-normal text-[#111111]`}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span
                      className="flex shrink-0 self-start pt-0.5"
                      aria-hidden
                    >
                      <Image
                        src={
                          isOpen
                            ? "/assets/subtract-line.svg"
                            : "/assets/add-line.svg"
                        }
                        alt=""
                        width={24}
                        height={24}
                        className="block h-6 w-6 brightness-0"
                      />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div
                      className="min-h-0 overflow-hidden"
                      aria-hidden={!isOpen}
                    >
                      <div className="flex items-start gap-3 pt-3 pb-1 md:gap-4 md:pt-4 md:pb-2">
                        <span
                          className={`${lato.className} invisible shrink-0 select-none pt-0.5 text-[20px] font-normal leading-snug`}
                          aria-hidden
                        >
                          {item.id}
                        </span>
                        <div className="min-w-0 flex-1 pb-0.5">{item.content}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
