"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type AnimationEvent,
} from "react";
import { Lato, Quattrocento } from "next/font/google";
import { useScrollReveal } from "../common/useScrollReveal";
import Link from "next/link";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const slides = [
  {
    id: 1,
    title: "Eternia Project",
    image: "/assets/eternia-home.jpg",
    url: "https://eternia.greatvaluerealty.com/",
  },
  {
    id: 2,
    title: "High Life",
    image: "/assets/highlife.jpg",
    url: "https://highlife.greatvaluerealty.com/",
  },
  {
    id: 3,
    title: "Forest Walk",
    image: "/assets/forest.jpg",
    url: "https://theforestwalk.com/",
  },
];

type Slide = (typeof slides)[number];

const AUTOPLAY_MS = 8000;

export function ProjectsSection() {
  // currentSlide = fully visible base layer (never moves)
  // incomingSlide = slides in on top from right (or left)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [incomingSlide, setIncomingSlide] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const sectionRef = useRef(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const promoteIndexRef = useRef<number | null>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const finishSlideTransition = useCallback(() => {
    const idx = promoteIndexRef.current;
    if (idx === null) return;
    promoteIndexRef.current = null;
    setCurrentSlide(idx);
    setIncomingSlide(null);
    setIsAnimating(false);
  }, []);

  const goTo = useCallback(
    (nextIndex: number, dir: "next" | "prev") => {
      if (isAnimating || nextIndex === currentSlide) return;
      setDirection(dir);
      promoteIndexRef.current = nextIndex;
      setIncomingSlide(nextIndex);
      setIsAnimating(true);
    },
    [isAnimating, currentSlide]
  );

  const goNext = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    goTo(next, "next");
  }, [currentSlide, goTo]);

  const goPrev = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goTo(prev, "prev");
  }, [currentSlide, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
  }, [goNext]);

  useEffect(() => {
    if (!isSectionInView) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSectionInView, goNext]);

  const handlePrev = () => { goPrev(); resetTimer(); };
  const handleNext = () => { goNext(); resetTimer(); };
  const handleDotClick = (index: number) => {
    if (index === currentSlide || isAnimating) return;
    const dir = index > currentSlide ? "next" : "prev";
    goTo(index, dir);
    resetTimer();
  };

  // The active dot follows the incoming slide during animation, snapping ahead
  const activeDot = incomingSlide !== null ? incomingSlide : currentSlide;

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[637px] bg-[#F8F8F8]" />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center xl:max-w-[1320px]">
          <div className="flex w-full max-w-[1004px] flex-col items-center gap-5 text-center sm:gap-6 md:gap-[27px]">
          <Link href="/projects" target="_blank">
  <p
    data-scroll-reveal
    className={`${lato.className} text-[15px] font-normal uppercase leading-[100%] tracking-[0.05em] text-[#111111] sm:text-[16px] md:text-[18px]`}
  >
    Our Projects
  </p>
</Link>

            <h2
              data-scroll-reveal
              className={`${quattrocento.className} max-w-[750px] text-[26px] font-normal uppercase leading-[1.2] text-[#111111] sm:text-[30px] md:text-[34px] lg:text-[36px] lg:leading-[46px]`}
            >
              Three Projects
              <br /> One Standard - Extraordinary
            </h2>

            <p
              data-scroll-reveal
              className={`${lato.className} max-w-[760px] text-[14px] font-normal leading-6 text-[#00000099] sm:text-[15px] md:text-[16px]`}
            >
              From Luxury 3 & 4 BHK Residences in Noida Extension to Studio
              Apartments in Greater Noida West and Gated Forest Villas in
              Ghaziabad, we have it all.
            </p>
          </div>

          <div className="mt-6 w-full max-w-[1284px] sm:mt-8">
            <div className="relative isolate aspect-[4/3] min-h-[220px] w-full overflow-hidden bg-[#EAEAEA] [transform:translateZ(0)] sm:aspect-[16/10] md:aspect-[5/3] md:min-h-[360px] lg:aspect-auto lg:h-[520px] xl:h-[580px] 2xl:h-[611px]">
              <a
                href={slides[activeDot].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${slides[activeDot].title}`}
                className="absolute inset-0 z-10 cursor-pointer"
              />
              {/* While animating, hide previous slide — only placeholder + incoming panel */}
              {incomingSlide === null && (
                <SlideLayer
                  slide={slides[currentSlide]}
                  imagePriority={currentSlide === 0}
                />
              )}

              {incomingSlide !== null && (
                <SlideLayer
                  slide={slides[incomingSlide]}
                  entering
                  direction={direction}
                  onEnterAnimationEnd={finishSlideTransition}
                />
              )}

              {/* Left Arrow */}
              <button
                type="button"
                aria-label="Previous slide"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:bg-white/20 hover:scale-105 active:scale-95 sm:left-6 sm:h-11 sm:w-11 md:h-12 md:w-12"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                type="button"
                aria-label="Next slide"
                onClick={handleNext}
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:bg-white/20 hover:scale-105 active:scale-95 sm:right-6 sm:h-11 sm:w-11 md:h-12 md:w-12"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex items-center justify-center gap-2.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to project ${index + 1}`}
                  onClick={() => handleDotClick(index)}
                  className={`h-4 w-4 rounded-full transition-[background-color,transform] duration-500 ease-out hover:scale-110 ${
                    activeDot === index ? "bg-[#666666]" : "bg-[#E2E2E2]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Match StorySection `data-scroll-reveal-img`: clip-path reveal + img scale (useScrollReveal.ts) */}
      <style>{`
        @keyframes projects-story-clip-next {
          from {
            clip-path: inset(0% 0% 0% 100%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes projects-story-clip-prev {
          from {
            clip-path: inset(0% 100% 0% 0%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes projects-story-img-zoom {
          from {
            transform: scale(1.2);
          }
          to {
            transform: scale(1);
          }
        }
        .projects-slide-story-next {
          animation: projects-story-clip-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .projects-slide-story-next :is(img) {
          transform-origin: center center;
          animation: projects-story-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .projects-slide-story-prev {
          animation: projects-story-clip-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .projects-slide-story-prev :is(img) {
          transform-origin: center center;
          animation: projects-story-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .projects-slide-story-next,
          .projects-slide-story-prev,
          .projects-slide-story-next :is(img),
          .projects-slide-story-prev :is(img) {
            animation-duration: 0.35s;
            animation-timing-function: ease-out;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Single Slide Layer ───────────────────────────────────────────────────────
function SlideLayer({
  slide,
  entering = false,
  direction = "next",
  onEnterAnimationEnd,
  imagePriority = false,
}: {
  slide: Slide;
  entering?: boolean;
  direction?: "next" | "prev";
  onEnterAnimationEnd?: () => void;
  imagePriority?: boolean;
}) {
  const handleEnterAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (!entering || !onEnterAnimationEnd) return;
    if (e.target !== e.currentTarget) return;
    const name = e.animationName;
    if (!name.includes("projects-story-clip")) return;
    onEnterAnimationEnd();
  };

  const storyAnimClass = entering
    ? direction === "next"
      ? "projects-slide-story-next"
      : "projects-slide-story-prev"
    : "";

  return (
    <div
      className={`absolute inset-0 bg-[#EAEAEA] ${storyAnimClass}`}
      style={{ zIndex: entering ? 10 : 0 }}
      onAnimationEnd={handleEnterAnimationEnd}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority={imagePriority}
        quality={100}
        sizes="(max-width: 1284px) 100vw, 1284px"
      />

      {/* Project title badge */}
      <div className="absolute left-3 top-3 flex h-9 max-w-[min(167px,70%)] items-center justify-center border border-white/25 bg-[rgba(0,0,0,0.10)] px-3 backdrop-blur-md sm:left-6 sm:top-6 sm:h-[45px] md:left-[37px] md:top-[44px] md:w-[167px]">
        <span
          className={`${quattrocento.className} truncate text-[14px] font-normal leading-none text-white sm:text-[16px] md:text-[18px]`}
        >
          {slide.title}
        </span>
      </div>

      {/* External link button */}
      <a
        href={slide.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${slide.title} project`}
        className="group absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white text-[#111111] transition-transform hover:scale-105 sm:right-6 sm:top-6 sm:h-11 sm:w-11 md:right-8 md:top-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[200%] group-hover:-translate-y-[200%]" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute -translate-x-[200%] translate-y-[200%] transition-transform duration-[400ms] ease-in-out group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </div>
  );
}