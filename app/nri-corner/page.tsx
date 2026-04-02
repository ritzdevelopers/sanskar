import type { ReactNode } from "react";
import { Poppins, Lato, Quattrocento } from "next/font/google";
import { FooterSection } from "../components/home/FooterSection";
import { NriCornerHeader } from "../components/nri-corner/NriCornerHeader";
import { NriCornerIntro } from "../components/nri-corner/NriCornerIntro";
import { LegalInformationSection } from "../components/nri-corner/LegalInformationSection";
import { NriLegalConsiderationsSection } from "../components/nri-corner/NriLegalConsiderationsSection";
import { NriHomeLoansSection } from "../components/nri-corner/NriHomeLoansSection";
import { NriFaqSection } from "../components/nri-corner/NriFaqSection";
import { NriEnquireSection } from "../components/nri-corner/NriEnquireSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { PressReleasesSection } from "../components/home/PressReleasesSection";
import { FindDreamHomeSection } from "../components/about/FindDreamHomeSection";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quattrocento",
});

/** Clears fixed nav; intro + legal scroll underneath the bar (z-50). */
function NriContentTopPad({ children }: { children: ReactNode }) {
  return (
    <div className="pt-[max(5.75rem,calc(3.5rem+env(safe-area-inset-top)))] sm:pt-[6.25rem] md:pt-[6.75rem]">
      {children}
    </div>
  );
}

export default function NriCornerPage() {
  return (
    <main
      className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden bg-[#000000]`}
    >
      <NriCornerHeader />
      <NriContentTopPad>
        <NriCornerIntro />
        <LegalInformationSection />
        <NriLegalConsiderationsSection />
        <NriHomeLoansSection />
        <NriFaqSection />
        <NriEnquireSection />
        <FindDreamHomeSection />
      <TestimonialsSection />
      <PressReleasesSection />
      </NriContentTopPad>
      <FooterSection />
    </main>
  );
}
