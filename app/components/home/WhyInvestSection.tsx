"use client";

import Image from "next/image";
import { useRef } from "react";
import { Lato, Quattrocento } from "next/font/google";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type InvestCard = {
  title: string;
  description: string;
  image: string;
  /** If set, card body shows text only through this phrase plus "…" */
  clipAfter?: string;
};

function cardDescriptionDisplay(card: InvestCard): string {
  if (!card.clipAfter) return card.description;
  const idx = card.description.indexOf(card.clipAfter);
  if (idx === -1) return card.description;
  return `${card.description.slice(0, idx + card.clipAfter.length)}...`;
}

const investCards: InvestCard[] = [
  {
    title: "Yatharth Legacy",
    description:
      "Backed by North India’s third-largest public-listed hospital group with a name that spells trust and community care since 2008.",
    clipAfter: "community care",
    image: "/assets/invest_infra.png",
  },
  {
    title: "Prime Locations",
    description: "Strategically placed in NCR's fastest growing corridors (Tech Zone-IV, Dream Valley, and NH-24).",
    image: "/assets/invest_roi.png",
  },
  {
    title: "Green & Vastu Living",
    description: "Eco-friendly & vastu-compliant homes that nurture living.",
    image: "/assets/invest_location.png",
  },
  {
    title: "Unmatched Quality",
    description: "Premium materials, iconic design and world-class amenities.",
    image: "/assets/invest_infra.png",
  },
  {
    title: "RERA compliant",
    description: "Transparent, secure, and legally compliant investments.",
    image: "/assets/invest_roi.png",
  },
  {
    title: "Customer First Approach",
    description: "From first inquiry to beyond possession: we are with you!",
    image: "/assets/invest_location.png",
  },
];

export function WhyInvestSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.08, duration: 0.65 });

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 300;
      const gap = 24;
      scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 300;
      const gap = 24;
      scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <section id="why-invest" ref={sectionRef} className="bg-white/95 py-[35px] md:py-[75px]">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
        <h2
          data-scroll-reveal
          className={`${quattrocento.className} text-center text-[32px]  leading-[1.1] text-[#111111] sm:text-[38px] md:text-left md:text-[44px] lg:text-[48px] xl:text-[52px] 2xl:text-[56px]`}
        >
          Why Invest With Us
        </h2>

        <p
          data-scroll-reveal
          className={`${lato.className} md:mx-auto mt-4 max-w-[1054px] text-center text-[15px] font-normal leading-[1.65] text-[#00000099] sm:mt-5 sm:text-[16px] md:mx-0 md:mt-6 md:text-left md:text-[17px] md:leading-[1.75] lg:text-[18px]`}
        >
          At Sanskar Realty, we do not just offer properties; we offer opportunities for growth, quality of life, and investment for the future. With our experience in delivering luxury properties and commercial spaces, we can assure you of not only a great lifestyle but also a high return on investment.

        </p>

        <div
          ref={scrollRef}
          className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-5 sm:mt-10 lg:gap-6 xl:gap-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
            #why-invest .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}} />
          {investCards.map((card) => (
            <article
              key={card.title}
              className="flex w-[280px] shrink-0 flex-col items-stretch rounded-[16px] border-[0.89px] border-[#F3F4F6] bg-white p-5 text-center shadow-none transition-shadow duration-500 ease-out hover:shadow-[0px_12px_28px_-10px_#00000024,0px_8px_16px_-6px_#00000018] sm:w-[300px] sm:p-6 md:w-[340px] md:text-left lg:w-[360px] xl:w-[384px]"
            >
              <h3
                data-scroll-reveal
                className={`${lato.className} text-lg font-semibold leading-[1.25] text-[#222222] sm:text-xl md:text-[22px]`}
              >
                {card.title}
              </h3>
              <p
                data-scroll-reveal
                title={card.clipAfter ? card.description : undefined}
                className={`${lato.className} mt-2 max-w-none text-[14px] font-normal leading-[1.45] text-[#626262] sm:mt-3 sm:text-[15px] md:max-w-[288px] md:text-[16px]  min-h-[calc(3*1.45em)]`}
              >
                {cardDescriptionDisplay(card)}
              </p>
              <div
                data-scroll-reveal-img
                className="relative mt-4 aspect-[333/174] w-full min-h-[120px] shrink-0 overflow-hidden  bg-[#F3F4F6] sm:mt-5"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 384px"
                  loading="eager"
                  unoptimized
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Previous cards"
            data-scroll-reveal-pop
            onClick={scrollPrev}
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-[#E2E2E2] bg-[#EDEDED]  transition-colors hover:bg-neutral-200"
          >
            <Image src="/assets/left_arrow 2.svg" alt="" width={12} height={20} className="scale-90 sm:scale-100" />
          </button>
          <button
            type="button"
            aria-label="Next cards"
            data-scroll-reveal-pop
            onClick={scrollNext}
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-[#E2E2E2] bg-[#EDEDED]  transition-colors hover:bg-neutral-200"
          >
            <Image src="/assets/right_arrow 2.svg" alt="" width={12} height={20} className="scale-90 sm:scale-100" />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}