"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
});

const quattrocento = Quattrocento({
    subsets: ["latin"],
    weight: ["400", "700"],
});

function AnimatedNumber({ end, suffix = "", duration = 2.5 }: { end: number, suffix?: string, duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let hasAnimated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: end,
                    duration: duration,
                    ease: "power2.out",
                    onUpdate: () => {
                        if (ref.current) {
                            ref.current.innerText = Math.floor(obj.val) + suffix;
                        }
                    }
                });
            }
        }, { threshold: 0.1 });

        observer.observe(el);
        return () => observer.disconnect();
    }, [end, suffix, duration]);

    return <span ref={ref}>0{suffix}</span>;
}

export function WhoWeAre() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useScrollReveal(sectionRef);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleEnded = () => setIsPlaying(false);
        videoElement.addEventListener("ended", handleEnded);

        return () => {
            videoElement.removeEventListener("ended", handleEnded);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-w-0 overflow-x-hidden pt-16 md:pt-24">
            {/* Subtle two-tone background to match the split look */}
            <div className="absolute inset-x-0 top-0 h-[38%] bg-[#FAFAFA] -z-20" />
            <div className="absolute inset-x-0 bottom-0 h-[50%] lg:h-[45%] bg-white -z-20" />

            {/* Background vertical line grid */}
            <div className="absolute inset-0 -z-10 pointer-events-none hidden xl:block">
                <div className="absolute left-1/2 top-0 h-full w-full max-w-[1500px] -translate-x-1/2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                    <div className="flex h-full w-full justify-evenly">
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                        <span className="h-full w-px shrink-0 bg-[#F1F1F1]" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex flex-col items-center">

                {/* Header Text */}
                <div data-scroll-reveal className="text-center mb-6 md:mb-10 w-full">
                    <p className={`${lato.className} text-[#4A4A4A] text-[15px] font-medium sm:text-[16px] mb-3 md:mb-4`}>
                        Who We Are
                    </p>
                    <h2 className={`${quattrocento.className} text-[26px] leading-[1.2] text-[#111111] uppercase sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[42px]`}>
                        HEALTH-FIRST APPROACH TO MODERN LIVING
                    </h2>
                </div>

                {/* Description Paragraphs */}
                <div data-scroll-reveal className={`mx-auto mb-10 w-full max-w-[1040px] space-y-4 text-center align-middle text-[#666666] sm:mb-12 md:mb-16 md:space-y-6 ${lato.className} text-[15px] leading-[26px] sm:text-[17px] sm:leading-[30px] md:text-[18px] md:leading-[32px] tracking-normal`}>
                    <p>
                        Sanskar Realty is not merely another name in the overcrowded Delhi NCR real estate market. We are the real estate venture of <span className="text-[#F7A51D] font-bold">the Yatharth Family Office</span> – which is the strategic investment branch of <span className="text-[#F7A51D] font-bold">Yatharth Group</span> and <span className="text-[#F7A51D] font-bold">North India's third largest public-listed healthcare company</span> founded in 2008 and relied on by millions throughout the area.
                    </p>
                    <p>
                        The same values that built one of India's most respected hospital networks — <span className="text-[#F7A51D] font-bold">care, integrity, transparency,</span> and a <span className="text-[#F7A51D] font-bold">commitment</span> to human wellbeing — now shape every residential community we create. The product of a healthcare pioneer building homes is no ordinary real estate. Security, dignity, and value per square foot are the measured outcomes of the sanctuary.
                    </p>
                    <p className="mx-auto w-full max-w-[1000px]">
                        Sanskar Realty has been excelling in delivering top-notch projects in <span className="text-[#F7A51D] font-bold">Noida Extension, Greater Noida West</span>, and <span className="text-[#F7A51D] font-bold">Ghaziabad</span> for over 17 years, constantly reshaping the standards of luxury lifestyle in Delhi NCR, one meticulously designed home at a time.
                    </p>
                </div>

                {/* Video Container */}
                <div data-scroll-reveal className="relative w-full max-w-[1024px] aspect-video  rounded-[12px] overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.08)] cursor-pointer bg-black/5 mx-auto border border-black/5" onClick={togglePlay}>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/assets/who_we_are.mp4"
                        playsInline
                        controls={isPlaying}
                    />

                    {/* Play Button Overlay */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300 hover:bg-black/20">
                            <div className="flex items-center justify-center w-[96px] h-[96px] rounded-full bg-[rgba(255,255,255,0.8)] drop-shadow-xl transition-transform duration-300 hover:scale-[1.05]">
                                <Image
                                    src="/assets/play_button.svg"
                                    alt="Play Video"
                                    width={40}
                                    height={40}
                                    className="w-[35px] h-[35px] object-contain translate-x-1"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Subtitle text */}
                <p data-scroll-reveal className={`${lato.className} italic font-normal text-[14px] leading-[21px] tracking-normal text-center align-middle capitalize text-[#00000099] mt-6 md:mt-8 max-w-[600px]`}>
                    Hospital Yatharth Group Support – Yatharth Group of Hospitals – 8 Hospitals and 2,500+ Beds – NABH Accredited – 4 States
                </p>

                {/* --- Stats Section: even 2×2 gaps on mobile; desktop stagger unchanged --- */}
                <div className="relative mt-20 grid w-full grid-cols-2 gap-x-3 gap-y-10 sm:mt-24 sm:gap-x-6 sm:gap-y-12 md:mt-28 md:gap-y-14 lg:mt-[160px] lg:flex lg:max-w-none lg:flex-nowrap lg:items-start lg:justify-between lg:gap-x-0 lg:gap-y-0">
                    <div data-scroll-reveal className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:w-1/4 lg:px-4 lg:pt-0">
                        <span className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}>
                            <AnimatedNumber end={17} suffix="+" />
                        </span>
                        <span className={`${lato.className} max-w-[155px] text-[14px] font-normal leading-snug text-[#555555] sm:max-w-[170px] sm:text-[15px] md:text-[16px] lg:max-w-none`}>Years of Real Estate Excellence</span>
                    </div>
                    <div data-scroll-reveal className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:mt-16 lg:w-1/4 lg:px-4">
                        <span className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}>
                            <AnimatedNumber end={3} />
                        </span>
                        <span className={`${lato.className} max-w-[155px] text-[14px] font-normal leading-snug text-[#555555] sm:max-w-[170px] sm:text-[15px] md:text-[16px] lg:max-w-none`}>Landmark Residential<br className="hidden lg:block" /> Projects</span>
                    </div>
                    <div data-scroll-reveal className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:mt-32 lg:w-1/4 lg:px-4">
                        <span className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}>
                            <AnimatedNumber end={100} suffix="%" />
                        </span>
                        <span className={`${lato.className} max-w-[155px] text-[14px] font-normal leading-snug text-[#555555] sm:max-w-[170px] sm:text-[15px] md:text-[16px] lg:max-w-none`}>RERA Compliant — Zero<br className="hidden lg:block" /> Compromise</span>
                    </div>
                    <div data-scroll-reveal className="flex min-w-0 flex-col items-center px-2 text-center sm:px-3 lg:mt-48 lg:w-1/4 lg:px-4">
                        <span className={`${quattrocento.className} mb-4 text-[40px] font-bold leading-none text-[#111111] md:text-[50px] lg:mb-3 lg:text-[56px]`}>
                            <AnimatedNumber end={4} />
                        </span>
                        <span className={`${lato.className} text-[14px] font-normal leading-snug text-[#555555] sm:text-[15px] md:text-[16px]`}>States Covered</span>
                    </div>
                </div>

                {/* --- Mission & Vision Section --- */}
                <div className="relative mb-10 mt-14 flex w-full flex-col items-center gap-12 sm:mt-16 sm:gap-14 md:mt-20 lg:mt-24 lg:flex-row lg:gap-14 xl:gap-[90px]">

                    {/* Left side: Cards */}
                    <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-10 sm:gap-12 lg:mx-0 lg:w-[555px]">

                        {/* Mission Card */}
                        <div data-scroll-reveal className="flex h-auto w-full flex-col justify-center border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-8 md:p-10 lg:h-[316px] lg:w-[555px]">
                            <span className={`${lato.className} mb-3 block text-[15px] font-medium text-[#111111] sm:mb-4 md:text-[16px]`}>
                                Our Mission
                            </span>
                            <h2 className={`${quattrocento.className} mb-4 text-[22px] font-normal uppercase leading-[1.3] text-[#111111] sm:mb-5 sm:text-[24px] md:text-[28px] lg:mb-5 lg:text-[32px]`}>
                                BUILDING A LEGACY OF EXCELLENCE
                            </h2>
                            <p className={`${lato.className} text-[15px] leading-[1.75] text-[#666666] md:text-[16px] md:leading-[1.8]`}>
                                To deliver exceptional living spaces with a blend of luxury, comfort and sustainable design. Our organization builds residential and commercial properties which deliver enduring worth through innovative solutions that meet customer needs while setting new standards in the real estate industry.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div data-scroll-reveal className="flex h-auto w-full flex-col justify-center border border-[#E5E5E5] bg-white p-6 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-8 md:p-10 lg:h-[316px] lg:w-[555px]">
                            <span className={`${lato.className} mb-3 block text-[15px] font-medium text-[#111111] sm:mb-4 md:text-[16px]`}>
                                Our Vision
                            </span>
                            <h2 className={`${quattrocento.className} mb-4 text-[22px] font-normal uppercase leading-[1.3] text-[#111111] sm:mb-5 sm:text-[24px] md:text-[28px] lg:mb-5 lg:text-[32px]`}>
                                REDEFINING LIVING, INSPIRING FUTURES
                            </h2>
                            <p className={`${lato.className} text-[15px] leading-[1.75] text-[#666666] md:text-[16px] md:leading-[1.8]`}>
                                We aim to be a trusted leader and reliable real estate company creating vibrant communities and modern living spaces for better customer lifestyles. Our goal is to expand across NCR region and beyond, providing premium residential and commercial properties that are quality-driven and timeless.
                            </p>
                        </div>

                    </div>

                    {/* Right side: Image */}
                    <div data-scroll-reveal className="relative aspect-[593/436] w-full max-w-[593px] overflow-hidden lg:mx-0 lg:h-[436.51px] lg:w-[593.26px] lg:max-w-none lg:shrink-0 lg:aspect-auto">
                        <Image
                            src="/assets/mission.png"
                            alt="Mission & Vision"
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
}
