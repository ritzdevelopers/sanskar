"use client";

import Image from "next/image";
import { Lato, Quattrocento } from "next/font/google";
import { useRef } from "react";
import { ABOUT_SANSKAR_GROUP_SECTION_ID } from "../common/aboutNavigation";
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
            id={ABOUT_SANSKAR_GROUP_SECTION_ID}
            ref={sectionRef}
            className="relative flex h-auto w-full scroll-mt-[88px] items-center bg-white pb-12 sm:pb-16 lg:h-[816px] lg:min-h-[816px] lg:py-0"
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
                    <div className="flex flex-col items-center gap-3 md:gap-3 lg:flex-row lg:items-stretch lg:gap-[60px] xl:gap-[80px]">
                        {/* Left Column (Image & Name) */}
                        <div data-scroll-reveal className="flex w-full shrink-0 flex-col items-center lg:w-[506px] lg:max-w-[506px]">
                            <div className="relative mb-6 aspect-square w-[300px] max-w-[min(100vw-2rem,506px)] shrink-0 overflow-hidden rounded-[50%] sm:w-[360px] md:w-[420px] lg:w-[506px] lg:max-w-none">
                                <Image
                                    src="/assets/Owner.png"
                                    alt="Owner Name - Chairman and Managing Director"
                                    fill
                                    sizes="(max-width: 768px) 300px, (max-width: 1024px) 420px, 506px"
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

                        {/* Right Column (Text Content) — vertically centered beside left column on lg */}
                        <div
                            data-scroll-reveal
                            className={`flex flex-1 flex-col justify-center space-y-5 text-center md:space-y-2 lg:text-left ${lato.className} text-[15px] text-[#555555] leading-[1.8] md:text-[16px] lg:mt-[-100px] mt-[0]`}
                        >
                            <p>
                            Led by our directors, <span className="text-[#F7A51D] font-bold"> Mr. Sanskar Tyagi </span> and <span className="text-[#F7A51D] font-bold"> Mr.Kuldeep Tyagi</span>, the team brings unparalleled expertise in real estate strategy and development, driving the company's vision forward. From identifying priority projects to ensuring their seamless execution, their leadership is our key to operational success.

                            </p>
                            <p>
                            With over 17 years of legacy, we are committed to delivering <span className="text-[#F7A51D] font-bold"> landmarks residential</span> and <span className="text-[#F7A51D] font-bold"> commercial spaces</span>, reshaping the real estate landscape. Our vision is to create sustainable, value-driven developments enhancing the quality of life in every community we serve.

                            </p>
                            <p>
                            As we move forward, our aim is to set new benchmarks in the real estate industry while fostering trust and building long-term relationships with our clients.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}