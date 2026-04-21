"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../common/useScrollReveal";

const PROJECTS = [
  {
    id: "eternia",
    title: "Eternia",
    location: "Tech Zone IV, Greater Noida (W)",
    description:
      "Experience luxury 3 & 4 BHK apartments at Eternia, with world-class amenities. Luxury & convenience at your best!",
    videoEmbedUrl: "https://www.youtube.com/embed/sibHed6fWig?si=O6OJiRHAJknmvd-j",
    image: "/assets/eternia.jpg",
    imageAlt: "Eternia residences",
    url: "https://eternia.greatvaluerealty.com/",
  },
  {
    id: "highlife",
    title: "HighLife",
    location: "Dream Valley Tech Zone IV, Greater Noida (W)",
    description:
      "Enjoy spacious 1 & 2 BHK studio apartments with modern amenities at HighLife, located near business hubs.",
    videoEmbedUrl: "https://www.youtube.com/embed/sdaU4DYqOOw?si=LxXT_zrtDvSaXN21",
    image: "/assets/highlife.jpg",
    imageAlt: "HighLife residences",
    url: "https://highlife.greatvaluerealty.com/",
  },
  {
    id: "forest-walk",
    title: "Forest Walk",
    location: "NH-24, Eastern Peripheral Expressway, Ghaziabad",
    description:
      "Enjoy a gated community lifestyle with luxury and nature at Forest Walk. Connects you with serenity and nature both!",
    videoSrc: "/assets/theforestwalk.mp4",
    image: "/assets/projectforestwalk.png",
    imageAlt: "Forest Walk",
    url: "https://theforestwalk.com/",
  },
];

function ProjectRow({
  title,
  location,
  description,
  image,
  imageAlt,
  videoEmbedUrl,
  videoSrc,
  url,
}) {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-w-0 bg-white "
    >
      <div className="relative z-10 w-full px-4  pt-10 sm:px-6 sm:pt-12 md:px-8  md:pt-12 lg:px-10  lg:pt-14 xl:px-12 xl:pt-16 2xl:px-16 ">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
        <div
          className="mx-auto mb-10 w-full border-t border-[#111111] sm:mb-12"
          aria-hidden
        />
        <div className="mx-auto grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-span-5 xl:col-span-4">
            <h2
              data-scroll-reveal
              className="font-quattrocento w-full max-w-[480px] text-[28px] font-normal uppercase leading-[46px] tracking-normal text-[#111111] md:max-w-none md:text-[36px]"
            >
              {title}
            </h2>
            <p
              data-scroll-reveal
              className="font-quattrocento mt-2 max-w-[400px] text-[18px] font-normal uppercase leading-[25px] tracking-normal text-[#111111] sm:mt-3 lg:leading-normal xl:leading-[25px]"
            >
              {location}
            </p>
            <p
              data-scroll-reveal
              className="font-lato mt-3 max-w-[480px] text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099] md:mt-3"
            >
              {description}
            </p>
            {title === "Eternia" ? (
              <ul className="mt-6 max-w-[520px] list-disc space-y-2 pl-5 text-left marker:text-[#00000099]">
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Prime area location on a 130m road, opening onto green belt
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                6 acre gated community with luxury amenities.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Vastu compliant construction, 4 lifts per tower.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Near schools, hospitals, malls, & everyday amenities for convenience.
                </li>
              </ul>
            ) : null}
            {title === "HighLife" ? (
              <ul className="mt-6 max-w-[520px] list-disc space-y-2 pl-5 text-left marker:text-[#00000099]">
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Earthquake-resistant RCC frame structure for superior safety and stability.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Well connected through Noida-Greater Noida expressway.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Great investment potential due to increased connectivity & growth in demand.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Exclusive integrated commercial spaces.
                </li>
              </ul>
            ) : null}
            {title === "Forest Walk" ? (
              <ul className="mt-6 max-w-[520px] list-disc space-y-2 pl-5 text-left marker:text-[#00000099]">
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Luxury villas set in a nature-like environment.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Landscaped walking tracks, water features, and theme forests.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Good connectivity to NH-24, Delhi, Noida, and proposed metro.
                </li>
                <li className="font-lato text-[15px] md:text-[16px] leading-[22px] text-[#00000099]">
                Quality construction & finishes for comfort and durability over time.
                </li>
              </ul>
            ) : null}
            <a
              data-scroll-reveal
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mx-auto mt-3 inline-flex h-11 cursor-pointer items-center overflow-hidden rounded-full border border-[#111111] bg-transparent px-5 text-[14px] font-semibold capitalize leading-[100%] tracking-normal sm:mt-6 sm:h-12 sm:pr-3 sm:pl-6 md:mx-0"
            >
              <span
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#111111] transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden
              />
              <span className="relative z-10 inline-flex items-center gap-2.5 text-[#333333] transition-colors duration-300 group-hover:text-white">
                Download Brochure
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current bg-white transition-[background,border-color] group-hover:border-white group-hover:bg-transparent">
                  <Image
                    src="/assets/diagonal_icon.svg"
                    alt="Arrow icon"
                    title="Arrow icon"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
                    aria-hidden
                  />
                </span>
              </span>
            </a>
          </div>

          <div
            className="relative w-full overflow-hidden lg:col-span-7 xl:col-span-8"
          >
            <div
              data-scroll-reveal-img
              className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]"
            >
              {videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  title={`${title} video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full cursor-pointer border-0 object-cover pointer-events-none"
                />
              ) : videoSrc ? (
                <video
                  src={videoSrc}
                  title={`${title} video`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full cursor-pointer object-cover pointer-events-none"
                />
              ) : (
                <Image
                  src={image}
                  alt={imageAlt}
                  title={imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1279px) 58vw, 66vw"
                />
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
export function ProjectSection() {
  return (
    <>
      {PROJECTS.map((p) => (
        <ProjectRow
          key={p.id}
          title={p.title}
          location={p.location}
          description={p.description}
          image={p.image}
          imageAlt={p.imageAlt}
          videoEmbedUrl={p.videoEmbedUrl}
          videoSrc={p.videoSrc}
          url={p.url}
        />
      ))}
    </>
  );
}
