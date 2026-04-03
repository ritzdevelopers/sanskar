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
      <div className="relative z-10 w-full px-4  sm:px-6  md:px-8 lg:px-10 pt-[35px] lg:pt-[70px] xl:px-12 2xl:px-16 ">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <div className="w-full text-center lg:text-left xl:pl-[100px]">
          <p
            data-scroll-reveal
            className="font-lato text-[18px] font-normal uppercase leading-[100%] tracking-[0.05em] text-[#111111]"
          >
            PROJECTS
          </p>
          <h2
            data-scroll-reveal
            className="font-quattrocento mx-auto mt-5 max-w-[1100px] text-[20px] font-normal uppercase leading-[35px] tracking-normal text-[#111111] sm:mt-6 md:text-[36px] leading-normal md:leading-[46px] lg:mx-0"
          >
        Find Your Dream Home with Our Luxury Real Estate Projects
          </h2>
          <p
            data-scroll-reveal
            className="font-lato mx-auto mt-3 max-w-[1000px] text-[16px] font-normal leading-normal tracking-normal text-[#00000099] sm:mt-6 md:mt-6 md:leading-[30px] lg:mx-0"
          >
          At Sanskar Realty, we are redefining residential spaces in India by creating iconic projects that are all about elegance, quality, and innovation. With our projects boasting premium brands, innovative designs, and world-class amenities, elevating your lifestyle to new heights.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
