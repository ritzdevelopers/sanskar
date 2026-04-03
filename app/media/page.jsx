import MediaBanner from "../components/media/mediabanner";
import { FooterSection } from "../components/home/FooterSection";
import PressRelease from "../components/media/pressrelease";

export default function MediaPage() {
  return (
    <>
      <main className="min-w-0">
        <MediaBanner />
        <PressRelease />
      <FooterSection alignWithHeader />
      </main>
    </>
  );
}
