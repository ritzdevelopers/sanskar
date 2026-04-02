import Link from "next/link";
import { Poppins, Quattrocento } from "next/font/google";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const SUB_NAV = [
  { label: "Legal Overview", href: "#legal-overview" },
  { label: "NRI Home Loans", href: "#nri-home-loans" },
  { label: "NRIs FAQ", href: "#nri-faq" },
  { label: "Enquire Now", href: "#nri-enquire" },
];

/** Scrolls with the page; sits under fixed nav. Black band, left-aligned. */
export function NriCornerIntro() {
  return (
    <div className="bg-[#000000]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto w-full max-w-[1280px] border-t border-white/20 xl:max-w-[1320px]">
          <div className="pb-10 pt-6 text-left sm:pb-12 sm:pt-8 md:pb-14">
            <h1
              className={`${quattrocento.className} text-[20px] font-bold leading-[28px] tracking-normal text-white`}
            >
              NRI Corner
            </h1>
            <nav
              className={`${poppins.className} mt-4 flex flex-wrap items-center justify-start gap-x-10 gap-y-4 sm:mt-5 sm:gap-x-14 md:gap-x-16 lg:gap-x-20`}
              aria-label="NRI Corner sections"
            >
              {SUB_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-left text-[15px] font-medium leading-[28px] tracking-normal text-white transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
