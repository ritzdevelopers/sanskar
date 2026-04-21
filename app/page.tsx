import { Poppins, Lato, Quattrocento } from "next/font/google";
import { OverviewSection } from "./components/home/OverviewSection";
import { ProjectsSection } from "./components/home/ProjectsSection";
import { StorySection } from "./components/home/StorySection";
import { WhyInvestSection } from "./components/home/WhyInvestSection";
import { ProjectShowcaseSliderSection } from "./components/home/ProjectShowcaseSliderSection";
import { LocationAdvantageSection } from "./components/home/LocationAdvantageSection";
import { TestimonialsSection } from "./components/home/TestimonialsSection";
import { PressReleasesSection } from "./components/home/PressReleasesSection";
import { FooterSection } from "./components/home/FooterSection";
import { HomePageWithGateway } from "./components/common/HomePageWithGateway";
import { ProjectShowcaseSliderSection2 } from "./components/home/ProjectShowCaseSliderSection2";
import { FindDreamHomeSection } from "./components/about/FindDreamHomeSection";

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
export const metadata = {
  title: "Sanskar Realty | Luxury Real Estate in Delhi NCR",
  description:
    "Discover Sanskar Realty: Luxury 3 BHK, 4 BHK apartments, and gated villas in Noida Extension, Greater Noida West, Ghaziabad. Vastu-compliant, RERA-approved, high ROI.",
  keywords: [
    "Sanskar Realty",
    "luxury real estate in Delhi NCR",
    "3 BHK apartments in Noida Extension",
    "4 BHK apartments in Noida Extension",
    "studio apartments in Greater Noida West",
    "gated villas in Ghaziabad",
    "Vastu-compliant homes NCR",
    "RERA-approved projects NCR",
    "luxury living in Delhi NCR",
    "high ROI real estate NCR",
  ],
};

export default function Home() {
  return (
    <main className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden`}>
      <HomePageWithGateway>
        <OverviewSection />
        <ProjectsSection />
        <StorySection />
        <WhyInvestSection />
        <ProjectShowcaseSliderSection2 />
        {/* <ProjectShowcaseSliderSection /> */}
        {/* <LocationAdvantageSection /> */}
        <TestimonialsSection />
        <PressReleasesSection />
      
        <FooterSection />
      </HomePageWithGateway>
    </main>
  );
}
