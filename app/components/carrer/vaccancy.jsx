"use client";

import {
  getLenisInstance,
  LENIS_PROGRAMMATIC_DURATION,
} from "../common/lenisInstance";

/** In-page jump lands on “Start Your Career with Us” (not section top padding). */
const CAREER_FORM_SCROLL_ID = "career-application-heading";

/** Lenis ignores CSS `scroll-margin`; match header `scroll-mt-[100px]`. */
const CAREER_FORM_LENIS_OFFSET_PX = -100;

function scrollToCareerForm() {
  if (typeof document === "undefined") return;
  const el = document.getElementById(CAREER_FORM_SCROLL_ID);
  if (!el) return;
  const lenis = getLenisInstance();
  if (lenis) {
    lenis.scrollTo(el, {
      duration: LENIS_PROGRAMMATIC_DURATION,
      force: true,
      offset: CAREER_FORM_LENIS_OFFSET_PX,
    });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const VACANCIES = [
  {
    title: "Sales Manager",
    description:
      "Driving strategic acquisitions and high-value client relations.",
    meta: "GLOBAL / HYBRID",
  },
  {
    title: "Sales Manager",
    description:
      "Driving strategic acquisitions and high-value client relations.",
    meta: "GLOBAL / HYBRID",
  },
  {
    title: "Sales Manager",
    description:
      "Driving strategic acquisitions and high-value client relations.",
    meta: "GLOBAL / HYBRID",
  },
  {
    title: "Sales Manager",
    description:
      "Driving strategic acquisitions and high-value client relations.",
    meta: "GLOBAL / HYBRID",
  },
];

export default function Vaccancy() {
  return (
    <>
    <section className="w-full border-t border-[#8B8B8B] bg-white">
      {/* Same shell as FooterSection / FindDreamHomeSection alignWithHeader: full-width pad → inner 1480/1520 */}
      <div className="w-full px-4 py-[35px] sm:px-6 md:px-8 lg:px-10 lg:py-[70px] xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
          <h2 className="font-quattrocento text-center text-[20px] font-normal leading-[100%] tracking-normal text-[#111111] md:text-[36px] lg:text-left">
          Apply Here for Jobs
          </h2>
          <p className="font-lato mx-auto mt-3 max-w-[720px] text-center text-[16px] font-light leading-[24px] tracking-normal text-[#00000099] sm:mt-4 lg:mx-0 lg:text-left">
         
          Build your future with a career that challenges and inspires you.

          </p>

          <div className="mt-8 grid grid-cols-1 gap-0 sm:mt-10 lg:grid-cols-2 lg:gap-x-10 xl:gap-x-[130px]">
            {VACANCIES.map((job, index) => (
              <article
                key={index}
                className="border-b border-[#E5E5E5] pt-5 pb-10 sm:pt-6 md:pb-5"
              >
                <a
                  href={`#${CAREER_FORM_SCROLL_ID}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToCareerForm();
                  }}
                  className="group flex flex-col items-start gap-4 text-left no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 md:flex-row md:items-center md:justify-between md:gap-4"
                >
                  <div className="min-w-0 w-full flex-1 md:w-auto">
                    <h3 className="font-quattrocento text-[24px] font-normal leading-[32px] tracking-normal text-[#111111]">
                      {job.title}
                    </h3>
                    <p className="font-lato mt-2 max-w-[400px] text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex w-full shrink-0 items-center gap-2 sm:gap-3 md:w-auto md:justify-end">
                    <span className="font-lato text-left text-[14px] font-light leading-[20px] tracking-normal text-[#44474D] uppercase md:text-right">
                      {job.meta}
                    </span>
                    <i
                      className="ri-arrow-right-line text-[20px] leading-none text-[#44474D] transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
    
    </>
  );
}
