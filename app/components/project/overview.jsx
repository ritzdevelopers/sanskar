"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

export function OverviewSection() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-w-0 overflow-hidden bg-[#FAFAFA]"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #D0D0D0 0.75px, transparent 0.76px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-[72px] xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] text-center xl:max-w-[1320px]">
          <p
            data-scroll-reveal
            className="font-lato text-[18px] font-normal uppercase leading-[100%] tracking-[0.05em] text-[#111111]"
          >
            PROJECTS
          </p>
          <h2
            data-scroll-reveal
            className="font-quattrocento mx-auto mt-5 max-w-[1100px] text-[24px] font-normal uppercase leading-[28px] tracking-normal text-[#111111] sm:mt-6 sm:text-[36px] md:leading-[46px]"
          >
            Innovation in Every Detail A Collection of Our Best Creations
          </h2>
          <p
            data-scroll-reveal
            className="font-lato mx-auto mt-3 md:mt-6 max-w-[1040px] text-[16px] font-normal leading-normal md:leading-[30px] tracking-normal text-[#00000099] sm:mt-6"
          >
            Experience the epitome of luxury living with Ambience Group.
            Redefining residential development in India, we craft magnificent
            edifices, delivering on our promises of quality and timeliness. Our
            projects feature world-class brands, exceptional interiors, top-notch
            facilities, and premium amenities, transforming the way you live.
          </p>
        </div>
      </div>
    </section>
  );
}
