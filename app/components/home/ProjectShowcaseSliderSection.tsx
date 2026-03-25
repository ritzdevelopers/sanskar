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
    url: "https://eternia.greatvaluerealty.com/",
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
    url: "https://highlife.greatvaluerealty.com/",
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
    image: "/assets/forest_walk 2.png",
    url: "https://theforestwalk.com/",
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
    const scrollPerSlide = () => sticky.offsetHeight || window.innerHeight;

    // BG: vertical reveal (incoming slide moves up); force3D + backface-hidden = cleaner edges while scrolling
    bgLayersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { yPercent: i === 0 ? 0 : 100, force3D: true });
    });

    thumbLayersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { yPercent: i === 0 ? 0 : 100, force3D: true });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${scrollPerSlide() * (totalSlides - 1)}`,
          pin: sticky,
          pinSpacing: true,
          scrub: 0.65,
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
        const slideEase = { ease: "none" as const, duration: 1, force3D: true };

        tl.fromTo(
          bgLayersRef.current[i],
          { yPercent: 100 },
          { yPercent: 0, ...slideEase },
          step
        );
        tl.fromTo(
          thumbLayersRef.current[i],
          { yPercent: 100 },
          { yPercent: 0, ...slideEase },
          step
        );
      }
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* Pinned layers + full-bleed images steal touches on mobile; allow vertical page scroll everywhere on the viewport */
    const syncTouchAction = () => {
      const el = stickyRef.current;
      if (!el) return;
      if (window.matchMedia("(max-width: 767px)").matches) {
        el.style.setProperty("touch-action", "pan-y pinch-zoom", "important");
      } else {
        el.style.removeProperty("touch-action");
      }
    };
    ScrollTrigger.addEventListener("refresh", syncTouchAction);
    requestAnimationFrame(syncTouchAction);

    return () => {
      ScrollTrigger.removeEventListener("refresh", syncTouchAction);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const activeSlide = showcaseSlides[activeIndex];

  return (
    <section
      aria-labelledby="project-showcase-heading"
      ref={wrapperRef}
      className="bg-white"
      style={{ height: `${showcaseSlides.length * 100}dvh` }}
    >
      <h2 id="project-showcase-heading" className="sr-only">Project showcase</h2>
      {/* Sticky viewport pinned by GSAP */}
      <div
        ref={stickyRef}
        className="relative isolate h-[100dvh] min-h-[100dvh] w-full max-w-none overflow-hidden bg-[#f2f2f2] md:bg-black md:mx-auto md:max-w-[1500px]"
      >

        {/* ── STACKED BACKGROUND IMAGES (slide up from bottom, scroll-scrubbed) ── */}
        {showcaseSlides.map((slide, index) => (
          <div
            key={`bg-${slide.id}`}
            ref={(el) => { bgLayersRef.current[index] = el; }}
            className="pointer-events-none absolute inset-0 backface-hidden will-change-transform max-md:[&_img]:pointer-events-none"
            style={{ zIndex: index + 1 }}
          >
            <Image
              src={slide.image}
              alt={slide.projectName}
              fill
              className="object-cover object-center [transform:translateZ(0)]"
              quality={100}
              priority={index === 0}
              sizes="100vw"
              draggable={false}
            />
            {/* Mobile: no full-screen dark wash — only a short scrim at bottom for the card; md+ cinematic gradient */}
            <div
              className="pointer-events-none absolute inset-0 max-md:bg-[linear-gradient(to_top,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.06)_32%,transparent_48%)] md:bg-gradient-to-t md:from-black/70 md:via-black/20 md:to-transparent"
              aria-hidden
            />
          </div>
        ))}

        {/* ── HEADLINE + SUBTEXT ── */}
        {/* Mobile: top center; md+: left column; lg+: vertically centred */}
        <div className="absolute z-40 text-left max-md:pointer-events-none
          max-md:bottom-auto max-md:left-1/2 max-md:right-auto max-md:top-[max(5.25rem,env(safe-area-inset-top,0px)+4.25rem)] max-md:w-[min(92vw,22rem)] max-md:max-w-none max-md:-translate-x-1/2 max-md:px-2 max-md:text-center max-md:drop-shadow-[0_2px_14px_rgba(0,0,0,0.82)]
          sm:max-md:top-[max(5.5rem,env(safe-area-inset-top,0px)+4.5rem)]
          md:top-auto md:translate-x-0 md:text-left md:bottom-[40%] md:left-10 md:max-w-[42vw]
          lg:bottom-auto lg:top-1/2 lg:z-50 lg:-translate-y-1/2 lg:left-12 lg:max-w-[40vw]
          xl:left-14 xl:max-w-[38vw]
          2xl:left-20 2xl:max-w-[34vw]
        ">
          <h3
            key={`h-${activeIndex}`}
            className={`${quattrocento.className} animate-fadeSlideUp font-bold leading-[1.15] text-white
              text-[16px] sm:text-[20px] md:text-[27px] lg:text-[32px] xl:text-[36px] xl:leading-[1.1] 2xl:text-[42px]
            `}
          >
            {activeSlide.headline}
          </h3>
          <p
            key={`p-${activeIndex}`}
            className={`${lato.className} animate-fadeSlideUp mt-1 leading-snug text-white/80
              text-[11px] sm:text-[13px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]
            `}
            style={{ animationDelay: "80ms" }}
          >
            {activeSlide.subtext}
          </p>
        </div>

        {/* ── KEEP SCROLLING HINT — hidden on small screens ── */}
        {/* <div className={`${lato.className}
          hidden md:block
          absolute bottom-5 left-1/2 z-50 -translate-x-1/2
          text-[10px] tracking-[0.22em] uppercase text-white/50
          lg:left-12 lg:translate-x-0 xl:left-14 2xl:left-20
        `}>
          &#123; Keep Scrolling &#125;
        </div> */}

        {/* ── FLOATING INFO CARD ── */}
        {/* Mobile: compact card anchored bottom-right */}
        {/* lg+: vertically centred on the right */}
        <div className="absolute z-50
          inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] w-auto max-w-none
          sm:inset-x-4 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))]
          md:inset-x-auto md:bottom-auto md:left-auto md:right-8 md:top-[calc(50%+1.25rem)] md:w-[min(310px,38vw)] md:-translate-y-1/2
          lg:top-[calc(50%+1.5rem)] lg:right-10 lg:w-[min(360px,34vw)]
          xl:top-[calc(50%+1.75rem)] xl:right-[min(80px,6vw)] xl:w-[min(380px,32vw)]
          2xl:top-[calc(50%+2rem)] 2xl:right-[min(100px,7vw)]
        ">
          <div className="mx-auto flex w-full max-w-[400px] flex-col rounded-[12px] bg-[#F4F4F4] shadow-2xl
            min-h-[min(52dvh,480px)] gap-3 px-4 pb-4 pt-2
            sm:min-h-[min(50dvh,460px)] sm:max-w-[420px] sm:gap-3.5 sm:px-4 sm:pb-5 sm:pt-2.5
            md:mx-0 md:min-h-0 md:max-w-none md:gap-3 md:rounded-[14px] md:px-5 md:py-6
            lg:gap-4 lg:px-6 lg:py-8
            xl:px-8 xl:py-[52px]
          ">

            {/* Counter + title — pinned to top of card on mobile */}
            <div className="flex shrink-0 flex-col items-center gap-1.5 pt-0.5 md:gap-2 md:pt-0">
            <p className={`${lato.className} text-center font-normal leading-none text-[#2F2F2F]
              text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[16px]
            `}>
              {String(activeIndex + 1).padStart(2, "0")} — {String(showcaseSlides.length).padStart(2, "0")}
            </p>

            <h4 className={`${quattrocento.className} text-center font-normal uppercase tracking-wider leading-[1.1] text-[#1A1A1A]
              text-[15px] sm:text-[16px] md:text-[17px] lg:text-[19px] xl:text-[21px] 2xl:text-[24px]
            `}>
              {activeSlide.projectName}
            </h4>
            </div>

            {/* Thumbnail */}
            <div className="relative h-[132px] w-full shrink-0 overflow-hidden rounded-[6px] sm:h-[148px] md:h-[135px] lg:h-[155px] xl:h-[175px] [contain:paint]
            ">
              {showcaseSlides.map((slide, index) => (
                <div
                  key={`thumb-${slide.id}`}
                  ref={(el) => { thumbLayersRef.current[index] = el; }}
                  className="absolute inset-0 backface-hidden will-change-transform"
                  style={{ zIndex: index + 1 }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.projectName}
                    fill
                    className="object-cover object-center [transform:translateZ(0)]"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 310px, 380px"
                  />
                </div>
              ))}
            </div>

            {/* Description — fills remaining card height on mobile */}
            <p className={`${lato.className} flex-1 text-center leading-[1.55] text-[#555555]
              min-h-0 overflow-y-auto overscroll-y-contain text-[11px] sm:text-[12px]
              md:flex-none md:overflow-visible md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]
            `}>
              {activeSlide.description}
            </p>

            {/* Arrow button */}
            <a
              href={activeSlide.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mx-auto mt-auto flex shrink-0 items-center justify-center rounded-full pt-1
                border border-[#8C8C8C] transition-all duration-300
                hover:border-[#111] hover:bg-[#111]
                h-9 w-9 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 xl:h-[48px] xl:w-[48px]
              "
              aria-label={`View ${activeSlide.projectName} project`}
            >
              <Image
                src="/assets/diagonal_icon.svg"
                alt=""
                width={18}
                height={18}
                className="transition-all duration-300 group-hover:invert
                  h-[11px] w-[11px] sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px] xl:h-[18px] xl:w-[18px]
                "
              />
            </a>
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
