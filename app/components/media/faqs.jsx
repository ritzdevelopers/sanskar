"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useState } from "react";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const FAQS = [
  {
    id: "01",
    question: "What is the latest project launched by Sanskar Realty?",
    answer:
      "The most recent launch by Sanskar Realty is Eternia, a premium group housing project located at Tech Zone-4, Greater Noida West. The project provides 3 and 4 BHK residential units which combine modern amenities with communal living spaces to create a new standard of luxury.",
  },
  {
    id: "02",
    question:
      "Where can I find official press releases and news about Sanskar Realty?",
    answer:
      "The Media Page contains all official press releases and news updates which share information about Sanskar Realty. The section presents current announcements together with company achievements and media reporting.",
  },
  {
    id: "03",
    question:
      "How can media outlets contact Sanskar Realty for press inquiries?",
    answer:
      "The Media Page provides contact information which journalists and media outlets can use for press inquiries. We provide complete assistance for press kits together with interviews and project information.",
  },
  {
    id: "04",
    question:
      "What kind of awards and recognitions has Sanskar Realty received?",
    answer:
      "The real estate development work of Sanskar Realty has received recognition because of its dedication to delivering high-quality services through transparent operations and innovative business practices. Our projects, such as Eternia and Forest Walk, have earned numerous accolades for their design and execution. For the latest awards and recognitions, check the Awards section on the Media Page.",
  },
];

export function FaqsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#FAFAFA] py-[35px] lg:py-[75px]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <h2
            className={`${quattrocento.className} mb-6 text-center align-middle text-[20px] font-normal leading-[100%] tracking-normal text-[#111111] md:mb-8 md:text-left md:text-[36px]`}
          >
            FAQs
          </h2>
          <div className="flex flex-col gap-3 md:gap-6">
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
                    <span className="flex min-w-0 flex-1 items-start gap-3 md:gap-4">
                      <span
                        className={`${lato.className} shrink-0 pt-0.5 text-[16px] font-normal leading-snug tracking-normal text-[#111111] md:text-[20px]`}
                      >
                        {item.id}
                      </span>
                      <span
                        className={`${lato.className} min-w-0 break-words text-[16px] font-normal leading-snug tracking-normal text-[#111111] md:text-[20px]`}
                      >
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
                      <div className="flex items-start gap-3 pt-3 pb-1 md:gap-4 md:pt-4 md:pb-2">
                        <span
                          className={`${lato.className} invisible shrink-0 select-none pt-0.5 text-[16px] font-normal leading-snug md:text-[20px]`}
                          aria-hidden
                        >
                          {item.id}
                        </span>
                        <p
                          className={`${lato.className} min-w-0 max-w-full flex-1 break-words pb-0.5 text-[16px] font-normal leading-snug tracking-normal text-[#00000099] md:text-[20px] xl:max-w-[1150px]`}
                        >
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

export default FaqsSection;
