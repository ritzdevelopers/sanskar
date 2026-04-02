import { Poppins, Lato, Quattrocento } from "next/font/google";
import { ProjectHeroSection } from "../components/projects/projectherosection";
import { DreamHomeSection } from "../components/projects/dream-home";
import { TestimonialSection } from "../components/projects/testiomonial";
import { ReleaseSection } from "../components/projects/release";
import { FooterSection } from "../components/home/FooterSection";
import { OverviewSection } from "../components/projects/overview";
import { ProjectSection } from "../components/projects/projects";

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

export default function ProjectPage() {
  return (
    <main
      className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden`}
    >
      <ProjectHeroSection />
      <OverviewSection />
      <ProjectSection />
      <DreamHomeSection />
      <TestimonialSection />
      <ReleaseSection />
      <FooterSection alignWithHeader />
    </main>
  );
}
