"use client";

import Image from "next/image";
import { useState } from "react";

const FAQS = [
  {
    id: "01",
    question: "What is the property rate in greater Noida?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: "02",
    question: "What documents do I need to book a unit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "03",
    question: "Are there any ready-to-move-in options available?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: "04",
    question: "How can I schedule a site visit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#FAFAFA] py-10 md:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <h2 className="align-middle font-quattrocento text-[36px] font-normal leading-[100%] tracking-normal text-[#111111]">
            FAQs
          </h2>

          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-6">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  className="bg-white px-4 py-4 shadow-[0_1px_0_rgba(0,0,0,0.06)] md:px-5 md:py-5"
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
