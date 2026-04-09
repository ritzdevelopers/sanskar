"use client";

import Image from "next/image";
import { useState } from "react";

const FAQS = [
  {
    id: "01",
    question: "How can I arrange a property site visit?",
    answer:
      "By completing the form on our website or getting in touch with us directly by phone or email, you can arrange a site visit. Our staff will assist you in scheduling a time that works for you.",
  },
  {
    id: "02",
    question: "Can i book a property online?",
    answer:
      "Yes, you can use our website to make reservations for a few properties. For additional information and instructions on how to secure your unit, please visit the project page.",
  },
  {
    id: "03",
    question: "What are the amenities included in Sanskar Realty projects?",
    answer:
      "Our projects include a multipurpose hall, indoor games area, gym, yoga and meditation room, and children's play area. In addition, we have four high-speed lifts, a 100-meter green belt, commercial stores, gated security, and plenty of parking.",
  },
  {
    id: "04",
    question: "How can I find out if a property is for sale?",
    answer:
      "You can use the form or give our customer service team a call to inquire about the availability of properties. We'll keep you informed about available units in real time.",
  },
];

export function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#FAFAFA] py-10 md:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
        <h2 className="align-middle font-quattrocento text-[20px] md:text-[36px] font-normal leading-[100%] tracking-normal text-[#111111] text-center md:text-left">
  FAQs
</h2>

          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-6">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className="bg-white px-4 py-4 md:px-5 md:py-5"
                >
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 text-left md:gap-4"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                  >
                    <span className="flex min-w-0 flex-1 items-baseline gap-3 md:gap-4">
                      <span className="shrink-0 font-lato text-[18px] font-normal leading-[100%] tracking-normal text-[#111111]">
                        {item.id}
                      </span>
                      <span className="min-w-0 font-lato text-[18px] font-normal leading-normal tracking-normal text-[#111111]">
                        {item.question}
                      </span>
                    </span>
                    <span className="flex shrink-0 self-start pt-0.5" aria-hidden>
                      <Image
                        src={
                          isOpen
                            ? "/assets/subtract-line.svg"
                            : "/assets/add-line.svg"
                        }
                        alt=""
                        width={24}
                        height={24}
                        className="block h-6 w-6"
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
                      <div className="flex items-start gap-3 pt-3 md:gap-4 md:pt-4">
                        <span
                          className="shrink-0 font-lato text-[18px] font-normal leading-[100%] invisible select-none"
                          aria-hidden
                        >
                          {item.id}
                        </span>
                        <p className="min-w-0 flex-1 font-lato text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099] xl:max-w-[1150px]">
                          {item.answer}
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
