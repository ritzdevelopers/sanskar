"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavOverlay } from "../common/NavOverlay";
import { scrollAboutUsToTopIfSamePage } from "../common/aboutNavigation";

const OFFICES = [
  {
    name: "Eternia Office",
    address:
      "3, Plot No. GH-09, Greater Noida W Rd, Techzone 4, Amrapali Leisure Valley, Greater Noida, Uttar Pradesh 201318",
  },
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
            className={`w-full px-4 transition-all duration-300 ease-out sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ${isScrolled
                ? "pt-[max(8px,env(safe-area-inset-top))] pb-2 sm:pt-2.5 sm:pb-2 md:pt-3 md:pb-2.5 lg:pt-3 lg:pb-2.5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                : "pt-[max(14px,env(safe-area-inset-top))] pb-3 sm:pt-4 sm:pb-3.5 md:pt-5 md:pb-4 lg:pt-5 lg:pb-4 bg-transparent"
              }`}
          >
            <nav
              className={`mx-auto flex w-full max-w-[1480px] items-center justify-between gap-3 transition-all duration-300 ease-out xl:max-w-[1520px] ${isScrolled
                  ? "min-h-[40px] sm:min-h-[42px] md:min-h-[44px]"
                  : "min-h-[48px] sm:min-h-[52px] md:min-h-[56px]"
                }`}
            >
              <Link
                href="/"
                className="flex min-w-0 shrink cursor-pointer items-center py-0.5"
              >
                <Image
                  src="/assets/sanskar_logo.png"
                  alt="Sanskar Realty logo"
                  width={153}
                  height={50}
                  priority
                  quality={100}
                  className={`w-auto object-contain transition-all duration-300 ease-out ${isScrolled
                      ? "h-8 max-w-[104px] sm:h-9 sm:max-w-[122px] md:h-9 md:max-w-[132px] lg:h-[42px] lg:max-w-[136px] brightness-0"
                      : "h-9 max-w-[120px] sm:h-10 sm:max-w-[140px] md:h-11 md:max-w-[153px] lg:h-[50px]"
                    }`}
                />
              </Link>
              <div className="flex shrink-0 items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10">
                <div className="hidden md:block">
                  <Link
                    href="/about-us"
                    onClick={() => scrollAboutUsToTopIfSamePage()}
                    className={`group relative text-center text-sm font-medium leading-7 transition-colors duration-300 md:text-[15px] lg:text-[16px] cursor-pointer ${isScrolled ? "text-black" : "text-white"
                      }`}
                  >
                    Our Story
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#F5AC00] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <Link
                    href="/project"
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
              <h1 className="text-center font-quattrocento text-[24px] md:text-[36px] font-normal leading-[100%] tracking-normal text-[#ffffff] md:text-left">
                Contact Us
              </h1>
              <p className="mx-auto mt-6 max-w-[726px] text-center font-lato text-[16px] font-normal leading-[28px] tracking-normal text-[#ffffff] md:mx-0 md:text-left xl:max-w-[550px]">
                For any inquiries, information requests, or partnership opportunities, please feel free to reach out to us. We are committed to providing prompt and thorough assistance, ensuring a smooth and hassle-free experience.
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
              <h2 className="text-center font-quattrocento text-[16px] font-bold leading-[28px] tracking-normal text-[#fff] md:text-left">
               Have Questions? We’re Ready to Assist.
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
          <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 items-stretch justify-items-start gap-0 xl:max-w-[1520px]">
            {OFFICES.map((office) => (
              <div
                key={office.name}
                className="flex min-w-0 w-full max-w-md flex-col items-start text-left md:max-w-none md:h-full"
              >
                <h2 className="mt-9 font-quattrocento text-[30px] font-normal capitalize leading-[100%] tracking-normal text-[#FFFFFF] md:mt-14 lg:mt-14 xl:mt-0 xl:text-[36px]">
                  {office.name}
                </h2>
                <p className="mt-1 min-h-0 flex-none font-quattrocento text-[20px] font-normal leading-[34px] tracking-normal text-[#FFFFFF] md:mt-3 md:flex-1 md:text-[18px] lg:mt-5 lg:text-[20px]">
                  {office.address}
                </p>
                <div className="mt-3 flex w-full flex-col space-y-4 md:mt-8 md:flex-none lg:space-y-5">
                  <div className="flex flex-wrap items-center justify-center gap-x-4 font-quattrocento text-[14px] font-normal leading-[100%] tracking-normal text-[#FFFFFF] sm:gap-x-5 justify-start">
                    <span>Monday - Friday</span>
                    <span
                      className="h-[14px] w-px shrink-0 bg-[#FFFFFF]/45 sm:h-4"
                      aria-hidden
                    />
                    <span>10:00 am - 6:30 pm</span>
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex max-w-full items-center gap-[15px] font-quattrocento text-[20px] font-normal leading-[28px] tracking-normal text-[#FFFFFF] transition-opacity hover:opacity-80 md:text-[18px]"
                  >
                    <span>+91 98765 43210</span>
                    <i
                      className="ri-arrow-right-long-line shrink-0 text-[20px] leading-none not-italic"
                      aria-hidden
                    />
                  </a>
                  <a
                    href="mailto:contact@sanskar.in"
                    className="inline-flex max-w-full items-center gap-[15px] font-quattrocento text-[20px] font-normal leading-[28px] tracking-normal text-[#FFFFFF] transition-opacity hover:opacity-80 md:text-[18px]"
                  >
                    <span>contact@sanskar.in</span>
                    <i
                      className="ri-arrow-right-long-line shrink-0 text-[20px] leading-none not-italic"
                      aria-hidden
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}
