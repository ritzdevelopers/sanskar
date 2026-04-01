"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavOverlay } from "../common/NavOverlay";

const OFFICES = [
  { name: "Eternia Office" },
  { name: "Highlife Office" },
  { name: "Theforestwalk Office" },
];

export function ContactFormSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#111111]">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto w-full">
          <div
            className={`w-full px-4 pt-[max(14px,env(safe-area-inset-top))] pb-3 transition-all duration-300 sm:px-6 sm:pt-4 sm:pb-3.5 md:px-8 md:pt-5 md:pb-4 lg:px-10 lg:pt-5 lg:pb-4 xl:px-12 2xl:px-16 ${isScrolled ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "bg-transparent"
              }`}
          >
            <nav className="mx-auto flex min-h-[48px] w-full max-w-[1480px] items-center justify-between gap-3 sm:min-h-[52px] md:min-h-[56px] xl:max-w-[1520px]">
              <div
                className="flex min-w-0 shrink cursor-pointer items-center py-0.5"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Image
                  src="/assets/sanskar_logo.png"
                  alt="Sanskar Realty logo"
                  width={153}
                  height={50}
                  priority
                  quality={100}
                  className={`h-9 w-auto max-w-[120px] object-contain transition duration-300 sm:h-10 sm:max-w-[140px] md:h-11 md:max-w-[153px] lg:h-[50px] ${isScrolled ? "brightness-0" : ""
                    }`}
                />
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
                <div className="hidden md:block">
                  <Link
                    href="/about-us"
                    className={`group relative text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] cursor-pointer ${isScrolled ? "text-black" : "text-white"
                      }`}
                  >
                    Our Story
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#F5AC00] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <Link
                    href="/#projects"
                    className={`group relative text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] cursor-pointer ${isScrolled ? "text-black" : "text-white"
                      }`}
                  >
                    Projects
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#F5AC00] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen(true)}
                    className="flex h-8 w-8 items-center justify-center"
                  >
                    <Image
                      src="/assets/hamburger_menu.svg"
                      alt=""
                      width={52}
                      height={52}
                      className={`transition duration-300 ${isScrolled ? "brightness-0" : ""
                        }`}
                    />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full pb-16 pt-[max(7.5rem,calc(4.5rem+env(safe-area-inset-top)))] sm:pb-20 sm:pt-[max(8rem,calc(5rem+env(safe-area-inset-top)))] md:pb-10 lg:pb-6 xl:pb-28 lg:pt-[max(8.5rem,calc(5.25rem+env(safe-area-inset-top)))]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-y-14 xl:max-w-[1520px] lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
        <div className="flex flex-col lg:pr-4">
          <h1 className="text-center font-quattrocento text-[24px] md:text-[86px] font-normal leading-[100%] tracking-normal text-[#ffffff] md:text-left">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-[726px] text-center font-lato text-[16px] font-normal leading-[28px] tracking-normal text-[#ffffff] md:mx-0 md:text-left xl:max-w-[550px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="relative mt-8 w-full overflow-hidden sm:mt-10">
            <Image
              src="/assets/contact-us-chess-image.png"
              alt=""
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="mt-0 md:mt-0  flex w-full flex-col lg:mt-0 xl:mt-7 lg:max-w-[500px] lg:justify-self-start lg:pl-4">
          <h2 className="text-center font-quattrocento text-[16px] font-normal leading-[28px] tracking-normal text-[#fff] md:text-left">
            Chat With Us or Fill out this form :
          </h2>
          <form
            className="mt-0 md:mt-8 flex w-full flex-col gap-9 sm:mt-5 sm:gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              autoComplete="name"
              className="w-full border-0 border-b border-[#DCDCDC] bg-transparent py-2.5 font-lato text-[15px] text-white placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[100%] placeholder:tracking-normal placeholder:text-[#494949] outline-none transition-colors focus:border-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              className="w-full border-0 border-b border-[#DCDCDC] bg-transparent py-2.5 font-lato text-[15px] text-white placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[100%] placeholder:tracking-normal placeholder:text-[#494949] outline-none transition-colors focus:border-white"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter Your Phone Number"
              autoComplete="tel"
              className="w-full border-0 border-b border-[#DCDCDC] bg-transparent py-2.5 font-lato text-[15px] text-white placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[100%] placeholder:tracking-normal placeholder:text-[#494949] outline-none transition-colors focus:border-white"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="min-h-[120px] w-full resize-y border-0 border-b border-[#DCDCDC] bg-transparent py-2.5 font-lato text-[15px] text-white placeholder:font-lato placeholder:text-[14px] placeholder:font-normal placeholder:leading-[100%] placeholder:tracking-normal placeholder:text-[#494949] outline-none transition-colors focus:border-white"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center bg-[#eeeeee] py-3.5 align-middle font-lato text-[16px] font-[500] leading-[24px] tracking-normal text-[#111111] transition-colors hover:bg-white"
            >
              Submit
            </button>
          </form>
        </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#111111] pb-[35px] lg:pb-[75px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 justify-items-center md:grid-cols-2 md:justify-items-stretch xl:grid-cols-3 xl:max-w-[1520px]">
            {OFFICES.map((office) => (
              <div
                key={office.name}
                className="flex min-w-0 w-full flex-col items-center text-center md:items-stretch md:text-left"
              >
                <h2 className="font-quattrocento text-[30px] xl:text-[36px] font-normal capitalize leading-[100%] mt-9 tracking-normal text-[#FFFFFF] md:mt-14 lg:mt-14 xl:mt-0">
                  {office.name}
                </h2>
                <p className="mt-1 lg:mt-5 md:text-[18px] font-quattrocento text-[20px] lg:text-[20px] font-normal leading-[34px] tracking-normal text-[#FFFFFF]">
                  Office No. 302, Galaxy Tower
                  <br />
                  Sector 63, Noida, Uttar Pradesh – 201301
                </p>
                <div className="mt-3 lg:mt-4 flex flex-wrap items-center justify-center gap-x-4 font-quattrocento text-[14px] font-normal leading-[100%] tracking-normal text-[#FFFFFF] sm:gap-x-5 md:justify-start">
                  <span>Monday - Friday</span>
                  <span
                    className="h-[14px] w-px shrink-0 bg-[#FFFFFF]/45 sm:h-4"
                    aria-hidden
                  />
                  <span>10:00 am - 6:30 pm</span>
                </div>
                <a
                  href="tel:+919876543210"
                  className="mx-auto mt-4 lg:mt-5 xl:mt-8 inline-flex max-w-full items-center gap-[15px] font-quattrocento text-[20px] md:text-[18px] font-normal leading-[28px] tracking-normal text-[#FFFFFF] transition-opacity hover:opacity-80 md:mx-0"
                >
                  <span>+91 98765 43210</span>
                  <i
                    className="ri-arrow-right-long-line shrink-0 text-[20px] leading-none not-italic"
                    aria-hidden
                  />
                </a>
                <a
                  href="mailto:contact@sanskar.in"
                  className="mx-auto mt-2 lg:mt-3 xl:mt-6 inline-flex max-w-full items-center gap-[15px] font-quattrocento text-[20px] md:text-[18px] font-normal leading-[28px] tracking-normal text-[#FFFFFF] transition-opacity hover:opacity-80 md:mx-0"
                >
                  <span>contact@sanskar.in</span>
                  <i
                    className="ri-arrow-right-long-line shrink-0 text-[20px] leading-none not-italic"
                    aria-hidden
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}
