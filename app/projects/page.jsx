import { Poppins, Lato, Quattrocento } from "next/font/google";
import { ProjectHeroSection } from "../components/projects/projectherosection";
import { DreamHomeSection } from "../components/projects/dream-home";
import { TestimonialSection } from "../components/projects/testiomonial";
import { ReleaseSection } from "../components/projects/release";
import { FooterSection } from "../components/home/FooterSection";
import { OverviewSection } from "../components/projects/overview";
import { ProjectSection } from "../components/projects/projects";
export const metadata = {
  title: "Sanskar Realty Projects | Luxury Apartments & Villas in NCR",
  description:
    "Explore Sanskar Realty's luxury projects: Eternia, High Life, and Forest Walk. Premium apartments and villas in Greater Noida and Ghaziabad.",
  keywords: [
    "Sanskar Realty",
    "luxury real estate projects",
    "premium apartments in Greater Noida",
    "3 BHK apartments",
    "4 BHK apartments",
    "flexi apartments in Noida",
    "gated villas in Ghaziabad",
    "luxury living in Tech Zone IV",
    "world-class amenities",
    "residential spaces in Delhi NCR",
    "iconic real estate projects",
    "luxury homes in Greater Noida",
    "high-end living spaces in Ghaziabad",
    "innovative real estate design",
    "premium real estate properties",
  ],
};

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
