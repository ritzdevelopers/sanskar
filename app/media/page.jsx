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
        <Prrelease />
        <FooterSection alignWithHeader />
      </main>
    </>
  );
}
