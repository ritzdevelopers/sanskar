"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { useScrollReveal } from "../common/useScrollReveal";
import { Lato, Quattrocento } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const quattrocento = Quattrocento({ subsets: ["latin"], weight: ["400", "700"] });

type Testimonial = {
  id: string;
  name: string;
  image: string;
  quote: string;
  /** Fine-tune circular crop (`object-position`) — second photo often needs a higher focus */
  avatarObjectPosition?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "ravi-1",
    name: "Mayank Bhatt | Resident, Noida Extension.",
    image: "/assets/testimonial-image.jpg",
    avatarObjectPosition: "center 20%",
    quote:
      '"Our family could not be happier. My investment has paid much more than I could have hoped, plus the quality is there.  The site, layout and credentials of Yatharth Group makes this my smartest NCR real estate investment."',
  },
  {
    id: "mohit-1",
    name: "Varun Kumar| Investor, Delhi NCR.",
    image: "/assets/testimonial-image2.jpg",
    avatarObjectPosition: "center 20%",
    quote:
      '"I have invested in one of the projects with Sanskar Realty based on their reputation in the market and the potential of the location. I am confident about the value it will create in the future. Their transparent approach towards their work has given me full trust in my investment."',
  },
  {
    id: "ravi-2",
    name: "Yash Sagar | Resident, Noida Extension.",
    image: "/assets/testimonial-image3.jpg",
    avatarObjectPosition: "center 20%",
    quote:
      '"I am excited about my future home with Sanskar Realty. Despite the fact that the project is soon to be ready, I feel confident about purchasing a home with them because of the regular updates and timelines. I am excited to move into a home that has such great prospects."',
  },
  {
    id: "mohit-2",
    name: "Nikhil Mehta | Investor, Delhi NCR.",
    image: "/assets/testimonial-image4.jpg",
    avatarObjectPosition: "center 20%",
    quote:
      '"I have already invested in my future home at Sanskar Realty. As I am looking forward to occupying my home soon, the promise of my home is exactly what I have been looking for."',
  },
];

// Group testimonials into paired slides for desktop (2 per row)
const desktopSlides: Testimonial[][] = [];
for (let i = 0; i < testimonials.length; i += 2) {
  desktopSlides.push(testimonials.slice(i, i + 2));
}

