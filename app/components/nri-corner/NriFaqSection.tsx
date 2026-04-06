"use client";

import Image from "next/image";
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

const ITEMS = [
  {
    id: "01",
    title:
      "Do NRIs require the Reserve Bank’s permission to acquire property in India?",
    body: "No, NRIs don’t have to take prior permission from the RBI to acquire property in India. All transactions should be as per the guidelines of the Foreign Exchange Management Act (FEMA).",
  },
  {
    id: "02",
    title: "Can NRIs buy Property in India? What are the rules?",
    body: "Yes, foreign nationals of Indian origin can buy property in India. Sanskar Realty makes sure that you are cleared for making the best investment, both legally and procedurally.",
  },
  {
    id: "03",
    title:
      "As a foreign national of Indian origin, what are some payment methods for buying property?",
    body: "You can pay through NRE or FCNR accounts.",
  },
  {
    id: "04",
    title:
      "Any formalities to be completed by foreign nationals of Indian origin for property purchase in India?",
    body: "Yes, foreign nationals must show documentary proof of their Indian origin and reside in India; FEMA would apply. Sanskar Realty will help you with all your legal paperwork and procedures.",
  },
  {
    id: "05",
    title:
      "As an NRI, can I sell my property in India after receiving RBI approval?",
    body: "Yes, NRIs can sell their property in India without taking the permission of RBI. Nevertheless, when selling to another foreign citizen of Indian origin, the payment must be made via NRE or FCNR accounts.",
  },
  {
    id: "06",
    title:
      "Is it possible for me to transfer the proceeds from the sale of my property back home?",
    body: "Yes, the proceeds of the sale may be sent back to your home country as per the RBI repatriation guidelines. The transfer must happen through an NRE or FCNR account, to ensure FEMA compliance.",
  },
];

export function NriFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="nri-faq"
      className="w-full scroll-mt-[50px] bg-[#FAFAFA] py-[35px] lg:py-[75px]"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
          <h2
            className={`${quattrocento.className} text-center lg:text-left  align-middle text-[20px] md:text-[36px] font-normal leading-[100%] tracking-normal text-[#111111]`}
          >
            NRIs FAQ
          </h2>

          <div className="mt-6 flex flex-col gap-3 pb-2 md:mt-8 md:gap-4 md:pb-4">
            {ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className="overflow-visible rounded-[12px] bg-white px-4 py-4 pb-5 md:px-6 md:py-5 md:pb-6"
                >
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-start gap-3 text-left md:gap-4"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
                      <span
                        className={`${lato.className} shrink-0 pt-0.5 text-[16px] font-normal leading-snug tracking-normal text-[#111111] md:text-[20px]`}
                      >
                        {item.id}
                      </span>
                      <span
                        className={`${lato.className} min-w-0 break-words text-[16px] font-normal leading-snug tracking-normal text-[#111111] md:text-[20px]`}
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
                          className={`${lato.className} invisible shrink-0 select-none pt-0.5 text-[16px] font-normal leading-snug md:text-[20px]`}
                          aria-hidden
                        >
                          {item.id}
                        </span>
                        <p
                          className={`${lato.className} min-w-0 max-w-full flex-1 break-words pb-0.5 text-[16px] font-normal leading-snug tracking-normal text-[#00000099] md:text-[20px]`}
                        >
                          {item.body}
                        </p>
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
