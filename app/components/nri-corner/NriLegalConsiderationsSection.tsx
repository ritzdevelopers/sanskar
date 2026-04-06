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
    title: "RBI Approval",
    body: "Non-Resident Indians holding an Indian passport are not required to seek RBI approval to invest in India. This is applicable only if the investment is made in residential properties and is compliant with FEMA regulations.",
  },
  {
    id: "02",
    title: "Payment Process",
    body: "The payment process can be completed by making remittances through NRE or FCNR accounts, adhering to Indian bank regulations.",
  },
  {
    id: "03",
    title: "Title Report & Documentation",
    body: "To obtain a title report is important so that there are no hidden clauses or government reservations attached to the property.",
  },
  {
    id: "04",
    title: "Clearance Reports",
    body: "If the property is located near the coastal areas then clearance reports regarding the CRZ clearance must be obtained.",
  },
  {
    id: "05",
    title: "Legal Information",
    body: "Property must be clear with the Encumbrance Certificate, registered with RERA and the seller must be the owner with no disputes.",
  },
];

export function NriLegalConsiderationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#FAFAFA] py-10 pb-12 sm:pb-16 md:py-14 md:pb-20 lg:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
          <h2
            className={`${quattrocento.className} align-middle text-center text-[20px] font-normal leading-[100%] tracking-normal text-[#111111] md:text-[36px] lg:text-left`}
          >
            Key Legal Considerations for NRIs
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
