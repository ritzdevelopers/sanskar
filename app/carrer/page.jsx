import { Poppins, Lato, Quattrocento } from "next/font/google";
import Carrerbanner from "../components/carrer/carrerbanner";
import Carrerform from "../components/carrer/carrerform";
import Vaccancy from "../components/carrer/vaccancy";
import { FooterSection } from "../components/home/FooterSection";
import DreamHome from "../components/carrer/dreamhome";
import Testimonial from "../components/carrer/testimonial";
import Prrelease from "../components/carrer/prrelease";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quattrocento",
});

export default function CarrerPage() {
  return (
    <main
      className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden`}
    >
      <Carrerbanner />
      <Carrerform />
      <Vaccancy />
      <DreamHome />
      <Testimonial />
      <Prrelease />
      <FooterSection alignWithHeader />
    </main>
  );
}
