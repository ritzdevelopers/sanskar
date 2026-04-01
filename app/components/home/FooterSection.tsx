"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  useScrollReveal(footerRef, { stagger: 0.06, duration: 0.65 });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: "radial-gradient(150% 150% at 0% 0%, #FEFCF8 0%, #F5F5F5 100%)"
      }}
    >
      <div
        className="pointer-events-none absolute left-[-120px] top-[-180px] z-0 h-[878px] w-[878px] rounded-[878px]"
        style={{
          background: "#FFF9E4",
          filter: "blur(400px)",
        }}
      />

      {/* Top Section — same shell as Hero header: max-w-[1500px] → padding → max-w-[1280px]/[1320px] */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
          <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-x-8 md:gap-y-10 lg:flex-nowrap lg:items-center lg:gap-8">

          {/* Left: Text and Contact */}
          <div className="flex flex-col items-center gap-8 text-center sm:gap-10 md:w-[min(100%,calc(50%-1rem))] md:items-center lg:w-1/3 lg:items-start lg:gap-12 lg:text-left">
            <h2
              data-scroll-reveal
              className="font-quattrocento text-[28px] font-normal uppercase leading-[1.2] text-[#1A1A1A] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[42px]"
            >
              Our Emails Are Crafted With
              <br />
              Highest Standards!


            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:flex-row lg:justify-start">
                <span data-scroll-reveal-pop className="inline-flex shrink-0">
                  <Image
                    src="/assets/Frame 105725 (1).svg"
                    alt="Phone"
                    width={59}
                    height={59}
                  />
                </span>
                <span data-scroll-reveal className="font-lato text-[15px] text-[#555555] sm:text-[16px] md:text-[18px]">
                  +91-011 1111 2222
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:flex-row lg:justify-start">
                <span data-scroll-reveal-pop className="inline-flex shrink-0">
                  <Image
                    src="/assets/Frame 105725 (2).svg"
                    alt="Email"
                    width={59}
                    height={59}
                  />
                </span>
                <span data-scroll-reveal className="font-lato text-[15px] text-[#555555] sm:text-[16px] md:text-[18px] break-all sm:break-normal">
                  info@sanskarrealty.co.in
                </span>
              </div>
            </div>
          </div>

          {/* Middle: Form */}
          <div className="flex w-full flex-col gap-4 md:w-[min(100%,calc(50%-1rem))] lg:w-[35.5%]">
            <input
              data-scroll-reveal
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="w-full border border-[#E5E5E5] bg-white px-4 py-4 font-lato text-[14px] text-[#1A1A1A] outline-none focus:border-[#1A1A1A]"
            />
            <button
              data-scroll-reveal
              type="button"
              className="w-full bg-[#111111] py-4 font-lato text-[16px] text-white transition-colors hover:bg-[#333333]"
            >
              Submit
            </button>
          </div>

          {/* Right: Image — full width row on tablet, third column on desktop */}
          <div className="w-full md:basis-full md:order-3 lg:order-none lg:w-[35%] lg:basis-auto">
            <div data-scroll-reveal-img className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/assets/footer.png"
                alt="Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-[#EAEAEA]"></div>

      {/* Bottom Section */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 xl:px-12 2xl:px-16">
        <div className="relative mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
        {/* WhatsApp Icon positioned absolutely at bottom left of the section */}
        <a
          data-scroll-reveal-pop
          href="https://wa.me/9101111112222"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden absolute -bottom-[-12px] left-1/2 -translate-x-1/2 lg:-left-2 lg:translate-x-0 transition-transform hover:scale-110"
        >
          <Image
            src="/assets/whatsapp 1.svg"
            alt="WhatsApp"
            width={46}
            height={46}
          />
        </a>

        <div className="grid grid-cols-1 justify-items-center gap-10 text-center sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:flex lg:flex-row lg:flex-wrap lg:justify-between lg:gap-12 lg:text-left">

          {/* Column 1: About */}
          <div className="flex w-full max-w-md flex-col items-center gap-6 text-center sm:col-span-2 lg:col-span-1 lg:w-[23%] lg:max-w-none lg:items-start lg:text-left">
            <h3 data-scroll-reveal className="font-quattrocento text-[28px] font-bold text-[#1A1A1A]">
              About Sanskar
            </h3>
            <p
              data-scroll-reveal
              className="font-lato text-[14px] leading-[24px] text-[#666666] max-w-[min(100%,380px)] lg:max-w-[300px]"
            >
              At Sanskar Realty, we believe that every home is more than just four walls—it is a foundation for dreams, growth, and togetherness. With a commitment to integrity, trust, and innovation, we have been shaping inspiring living spaces that bring comfort, convenience, and value to our customers. Guided by our core values of transparency and quality.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <h4 data-scroll-reveal className="font-quattrocento text-[18px] uppercase text-[#1A1A1A]">
                FOLLOW US ON
              </h4>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start lg:text-left">
                <Link
                  data-scroll-reveal-pop
                  href="#"
                  className="inline-flex transition-transform hover:scale-110"
                >
                  <Image src="/assets/Frame 105725.svg" alt="Facebook" width={35} height={35} />
                </Link>
                <Link
                  data-scroll-reveal-pop
                  href="#"
                  className="inline-flex transition-transform hover:scale-110"
                >
                  <Image src="/assets/Frame 105726.svg" alt="X" width={35} height={35} />
                </Link>
                <Link
                  data-scroll-reveal-pop
                  href="#"
                  className="inline-flex transition-transform hover:scale-110"
                >
                  <Image src="/assets/Frame 105727.svg" alt="LinkedIn" width={35} height={35} />
                </Link>
                <Link
                  data-scroll-reveal-pop
                  href="#"
                  className="inline-flex transition-transform hover:scale-110"
                >
                  <Image src="/assets/Frame 105728.svg" alt="Instagram" width={35} height={35} />
                </Link>
                <Link
                  data-scroll-reveal-pop
                  href="#"
                  className="inline-flex transition-transform hover:scale-110"
                >
                  <Image src="/assets/Frame 105729.svg" alt="YouTube" width={35} height={35} />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Work With Us */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Link
              data-scroll-reveal
              href="#"
              className="font-quattrocento text-[18px] font-bold uppercase text-[#1A1A1A] hover:underline"
            >
              WORK WITH US
            </Link>
            <Link
              data-scroll-reveal
              href="#"
              className="font-quattrocento text-[18px] font-bold uppercase text-[#1A1A1A] hover:underline"
            >
              ENQUIRE NOW
            </Link>
            <Link
              data-scroll-reveal
              href="#"
              className="font-quattrocento text-[18px] font-bold uppercase text-[#1A1A1A] hover:underline"
            >
              SCHEDULE A SITE VISIT
            </Link>
          </div>

          {/* Column 3: Our Profile */}
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <h4
              data-scroll-reveal
              className="mb-2 font-quattrocento text-[18px] font-bold uppercase text-[#1A1A1A]"
            >
              Company
            </h4>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              About Us
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Our Story
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Mission & Vision
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
             Our Profile

            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Leadership
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Awards & Certifications
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
            Careers — Join Us
            </Link>
          </div>

          {/* Column 4: Quick Links */}
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <h4
              data-scroll-reveal
              className="mb-2 font-quattrocento text-[18px] font-bold uppercase text-[#1A1A1A]"
            >
              QUICK LINKS
            </h4>
            <Link data-scroll-reveal href="/project" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Projects
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Media
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Blogs
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Gallery
            </Link>
            <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Our Events
            </Link>
            {/* <Link data-scroll-reveal href="#" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              NRI Corner
            </Link> */}
            <Link data-scroll-reveal href="/contact-us" className="font-lato text-[16px] text-[#666666] hover:text-[#1A1A1A]">
              Contact Us
            </Link>
          </div>

          {/* Column 5: NRI Corner */}
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <h4
              data-scroll-reveal
              className="mb-2 font-quattrocento text-[18px] font-bold uppercase text-[#1A1A1A]"
            >
              NRI CORNER
            </h4>
            <Link data-scroll-reveal href="#" className="font-lato text-[14px] text-[#666666] hover:text-[#1A1A1A]">
              NRI
            </Link>
          </div>

        </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 border-t border-[#EAEAEA] py-5 sm:py-6">
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1280px] text-center xl:max-w-[1320px]">
          <p data-scroll-reveal className="font-lato text-[13px] leading-snug text-[#00000099] sm:text-[14px] md:text-[16px]">
            © 2026 Sanskar Realty.. All rights reserved. Digital media planned by Ritz Media World.
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
