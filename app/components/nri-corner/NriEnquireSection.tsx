"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const inputClass = `w-full border-0 border-b border-white/40 bg-transparent py-2.5 font-normal outline-none transition-colors focus:border-white ${lato.className} text-[14px] leading-[100%] text-white placeholder:font-normal placeholder:text-[14px] placeholder:leading-[100%] placeholder:text-[#FFFFFF66]`;

const textareaClass = `w-full border-0 border-b border-white/40 bg-transparent py-2 font-normal outline-none transition-colors focus:border-white ${lato.className} min-h-[72px] resize-y text-[14px] leading-[150%] text-white placeholder:text-[14px] placeholder:leading-[100%] placeholder:text-[#FFFFFF66]`;

export function NriEnquireSection() {
  return (
    <section
      id="nri-enquire"
      className="w-full scroll-mt-28 bg-white py-12 sm:scroll-mt-32 md:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-start lg:gap-25 xl:max-w-[1320px]">
          <div className="flex w-full min-w-0 max-w-[634px] flex-col lg:w-[634px]">
            <p
              className={`${lato.className} text-[16px] font-normal leading-[28px] tracking-normal text-[#111111] sm:text-[17px] md:leading-[30px]`}
            >
              At Sanskar Realty, we make it easy for NRIs to invest in property.
              We guide you through all the legal procedures, payment options, and
              documentation. Contact us now to start your property investment in
              India!
            </p>
            <div className="relative mt-8 h-[min(444px,70vw)] w-full max-w-[634px] overflow-hidden sm:mt-10 lg:mt-10 lg:h-[444px] lg:w-[634px]">
              <Image
                src="/assets/home_decor.png"
                alt="Modern interior living space"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) 100vw, 634px"
              />
            </div>
          </div>

          <div className="box-border flex w-full max-w-[499px] shrink-0 flex-col gap-[36px] bg-black p-[20px] lg:min-h-[577px] lg:w-[499px]">
            <h2
              className={`${quattrocento.className} m-0 text-[36px] font-normal leading-[28px] tracking-normal text-white`}
            >
              Enquire Now
            </h2>
            <form
              className="flex w-full flex-col gap-[36px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex w-full flex-col">
                <label
                  htmlFor="nri-enquire-name"
                  className={`${lato.className} mb-1 block text-[14px] font-normal leading-[100%] tracking-normal text-[#FFFFFF66]`}
                >
                  Enter Your Name
                </label>
                <input
                  id="nri-enquire-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>
              <div className="flex w-full flex-col">
                <label
                  htmlFor="nri-enquire-email"
                  className={`${lato.className} mb-1 block text-[14px] font-normal leading-[100%] tracking-normal text-[#FFFFFF66]`}
                >
                  Enter Your Email
                </label>
                <input
                  id="nri-enquire-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
              <div className="flex w-full flex-col">
                <label
                  htmlFor="nri-enquire-phone"
                  className={`${lato.className} mb-1 block text-[14px] font-normal leading-[100%] tracking-normal text-[#FFFFFF66]`}
                >
                  Enter Your Phone Number
                </label>
                <input
                  id="nri-enquire-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={inputClass}
                />
              </div>
              <div className="flex w-full flex-col">
                <label
                  htmlFor="nri-enquire-message"
                  className={`${lato.className} mb-1 block text-[14px] font-normal leading-[100%] tracking-normal text-[#FFFFFF66]`}
                >
                  Message
                </label>
                <textarea
                  id="nri-enquire-message"
                  name="message"
                  rows={3}
                  className={textareaClass}
                />
              </div>
              <button
                type="submit"
                className={`${lato.className} w-full shrink-0 rounded-full border-0 bg-[#F5AC00] px-6 py-3.5 text-center text-[16px] font-semibold leading-normal text-white transition-opacity hover:opacity-95 sm:py-4`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