/** Inactive: small solid dot. Active: same dot inside a thin outer ring (matches design). */
function TestimonialSliderDot({
  active,
  onClick,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="relative flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3D3D]"
    >
      {active ? (
        <>
          <span
            className="pointer-events-none absolute inset-0 rounded-full border border-[#3D3D3D]"
            aria-hidden
          />
          <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-[#3D3D3D]" aria-hidden />
        </>
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[#3D3D3D]" aria-hidden />
      )}
    </button>
  );
}

function TestimonialName({ name, className }: { name: string; className: string }) {
  const parts = name
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) {
    return <h3 className={className}>{name}</h3>;
  }
  return (
    <h3 className={className}>
      <span className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4">
        <span className="text-center">{parts[0]}</span>
        <span
          className={`${lato.className} shrink-0 px-0.5 text-[12px] font-normal text-[#B0B0B0] sm:text-[13px]`}
          aria-hidden
        >
          |
        </span>
        <span className="text-center">{parts.slice(1).join(" · ")}</span>
      </span>
    </h3>
  );
}

function TestimonialCard({ item, compact = false }: { item: Testimonial; compact?: boolean }) {
  return (
    <div
      className={`flex min-h-0 min-w-0 w-full max-w-full flex-col items-center rounded-[6px] bg-white text-center ${
        compact
          ? "border border-[#ECECEC] px-5 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] sm:px-6 sm:py-6"
          : "h-full border border-transparent px-4 py-5 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:px-6 sm:py-7 md:px-5 md:py-6 lg:px-8 xl:px-10"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-black/[0.04] ${
          compact
            ? "h-20 w-20 sm:h-[88px] sm:w-[88px]"
            : "h-[80px] w-[80px] sm:h-[96px] sm:w-[96px] md:h-[100px] md:w-[100px] lg:h-[120px] lg:w-[120px]"
        }`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          quality={90}
          className="object-cover"
          sizes="(max-width: 1280px) 96px, (max-width: 1536px) 120px, 128px"
          style={{
            objectPosition: item.avatarObjectPosition ?? "center center",
          }}
        />
      </div>
      <p
        className={
          compact
            ? `${lato.className} mt-3 w-full max-w-full break-words text-[13px] leading-[1.62] text-[#5A5A5A] sm:mt-4 sm:text-[14px]`
            : `${lato.className} mt-3 w-full max-w-full shrink-0 break-words text-[13px] leading-relaxed text-[#5A5A5A] sm:mt-4 sm:text-[14px] md:text-[14px] md:leading-[1.55] lg:text-[15px] xl:text-[16px]`
        }
      >
        {item.quote}
      </p>
      <TestimonialName
        name={item.name}
        className={`${quattrocento.className} w-full max-w-full text-[15px] font-bold leading-snug text-[#111111] sm:text-[16px] sm:leading-snug md:text-[16px] lg:text-[17px] xl:text-[18px] ${
          compact ? "mt-3 sm:mt-4" : "mt-2 sm:mt-3 md:mt-4 lg:mt-5"
        }`}
      />
    </div>
  );
}

type TestimonialsSectionProps = {
  alignWithHeader?: boolean;
};

export function TestimonialsSection({
  alignWithHeader = false,
}: TestimonialsSectionProps = {}) {
  // Mobile: one card at a time (horizontal)
  const [mobileIndex, setMobileIndex] = useState(0);
  // Desktop: one paired slide at a time (vertical)
  const [desktopIndex, setDesktopIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  const nextMobile = useCallback(
    () => setMobileIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const nextDesktop = useCallback(
    () => setDesktopIndex((i) => (i + 1) % desktopSlides.length),
    []
  );

  // Auto-advance both
  useEffect(() => {
    const t = setInterval(() => {
      nextMobile();
      nextDesktop();
    }, 4000);
    return () => clearInterval(t);
  }, [nextMobile, nextDesktop]);

  const outerShell = alignWithHeader
    ? "w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16"
    : "w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 min-[1440px]:mx-auto min-[1440px]:max-w-[1500px]";
  const innerShell = alignWithHeader
    ? "relative mx-auto w-full max-w-[1480px] xl:max-w-[1520px]"
    : "relative w-full max-w-none min-[1440px]:mx-auto min-[1440px]:max-w-[1280px] min-[1536px]:max-w-[1320px]";

  return (
    <section ref={sectionRef} className="overflow-x-hidden bg-white py-10 sm:py-12 md:py-14">
      <div className={outerShell}>
        <div className={innerShell}>
        <p
          data-scroll-reveal
          className={`${lato.className} text-center text-[15px] font-normal uppercase tracking-[0.08em] text-[#111111] sm:text-[16px] md:text-[18px]`}
        >
          Testimonials
        </p>
        <h2
          data-scroll-reveal
          className={`${quattrocento.className} mt-2 text-center text-[20px] md:text-[26px] font-normal uppercase leading-[1.2] text-[#111111] sm:mt-3 sm:text-[30px] md:text-[34px] lg:text-[36px]`}
        >
          What Our Customers&apos; Say?
        </h2>

        {/* ── Single-card slider (mobile + tablet): compact card, horizontal slide ── */}
        <div data-scroll-reveal className="relative mt-8 xl:hidden">
          {/* Vertical padding so card shadow isn’t clipped; horizontal overflow hidden for slide */}
          <div className="-mx-1 overflow-hidden px-1 py-2 sm:py-3">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="flex w-full shrink-0 justify-center px-2 sm:px-4 md:px-5">
                  <div className="w-full max-w-[440px] sm:max-w-[500px] md:max-w-[540px]">
                    <TestimonialCard item={item} compact />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-row items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <TestimonialSliderDot
                key={i}
                active={mobileIndex === i}
                onClick={() => setMobileIndex(i)}
                ariaLabel={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── xl+: two cards per slide, vertical track; dots on the right ── */}
        <div
          data-scroll-reveal
          className="relative mt-8 hidden w-full max-w-full sm:mt-10 xl:flex xl:flex-row xl:items-stretch xl:gap-6"
        >
          {/* Taller on md (stacked 1-col) so copy never clips; compact 2-col from lg */}
          <div className="h-[460px] min-h-0 min-w-0 flex-1 overflow-hidden py-2 sm:py-3 md:h-[min(760px,82dvh)] md:py-3 lg:h-[540px] lg:py-4 xl:h-[500px] 2xl:h-[480px]">
            <div
              className="h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateY(-${desktopIndex * 100}%)` }}
            >
              {desktopSlides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid h-full w-full min-w-0 max-w-full grid-cols-1 content-start items-stretch gap-6 px-0 pb-2 sm:gap-8 md:gap-8 md:pb-4 lg:grid-cols-2 lg:content-center lg:gap-8 lg:pb-6 xl:gap-[60px]"
                >
                  {slide.map((item) => (
                    <div key={item.id} className="flex min-h-0 min-w-0 w-full">
                      <TestimonialCard item={item} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop dots — vertical column at the right edge of the slider row */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-3 self-stretch py-3 sm:py-4">
            {desktopSlides.map((_, index) => (
              <TestimonialSliderDot
                key={index}
                active={desktopIndex === index}
                onClick={() => setDesktopIndex(index)}
                ariaLabel={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
