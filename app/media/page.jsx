import MediaBanner from "../components/media/mediabanner";
import { MediaHashScroll } from "../components/common/MediaHashScroll";
import { FooterSection } from "../components/home/FooterSection";
import PressRelease from "../components/media/pressrelease";
import DreamHome from "../components/media/dreamHome";
import Testimonial from "../components/media/testimonial";
import Prrelease from "../components/media/prrelease";
import Gallery from "../components/media/gallery";
import Event from "../components/media/event";
import Faqs from "../components/media/faqs";
export const metadata = {
  title: "Sanskar Realty Media | News, Press Releases & Project Updates",
  description:
    "Stay updated with the latest Sanskar Realty news, press releases, and project launches. Discover insights on Eternia and more, shaping the future of luxury living.",
  keywords: [
    "Sanskar Realty media",
    "official press releases",
    "project launch announcements",
    "Eternia project news",
    "press inquiries Sanskar Realty",
    "real estate media updates",
    "Sanskar Realty awards",
    "luxury real estate news",
    "Eternia press release",
    "media contact for Sanskar Realty",
    "real estate media page",
    "news updates on Sanskar Realty",
  ],
};
export default function MediaPage() {
  return (
    <>
      <main className="min-w-0">
        <MediaHashScroll />
        <MediaBanner />
        <PressRelease />
        <Gallery />
        <Event />
        <Faqs />
        <DreamHome />
        <Testimonial />
        {/* <Prrelease /> */}
        <FooterSection alignWithHeader />
      </main>
    </>
  );
}
