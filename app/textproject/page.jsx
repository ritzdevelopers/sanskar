"use client";

import { Poppins, Lato, Quattrocento } from "next/font/google";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { FooterSection } from "../components/home/FooterSection";
import { HeroPageHeader } from "../components/common/HeroPageHeader";
import { useScrollReveal } from "../components/common/useScrollReveal";
import { useEnquireModal } from "../components/common/EnquireModalProvider";

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

const PROJECTS = [
  {
    id: "eternia",
    title: "Eternia",
    location: "Tech Zone IV, Greater Noida (W)",
    description:
      "Experience luxury 3 & 4 BHK apartments at Eternia, with world-class amenities. Luxury & convenience at your best!",
    image: "/assets/eternia.jpg",
    imageAlt: "Eternia residences",
    videoEmbedUrl: "https://www.youtube.com/embed/sibHed6fWig?si=O6OJiRHAJknmvd-j",
  },
  {
    id: "highlife",
    title: "HighLife",
    location: "Dream Valley Tech Zone IV, Greater Noida (W)",
    description:
      "Enjoy spacious 1 & 2 BHK studio apartments with modern amenities at HighLife, located near business hubs.",
    image: "/assets/highlife.jpg",
    imageAlt: "HighLife residences",
    videoEmbedUrl: "https://www.youtube.com/embed/sdaU4DYqOOw?si=LxXT_zrtDvSaXN21",
  },
  {
    id: "forest-walk",
    title: "Forest Walk",
    location: "NH-24, Eastern Peripheral Expressway, Ghaziabad",
    description:
      "Enjoy a gated community lifestyle with luxury and nature at Forest Walk. Connects you with serenity and nature both!",
    image: "/assets/projectforestwalk.png",
    imageAlt: "Forest Walk",
    videoSrc: "/assets/theforestwalk.mp4",
  },
];

const testimonials = [
  {
    id: "ravi-1",
    name: "Mayank Bhatt | Resident, Noida Extension.",
    image: "/assets/testimonial-image.jpg",
    quote:
      '"Our family could not be happier. My investment has paid much more than I could have hoped, plus the quality is there.  The site, layout and credentials of Yatharth Group makes this my smartest NCR real estate investment."',
  },
  {
    id: "mohit-1",
    name: "Varun Kumar| Investor, Delhi NCR.",
    image: "/assets/testimonial-image2.jpg",
    quote:
      '"I have invested in one of the projects with Sanskar Realty based on their reputation in the market and the potential of the location. I am confident about the value it will create in the future. Their transparent approach towards their work has given me full trust in my investment."',
  },
];

const pressReleases = [
  {
    id: 1,
    image: "/assets/2 (1).png",
    title: "Eternia: Spacious Residences For Grand Living | The Tribune India",
    description:
      "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and...",
    linkUrl:
      "https://www.tribuneindia.com/news/business/eternia-spacious-residences-for-grand-living/",
  },
  {
    id: 2,
    image: "/assets/1.png",
    title: "Eternia: Spacious Residences For Grand Living | The Business Standard",
    description:
      "The vision of Eternia residences comes to life through the collaboration of Great Value Realty (GVR) and Yatharth Family Office, a partnership built on trust, innovation, and...",
    linkUrl:
      "https://www.business-standard.com/content/press-releases-ani/eternia-spacious-residences-for-grand-living-125062800661_1.html",
  },
];

