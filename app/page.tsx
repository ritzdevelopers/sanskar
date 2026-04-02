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
