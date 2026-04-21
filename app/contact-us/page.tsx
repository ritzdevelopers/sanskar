import { Poppins, Lato, Quattrocento } from "next/font/google";
import { FooterSection } from "../components/home/FooterSection";
import { ContactFormSection } from "../components/contact-us/contactFormSection";
import { FindoutSection } from "../components/contact-us/findout";
import { FaqsSection } from "../components/contact-us/faqs";
import { FindDreamHomeSection } from "../components/contact-us/FindDreamHomeSection";
import { TestimonialSection } from "../components/contact-us/testimonial";
import { PrreleaseSection } from "../components/contact-us/prrelease";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Contact Sanskar Realty | Property Inquiries & Site Visits",
  description:
    "Reach out to Sanskar Realty for inquiries, site visits, or partnership opportunities. Visit our Eternia Office in Greater Noida or contact us for assistance.",
  keywords: [
    "Contact Sanskar Realty",
    "property inquiries in Greater Noida",
    "property site visit request",
    "book property online",
    "Sanskar Realty amenities",
    "availability of properties in Noida",
    "site visit arrangements",
    "partnership opportunities with Sanskar Realty",
    "customer service for Sanskar Realty",
    "real estate office Greater Noida",
    "project information requests",
  ],
};

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

export default function ContactUsPage() {
  return (
    <main className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden`}>
      <ContactFormSection />
      <FindoutSection/>
      <FaqsSection/>
      <FindDreamHomeSection/>
      <TestimonialSection/>
      <PrreleaseSection />
        <FooterSection />
    </main>
  );
}