export default function TextProjectPage() {
  const overviewRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialRef = useRef(null);
  const releaseRef = useRef(null);
  useScrollReveal(overviewRef);
  useScrollReveal(projectsRef);
  useScrollReveal(testimonialRef);
  useScrollReveal(releaseRef);
  const { openEnquireModal } = useEnquireModal();
  const [mobileIndex, setMobileIndex] = useState(0);
  const nextMobile = useCallback(
    () => setMobileIndex((i) => (i + 1) % testimonials.length),
    [],
  );
  useEffect(() => {
    const t = setInterval(() => {
      nextMobile();
    }, 4000);
    return () => clearInterval(t);
  }, [nextMobile]);

  return (
    <main
      className={`${poppins.className} ${lato.variable} ${quattrocento.variable} w-full min-w-0 overflow-x-hidden`}
    >
      <section className="relative flex min-h-[min(100dvh,620px)] w-full items-center justify-center overflow-hidden sm:min-h-[640px] md:min-h-[375px] lg:min-h-[500px] xl:min-h-[750px]">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/assets/projectmobilebanner.jpg"
            alt="Sanskar Realty residential projects — luxury apartments and villas in NCR"
            title="Sanskar Realty residential projects — luxury apartments and villas in NCR"
            fill
            priority
            fetchPriority="high"
            quality={60}
            className="object-cover md:hidden"
            sizes="100vw"
          />
          <Image
            src="/assets/projectbannerdeskstop.jpg"
            alt="Sanskar Realty residential projects — luxury apartments and villas in NCR"
            title="Sanskar Realty residential projects — luxury apartments and villas in NCR"
            fill
            priority
            fetchPriority="high"
            quality={60}
            className="hidden object-cover md:block"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <HeroPageHeader contactPageStyle projectsLinkCurrent />

        <div className="relative z-10 w-full px-4 pb-10 pt-20 sm:px-6 sm:pb-12 sm:pt-24 md:px-8 md:pt-16 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
            <div className="mx-auto flex w-full max-w-[900px] flex-col items-center justify-center text-center text-white">
              <p className="font-lato text-[16px] font-semibold leading-[28px] tracking-normal text-white">
                Our Projects
              </p>
              <h1 className="font-quattrocento mt-3 text-[30px] md:text-[36px] font-normal uppercase leading-[100%] tracking-normal text-white sm:mt-4">
                Where design meets exceptional quality
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={overviewRef}
        className="relative w-full min-w-0 overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at center,rgb(237, 232, 232) 1.5px, transparent 1.51px)",
          backgroundSize: "30px 30px",
        }}
      >
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-[35px] lg:pt-[70px] xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
            <div className="w-full text-center lg:text-left xl:pl-[100px]">
              <p className="font-lato text-[18px] font-normal uppercase leading-[100%] tracking-[0.05em] text-[#111111]">PROJECTS</p>
              <h2 className="font-quattrocento mx-auto mt-5 max-w-[1100px] text-[20px] font-normal uppercase leading-[35px] tracking-normal text-[#111111] sm:mt-6 md:text-[36px] md:leading-[46px] lg:mx-0">
                Find Your Dream Home with Our Luxury Real Estate Projects
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="relative w-full min-w-0 bg-white">
        {PROJECTS.map((p) => (
          <div key={p.id} className="relative z-10 w-full px-4 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-12 lg:px-10 lg:pt-14 xl:px-12 xl:pt-16 2xl:px-16">
            <div className="mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
              <div className="mx-auto mb-10 w-full border-t border-[#111111]" aria-hidden />
              <div className="mx-auto grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
                <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-span-5 xl:col-span-4">
                  <h2 className="font-quattrocento w-full max-w-[480px] text-[28px] font-normal uppercase leading-[46px] tracking-normal text-[#111111] md:max-w-none md:text-[36px]">{p.title}</h2>
                  <p className="font-quattrocento mt-2 max-w-[400px] text-[18px] font-normal uppercase leading-[25px] tracking-normal text-[#111111]">{p.location}</p>
                  <p className="font-lato mt-3 max-w-[480px] text-[16px] font-normal leading-[24px] tracking-normal text-[#00000099]">{p.description}</p>
                  <button
                    type="button"
                    className="group relative mx-auto mt-3 inline-flex h-11 cursor-pointer items-center overflow-hidden rounded-full border border-[#111111] bg-transparent px-5 text-[14px] font-semibold capitalize leading-[100%] tracking-normal sm:mt-6 sm:h-12 sm:pr-3 sm:pl-6 md:mx-0"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#111111] transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                    <span className="relative z-10 inline-flex items-center gap-2.5 text-[#333333] transition-colors duration-300 group-hover:text-white">
                      Download Brochure
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-current bg-white transition-[background,border-color] group-hover:border-white group-hover:bg-transparent">
                        <Image
                          src="/assets/diagonal_icon.svg"
                          alt="Arrow icon"
                          title="Arrow icon"
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert"
                          aria-hidden
                        />
                      </span>
                    </span>
                  </button>
                </div>
                <div className="relative w-full overflow-hidden lg:col-span-7 xl:col-span-8">
                  <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]">
                    {p.videoEmbedUrl ? (
                      <iframe src={p.videoEmbedUrl} title={`${p.title} video`} className="pointer-events-none h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    ) : p.videoSrc ? (
                      <video src={p.videoSrc} className="pointer-events-none h-full w-full object-cover cursor-pointer" autoPlay muted loop playsInline preload="metadata" />
                    ) : (
                      <Image src={p.image} alt={p.imageAlt} title={p.imageAlt} fill className="object-cover" sizes="100vw" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="w-full bg-white mt-10 md:mt-20">
        <div className="mx-auto h-full min-h-[280px] sm:min-h-[340px] md:min-h-[394px]">
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] md:h-[394px] md:min-h-[394px]">
            <Image src="/assets/find_dream_home.png" alt="Find your dream home with Sanskar Realty" title="Find your dream home with Sanskar Realty" fill className="object-cover w-full h-full" />
            <div className="absolute inset-0 z-10">
              <div className="mx-auto flex h-full w-full max-w-[1480px] xl:max-w-[1520px] items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:justify-start lg:px-10 xl:px-12 2xl:px-16">
                <div className="max-w-[560px] text-center lg:text-left">
                  <h3 className="text-[20px] md:text-[30px] leading-[1.15] text-[#111111] sm:text-[34px] md:text-[40px] lg:text-[42px] font-quattrocento">FIND YOUR DREAM HOME TODAY !</h3>
                  <button type="button" onClick={openEnquireModal} className="font-lato group relative mx-auto mt-5 inline-flex h-11 cursor-pointer items-center overflow-hidden rounded-full border border-[#111111] bg-transparent px-5 text-[14px] font-semibold capitalize leading-[100%] tracking-normal sm:h-12 sm:pr-3 sm:pl-6 lg:mx-0">
                    <span className="relative z-10 inline-flex items-center gap-2.5 text-[#333333]">Let's Connect</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={testimonialRef} className="overflow-x-hidden bg-white py-[35px] lg:py-[75px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="relative mx-auto w-full max-w-[1480px] xl:max-w-[1520px]">
            <h2 className="mt-2 text-center text-[20px] md:text-[26px] font-normal uppercase leading-[1.2] text-[#111111] font-quattrocento">What Our Customers&apos; Say?</h2>
            <div className="relative mt-8">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${mobileIndex * 100}%)` }}>
                {testimonials.map((item) => (
                  <div key={item.id} className="flex w-full shrink-0 justify-center px-2">
                    <div className="w-full max-w-[440px] rounded-[6px] bg-white border border-[#ECECEC] px-5 py-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                      <div className="relative h-20 w-20 mx-auto overflow-hidden rounded-full">
                        <Image src={item.image} alt={item.name} title={item.name} fill className="object-cover" />
                      </div>
                      <h3 className="mt-3 text-[15px] font-bold text-[#111111] font-quattrocento">{item.name}</h3>
                      <p className="mt-2 text-[13px] text-[#5A5A5A] font-lato">{item.quote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={releaseRef} className="bg-[#FAFAFA] py-[35px] md:py-[75px]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-[1280px] xl:max-w-[1320px]">
            <h2 className="mb-10 text-center font-quattrocento text-[28px] font-normal uppercase leading-[100%] text-[#1A1A1A]">PR RELEASES</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-[32px]">
              {pressReleases.map((release) => (
                <div key={release.id} className="flex flex-col gap-5 rounded-lg border border-[#E5E5E5] p-5 hover:shadow-lg">
                  <div className="relative aspect-[1.5] w-full overflow-hidden">
                    <a href={release.linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full cursor-pointer">
                      <Image src={release.image} alt={release.title} title={release.title} fill className="object-cover" />
                    </a>
                  </div>
                  <h3 className="font-quattrocento text-[18px] font-bold leading-[1.3] text-[#1A1A1A]">{release.title.trim()}</h3>
                  <p className="font-lato text-[16px] text-[#555555]">{release.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection alignWithHeader />
    </main>
  );
}
