"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: "eternia",
    title: "Eternia",
    location: "Tech Zone IV, Greater Noida (W)",
    description:
      "Experience luxury 3 & 4 BHK apartments at Eternia, with world-class amenities. Luxury & convenience at your best!",
    image: "/assets/eternia.jpg",
    imageAlt: "Eternia residences",
    href: "https://eternia.greatvaluerealty.com/",
  },
  {
    id: "highlife",
    title: "HighLife",
    location: "Dream Valley Tech Zone IV, Greater Noida (W)",
    description:
      "Enjoy spacious 1 & 2 BHK apartments with modern amenities at HighLife, located near business hubs.",
    image: "/assets/highlife.jpg",
    imageAlt: "HighLife residences",
    href: "https://highlife.greatvaluerealty.com/",
  },
  {
    id: "forest-walk",
    title: "Forest Walk",
    location: "NH-24, Eastern Peripheral Expressway, Ghaziabad",
    description:
      "Enjoy a gated community lifestyle with luxury and nature at Forest Walk. Connects you with serenity and nature both!",
    image: "/assets/Forest%20Walk.jpg",
    imageAlt: "Forest Walk",
    href: "https://theforestwalk.com/",
  },
];

function ProjectRow({
  title,
  location,
  description,
  image,
  imageAlt,
  href,
}) {
  return (
    <section
      className="relative w-full min-w-0 bg-white "
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4  pt-10 sm:px-6 sm:pt-12 md:px-8  md:pt-12 lg:px-10  lg:pt-14 xl:px-12 xl:pt-16 2xl:px-16 ">
        <div
          className="mx-auto mb-10 w-full max-w-[1280px] border-t border-[#111111] sm:mb-12 xl:max-w-[1320px]"
          aria-hidden
        />
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:max-w-[1320px] xl:gap-14">
          <div className="flex flex-col items-start text-left lg:col-span-5 xl:col-span-4">
            <h2
              className="font-quattrocento text-[36px] font-normal uppercase leading-[46px] tracking-normal text-[#111111]"
            >
              {title}
            </h2>
            <p
              className="font-quattrocento mt-2 text-[18px] lg:leading-normal xl:leading-[100%] font-normal uppercase leading-[100%] tracking-normal text-[#111111] sm:mt-3 max-w-[400px]"
            >
              {location}
            </p>
            <p
              className="font-lato mt-6 max-w-[480px] text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099] sm:mt-6"
            >
              {description}
            </p>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-lato mt-3 inline-flex h-11 items-center gap-2.5 rounded-full border border-[#111111] bg-transparent px-5 text-[14px] font-semibold capitalize leading-[100%] tracking-normal text-[#333333] transition-colors hover:bg-[#111111] hover:text-white sm:mt-6 sm:h-12 sm:px-6"
            >
              Explore More
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#111111] bg-white transition-[background,border-color] group-hover:border-white group-hover:bg-transparent">
                <Image
                  src="/assets/diagonal_icon.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 transition-[filter] group-hover:brightness-0 group-hover:invert"
                />
              </span>
            </Link>
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
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform hover:scale-105 sm:right-4 sm:top-6 sm:h-12 sm:w-12"
                aria-label={`Open ${title} project site`}
              >
                <Image
                  src="/assets/diagonal_icon.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </Link>
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
          href={p.href}
        />
      ))}
    </>
  );
}
