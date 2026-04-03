"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef } from "react";
import { useScrollReveal } from "../common/useScrollReveal";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const quattrocento = Quattrocento({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export function AboutSanskarGroup() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section
            ref={sectionRef}
            className="relative flex h-auto w-full items-center bg-white py-12 sm:py-16 lg:h-[816px] lg:min-h-[816px] lg:py-0"
            style={{
                backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                backgroundSize: "24px 24px",
            }}
        >
            <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                <div className="mx-auto flex w-full max-w-[1280px] flex-col xl:max-w-[1320px]">

                    {/* Header Part */}
                    <div data-scroll-reveal className="w-full  text-center lg:text-left mb-10 md:mb-[50px]">
                        <p className={`${lato.className} mb-4 text-[#4A4A4A] text-[15px] font-medium sm:text-[16px] md:text-[18px]`}>
                            About Sanskar Group
                        </p>
                        <h2 className={`${quattrocento.className} text-[20px] md:text-[26px] leading-[1.2] text-[#111111] uppercase sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[46px]`}>
                            BUILDING TRUST. CREATING VALUE. DELIVERING RESULTS.
                        </h2>
                    </div>

                    {/* Columns */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 md:gap-3 lg:gap-[60px] xl:gap-[80px]">
                        {/* Left Column (Image & Name) */}
                        <div data-scroll-reveal className="flex flex-col items-center shrink-0 w-full lg:w-[480px]">
                            <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[506px] lg:h-[476px] rounded-full overflow-hidden mb-6">
                                <Image
                                    src="/assets/Owner.png"
                                    alt="Owner Name - Chairman and Managing Director"
                                    fill
                                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 420px, 460px"
                                    className="object-cover"
                                />
                            </div>
                            <h3 className={`${lato.className} text-[#111111] text-[18px] md:text-[20px] font-bold text-center`}>
                                Owner Name
                            </h3>
                            <p className={`${lato.className} text-[#666666] text-[15px] md:text-[16px] font-normal text-center mt-1`}>
                                Chairman and Managing Director
                            </p>
                        </div>

                        {/* Right Column (Text Content) */}
                        <div data-scroll-reveal className={`flex-1 flex flex-col text-center lg:text-left justify-center space-y-5 md:space-y-6 ${lato.className} text-[15px] md:text-[16px] text-[#555555] leading-[1.8] lg:pt-10`}>
                            <p>
                                Sanskar Realty is an extension of the Yatharth Group of Hospitals&apos; legacy, a name rooted in care, trust, and commitment since 2008. Over the years, Yatharth Hospitals has grown into the third-largest public-listed hospital chain in North India, operating seven hospitals across four states and touching countless lives with compassionate care.
                            </p>
                            <p>
                                Building on this foundation of trust and excellence, Sanskar Realty embarks on a new chapter, focusing on strategic and long-term real estate investments with a vision to build lasting value and foster growth beyond healthcare.
                            </p>
                            <p>
                                Rooted in the same principles that have guided our healthcare journey—integrity, foresight, and a deep sense of responsibility—Sanskar Realty aims to create a legacy of sustainable real estate investments that enrich the communities we serve.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}