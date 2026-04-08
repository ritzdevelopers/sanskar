import { Poppins, Lato, Quattrocento } from "next/font/google";
import { AboutUsScrollToTop } from "../components/common/AboutUsScrollToTop";
import { FooterSection } from "../components/home/FooterSection";
import { AboutHeroSection } from "../components/about/AboutHeroSection";
import { WhoWeAre } from "../components/about/WhoWeAre";
import { AboutSanskarGroup } from "../components/about/AboutSanskarGroup";
import { OurJourney } from "../components/about/OurJourney";
import { FindDreamHomeSection } from "../components/about/FindDreamHomeSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { PressReleasesSection } from "../components/home/PressReleasesSection";
import { Mission } from "../components/about/Mission";

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

export default function AboutUsPage() {
  return (
    <main className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden`}>
      <AboutUsScrollToTop />
      <AboutHeroSection />

      <AboutSanskarGroup />
      <WhoWeAre />
      <Mission />
      <OurJourney />
      <FindDreamHomeSection />
      <TestimonialsSection />
      <PressReleasesSection />
      <FooterSection />
    </main>
  );
}
