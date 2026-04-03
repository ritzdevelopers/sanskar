"use client";

import React from "react";
import Image from "next/image";

const PROJECTS = [
  {
    id: "eternia",
    title: "Eternia",
    location: "Tech Zone IV, Greater Noida (W)",
    description:
      "Experience luxury 3 & 4 BHK apartments at Eternia, with world-class amenities. Luxury & convenience at your best!",
    image: "/assets/eternia.jpg",
    imageAlt: "Eternia residences",
    url: "https://eternia.greatvaluerealty.com/",
  },
  {
    id: "highlife",
    title: "HighLife",
    location: "Dream Valley Tech Zone IV, Greater Noida (W)",
    description:
      "Enjoy spacious 1 & 2 BHK apartments with modern amenities at HighLife, located near business hubs.",
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
  url,
}) {
  return (
    <section
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
              className="font-quattrocento w-full max-w-[480px] text-[28px] font-normal uppercase leading-[46px] tracking-normal text-[#111111] md:max-w-none md:text-[36px]"
            >
              {title}
            </h2>
            <p
              className="font-quattrocento mt-2 max-w-[400px] text-[18px] font-normal uppercase leading-[25px] tracking-normal text-[#111111] sm:mt-3 lg:leading-normal xl:leading-[25px]"
            >
              {location}
            </p>
            <p
              className="font-lato mt-3 max-w-[480px] text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099] md:mt-3"
            >
              {description}
            </p>
            <a
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
                Explore More
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current bg-white transition-[background,border-color] group-hover:border-white group-hover:bg-transparent">
                  <Image
                    src="/assets/diagonal_icon.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
                  />
                </span>
              </span>
            </a>
          </div>

          <div
            className="relative w-full overflow-hidden lg:col-span-7 xl:col-span-8"
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[5/3]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, (max-width: 1279px) 58vw, 66vw"
              />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} project`}
                className="group absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-lg text-[#111111] transition-transform hover:scale-105 sm:right-6 sm:top-6 sm:h-11 sm:w-11 sm:text-xl md:right-8 md:top-8"
              >
                <Image
                  src="/assets/diagonal_icon.svg"
                  alt=""
                  width={15}
                  height={15}
                  className="absolute transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[200%] group-hover:-translate-y-[200%]"
                  aria-hidden="true"
                />
                <Image
                  src="/assets/diagonal_icon.svg"
                  alt=""
                  width={15}
                  height={15}
                  className="absolute -translate-x-[200%] translate-y-[200%] transition-transform duration-[400ms] ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
                  aria-hidden="true"
                />
              </a>
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
          url={p.url}
        />
      ))}
    </>
  );
}
