"use client";

import React, { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

export function OverviewSection() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-w-0 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at center,rgb(237, 232, 232) 1.5px, transparent 1.51px)",
        backgroundSize: "30px 30px",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-[72px] xl:px-12 2xl:px-16 ">
        <div className="mx-auto w-full max-w-[1280px] text-center sm:text-left xl:max-w-[1320px] xl:pl-[100px]">
          <p
            data-scroll-reveal
            className="font-lato text-[18px] font-normal uppercase leading-[100%] tracking-[0.05em] text-[#111111]"
          >
            PROJECTS
          </p>
          <h2
            data-scroll-reveal
            className="font-quattrocento mx-auto mt-5 max-w-[1100px] text-[24px] font-normal uppercase sm:leading-normal leading-[35px] tracking-normal text-[#111111] sm:mx-0 sm:mt-6 sm:text-[36px] md:leading-[46px]"
          >
            Innovation in Every Detail A Collection of Our Best Creations
          </h2>
          <p
            data-scroll-reveal
            className="font-lato mx-auto mt-3 max-w-[900px] text-[16px] font-normal leading-normal tracking-normal text-[#00000099] sm:mx-0 sm:mt-6 md:mt-6 md:leading-[30px]"
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
