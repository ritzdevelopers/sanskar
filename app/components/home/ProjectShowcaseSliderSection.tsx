"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Lato, Quattrocento } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const quattrocento = Quattrocento({ subsets: ["latin"], weight: ["400", "700"] });

const showcaseSlides = [
  {
    id: 1,
    headline: "Towering at a Trailblazing Pace",
    subtext: "Construction in full swing",
    projectName: "Eternia",
    description: (
      <>
        Located at <strong>Noida Extension</strong>, Eternia by Sanskar Realty offers premium{" "}
        <strong>3BHK and 4BHK apartments</strong>. This project promises a luxurious living
        experience with its{" "}
        <strong>world-class amenities, roomy layouts, and Vastu-compliant design.</strong>
      </>
    ),
    image: "/assets/eternia.webp",
  },
  {
    id: 2,
    headline: "Modern Living, Elevated Daily",
    subtext: "Premium lifestyle spaces",
    projectName: "High Life",
    description: (
      <>
        High Life In <strong>Greater Noida West</strong>, has{" "}
        <strong>1 &amp; 2 BHK studio apartments</strong> within a{" "}
        <strong>mixed-use development</strong>. Located along a <strong>130-meter road</strong> with{" "}
        <strong>100-meter green belt</strong> views, these homes come{" "}
        <strong>furnished with IKEA</strong>.
      </>
    ),
    image: "/assets/high_life.jpg",
  },
  {
    id: 3,
    headline: "Built for Tomorrow's Urban Life",
    subtext: "Thoughtfully crafted homes",
    projectName: "Forest Walk",
    description: (
      <>
        The Forest Walk in <strong>Ghaziabad</strong> is an exclusive gated villa community that
        blends urban luxury with nature. With only <strong>97 villas</strong>, large{" "}
        <strong>green spaces</strong> and a <strong>forest trail</strong>, it offers easy
        connectivity to Delhi and Noida via <strong>NH-24</strong>.
      </>
    ),
    image: "/assets/forest_walk.png",
  },
];

