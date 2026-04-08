"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MISSION_VISION_SECTION_ID } from "../common/aboutNavigation";

gsap.registerPlugin(ScrollTrigger);

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function AnimatedNumber({
  end,
  suffix = "",
  duration = 2.5,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          obj.val = 0;
          if (ref.current) ref.current.textContent = "0" + suffix;
          gsap.to(obj, {
            val: end,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent = Math.floor(obj.val) + suffix;
              }
            },
          });
        },
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, el);

    return () => ctx.revert();
  }, [end, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Mission() {
  return (
    <section className="relative isolate w-full min-w-0 overflow-x-hidden">
      {/* Vertical guides: full section height + width (same horizontal padding as content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="hidden h-full min-h-full w-full justify-evenly px-4 sm:px-6 md:flex md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <span className="h-full min-h-[100%] w-[0.5px] shrink-0 bg-[#E5E5E5]" />
          <span className="h-full min-h-[100%] w-[0.5px] shrink-0 bg-[#E5E5E5]" />
          <span className="h-full min-h-[100%] w-[0.5px] shrink-0 bg-[#E5E5E5]" />
          <span className="h-full min-h-[100%] w-[0.5px] shrink-0 bg-[#E5E5E5]" />
          <span className="h-full min-h-[100%] w-[0.5px] shrink-0 bg-[#E5E5E5]" />
        </div>
      </div>
      {/* Same horizontal shell as AboutHeroSection nav: pad → inner 1280 / xl:1320 */}
      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
      {/* --- Stats Section: even 2×2 gaps on mobile; desktop stagger unchanged --- */}
      <div className="relative mt-14 grid w-full grid-cols-2 gap-x-3 gap-y-10 sm:mt-24 sm:gap-x-6 sm:gap-y-12 md:mt-[50px] lg:mt-[100px] md:gap-y-14 lg:flex lg:max-w-none lg:flex-nowrap lg:items-start lg:justify-between lg:gap-x-0 lg:gap-y-0">
        <div
          data-scroll-reveal
          className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:w-1/4 lg:px-4 lg:pt-0"
        >
          <span
            className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}
          >
            <AnimatedNumber end={17} suffix="+" />
          </span>
          <span
            className={`${lato.className} max-w-[155px] text-[14px] font-normal leading-snug text-[#555555] sm:max-w-[170px] sm:text-[15px] md:text-[16px] lg:max-w-none`}
          >
            Years of Real Estate Excellence
          </span>
        </div>
        <div
          data-scroll-reveal
          className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:mt-16 lg:w-1/4 lg:px-4"
        >
          <span
            className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}
          >
            <AnimatedNumber end={3} />
          </span>
          <span
            className={`${lato.className} max-w-[155px] text-[14px] font-normal leading-snug text-[#555555] sm:max-w-[170px] sm:text-[15px] md:text-[16px] lg:max-w-none`}
          >
            Landmark Residential
            <br className="hidden lg:block" /> Projects
          </span>
        </div>
        <div
          data-scroll-reveal
          className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:mt-32 lg:w-1/4 lg:px-4"
        >
          <span
            className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}
          >
            <AnimatedNumber end={100} suffix="%" />
          </span>
          <span
            className={`${lato.className} max-w-[155px] text-[14px] font-normal leading-snug text-[#555555] sm:max-w-[170px] sm:text-[15px] md:text-[16px] lg:max-w-none`}
          >
            RERA Compliant — Zero
            <br className="hidden lg:block" /> Compromise
          </span>
        </div>
        <div
          data-scroll-reveal
          className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:mt-48 lg:w-1/4 lg:px-4"
        >
          <span
            className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}
          >
            <AnimatedNumber end={4} />
          </span>
          <span
            className={`${lato.className} text-[14px] font-normal leading-snug text-[#555555] sm:text-[15px] md:text-[16px]`}
          >
            States Covered
          </span>
        </div>
      </div>

      {/* --- Mission & Vision Section --- */}
      <div
        id={MISSION_VISION_SECTION_ID}
        className="relative mb-10 mt-14 flex w-full max-w-full scroll-mt-[88px] flex-col items-center gap-12 sm:mt-16 sm:gap-14 md:mt-20 lg:mt-24 lg:flex-row lg:items-stretch lg:gap-6 xl:gap-[90px]"
      >
        <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-full flex-col gap-10 sm:gap-12 lg:mx-0 lg:flex-1">
          <div
            data-scroll-reveal
            className="flex h-auto w-full max-w-full flex-col justify-center border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:p-8 md:p-10 lg:min-h-[280px] xl:h-[316px] xl:w-[555px] xl:max-w-none xl:shrink-0"
          >
            <span
              className={`${lato.className} mb-3 block text-[15px] font-medium text-[#111111] sm:mb-4 md:text-[16px]`}
            >
              Our Mission
            </span>
            <h2
              className={`${quattrocento.className} mb-4 text-[22px] font-normal uppercase leading-[1.3] text-[#111111] sm:mb-5 sm:text-[24px] md:text-[28px] lg:mb-5 lg:text-[32px]`}
            >
              BUILDING A LEGACY OF EXCELLENCE
            </h2>
            <p
              className={`${lato.className} text-[15px] leading-[1.75] text-[#666666] md:text-[16px] md:leading-[1.8]`}
            >
              To deliver exceptional living spaces with a blend of luxury,
              comfort and sustainable design. Our organization builds residential
              and commercial properties which deliver enduring worth through
              innovative solutions that meet customer needs while setting new
              standards in the real estate industry.
            </p>
          </div>

          <div
            data-scroll-reveal
            className="flex h-auto w-full flex-col justify-center border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:-translate-y-[10px] hover:shadow-[0px_4px_20px_rgba(0,0,0,0.08)] sm:p-8 md:p-10 lg:h-[316px] lg:w-[555px]"
          >
            <span
              className={`${lato.className} mb-3 block text-[15px] font-medium text-[#111111] sm:mb-4 md:text-[16px]`}
            >
              Our Vision
            </span>
            <h2
              className={`${quattrocento.className} mb-4 text-[22px] font-normal uppercase leading-[1.3] text-[#111111] sm:mb-5 sm:text-[24px] md:text-[28px] lg:mb-5 lg:text-[32px]`}
            >
              REDEFINING LIVING, INSPIRING FUTURES
            </h2>
            <p
              className={`${lato.className} text-[15px] leading-[1.75] text-[#666666] md:text-[16px] md:leading-[1.8]`}
            >
              We aim to be a trusted leader and reliable real estate company
              creating vibrant communities and modern living spaces for better
              customer lifestyles. Our goal is to expand across NCR region and
              beyond, providing premium residential and commercial properties
              that are quality-driven and timeless.
            </p>
          </div>
        </div>

        <div
          data-scroll-reveal
          className="group relative aspect-[593/436] w-full max-w-[593px] overflow-hidden lg:mx-0 lg:min-w-0 lg:flex-1 lg:self-start lg:max-w-none xl:self-center xl:h-[436.51px] xl:w-[593.26px] xl:shrink-0 xl:aspect-auto"
        >
          <Image
            src="/assets/mission.png"
            alt="Mission & Vision"
            fill
            className="object-cover object-center transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-[5px]"
          />
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}