export function ProjectShowcaseSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  // Background image layers
  const bgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  // Thumbnail image layers inside the card
  const thumbLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return;

    const totalSlides = showcaseSlides.length;
    const SCROLL_PER_SLIDE = window.innerHeight;

    // BG images: first is visible, rest start below
    bgLayersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { yPercent: i === 0 ? 0 : 100 });
    });

    // Thumbnail images: first visible, rest start below (clipped by overflow-hidden on parent)
    thumbLayersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { yPercent: i === 0 ? 0 : 100 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${SCROLL_PER_SLIDE * (totalSlides - 1)}`,
          pin: sticky,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate(self) {
            const idx = Math.min(
              totalSlides - 1,
              Math.floor(self.progress * totalSlides + 0.01)
            );
            setActiveIndex(idx);
          },
        },
      });

      for (let i = 1; i < totalSlides; i++) {
        const step = i - 1;

        // Background image slides up from bottom
        tl.fromTo(
          bgLayersRef.current[i],
          { yPercent: 100 },
          { yPercent: 0, ease: "none", duration: 1 },
          step
        );

        // Card thumbnail slides up from bottom (same timing, synced)
        tl.fromTo(
          thumbLayersRef.current[i],
          { yPercent: 100 },
          { yPercent: 0, ease: "none", duration: 1 },
          step
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const activeSlide = showcaseSlides[activeIndex];

  return (
    <section
      aria-labelledby="project-showcase-heading"
      ref={wrapperRef}
      style={{ height: `${showcaseSlides.length * 100}vh` }}
    >
      <h2 id="project-showcase-heading" className="sr-only">Project showcase</h2>
      {/* Sticky viewport pinned by GSAP */}
      <div ref={stickyRef} className="relative h-screen w-full overflow-hidden bg-black">

        {/* ── STACKED BACKGROUND IMAGES (slide bottom-to-top) ── */}
        {showcaseSlides.map((slide, index) => (
          <div
            key={`bg-${slide.id}`}
            ref={(el) => { bgLayersRef.current[index] = el; }}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: index + 1 }}
          >
            <Image
              src={slide.image}
              alt={slide.projectName}
              fill
              className="object-cover object-center"
              quality={100}
              priority={index === 0}
              sizes="100vw"
            />
            {/* Stronger gradient on mobile for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:from-black/70 md:via-black/20" />
          </div>
        ))}

        {/* ── HEADLINE + SUBTEXT ── */}
        {/* Mobile: sits just above the card at bottom-left, width-capped to avoid overlap */}
        {/* lg+: vertically centred on the left */}
        <div className="absolute z-50 text-left
          bottom-[58%] left-4 max-w-[70vw]
          sm:bottom-[55%] sm:left-8 sm:max-w-[65vw]
          md:bottom-[40%] md:left-10 md:max-w-[42vw]
          lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-12 lg:max-w-[40vw]
          xl:left-14 xl:max-w-[38vw]
          2xl:left-20 2xl:max-w-[34vw]
        ">
          <h3
            key={`h-${activeIndex}`}
            className={`${quattrocento.className} animate-fadeSlideUp font-bold leading-[1.15] text-white
              text-[18px] sm:text-[22px] md:text-[27px] lg:text-[32px] xl:text-[36px] xl:leading-[1.1] 2xl:text-[42px]
            `}
          >
            {activeSlide.headline}
          </h3>
          <p
            key={`p-${activeIndex}`}
            className={`${lato.className} animate-fadeSlideUp mt-1.5 leading-snug text-white/80
              text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]
            `}
            style={{ animationDelay: "80ms" }}
          >
            {activeSlide.subtext}
          </p>
        </div>

        {/* ── KEEP SCROLLING HINT — hidden on small screens ── */}
        <div className={`${lato.className}
          hidden md:block
          absolute bottom-5 left-1/2 z-50 -translate-x-1/2
          text-[10px] tracking-[0.22em] uppercase text-white/50
          lg:left-12 lg:translate-x-0 xl:left-14 2xl:left-20
        `}>
          &#123; Keep Scrolling &#125;
        </div>

        {/* ── FLOATING INFO CARD ── */}
        {/* Mobile: compact card anchored bottom-right */}
        {/* lg+: vertically centred on the right */}
        <div className="absolute z-50
          bottom-4 left-1/2 -translate-x-1/2 w-[min(260px,80vw)]
          sm:bottom-6 sm:w-[min(290px,75vw)]
          md:left-auto md:translate-x-0 md:right-8 md:w-[min(310px,38vw)]
          lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-10 lg:w-[min(360px,34vw)]
          xl:right-[min(80px,6vw)] xl:w-[min(380px,32vw)]
          2xl:right-[min(100px,7vw)]
        ">
          <div className="flex flex-col rounded-[12px] bg-[#F4F4F4] shadow-2xl
            gap-2 px-3 py-3
            sm:gap-3 sm:px-4 sm:py-4
            md:gap-3 md:rounded-[14px] md:px-5 md:py-6
            lg:gap-4 lg:px-6 lg:py-8
            xl:px-8 xl:py-[52px]
          ">

            {/* Counter */}
            <p className={`${lato.className} text-center font-normal leading-none text-[#2F2F2F]
              text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px]
            `}>
              {String(activeIndex + 1).padStart(2, "0")} — {String(showcaseSlides.length).padStart(2, "0")}
            </p>

            {/* Project name */}
            <h4 className={`${quattrocento.className} text-center font-normal uppercase tracking-widest leading-[1.1] text-[#1A1A1A]
              text-[14px] sm:text-[16px] md:text-[17px] lg:text-[19px] xl:text-[21px] 2xl:text-[24px]
            `}>
              {activeSlide.projectName}
            </h4>

            {/* Thumbnail */}
            <div className="relative w-full overflow-hidden rounded-[6px]
              h-[100px] sm:h-[120px] md:h-[135px] lg:h-[155px] xl:h-[175px]
            ">
              {showcaseSlides.map((slide, index) => (
                <div
                  key={`thumb-${slide.id}`}
                  ref={(el) => { thumbLayersRef.current[index] = el; }}
                  className="absolute inset-0 will-change-transform"
                  style={{ zIndex: index + 1 }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.projectName}
                    fill
                    className="object-cover"
                    quality={80}
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 310px, 380px"
                  />
                </div>
              ))}
            </div>

            {/* Description — hidden on mobile to keep card compact; shown md+ */}
            <p className={`${lato.className} hidden md:block text-center leading-[1.55] text-[#555555]
              text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]
            `}>
              {activeSlide.description}
            </p>

            {/* Arrow button */}
            <button
              type="button"
              className="group mx-auto flex items-center justify-center rounded-full
                border border-[#8C8C8C] transition-all duration-300
                hover:border-[#111] hover:bg-[#111]
                h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-11 lg:w-11 xl:h-[48px] xl:w-[48px]
              "
              aria-label="Open project"
            >
              <Image
                src="/assets/diagonal_arrow.png"
                alt=""
                width={18}
                height={18}
                className="transition-all duration-300 group-hover:invert
                  h-[11px] w-[11px] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px] xl:h-[18px] xl:w-[18px]
                "
              />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>
    </section>
  );
}
