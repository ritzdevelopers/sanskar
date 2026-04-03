"use client";

import Link from "next/link";
import { Lato } from "next/font/google";
import { useCallback, useState } from "react";
import { ScrollToTopButton } from "./ScrollToTopButton";

const lato = Lato({
    subsets: ["latin"],
    weight: ["700"],
});

export function FloatingBottomActions() {
    const [scrollTopShown, setScrollTopShown] = useState(false);
    const onScrollTopVisibility = useCallback((visible: boolean) => {
        setScrollTopShown(visible);
    }, []);

    return (
        <div
            className="fixed z-[100] flex flex-row items-center justify-end"
            style={{
                bottom: "max(24px, env(safe-area-inset-bottom))",
                right: "max(24px, env(safe-area-inset-right))",
                top: "auto",
            }}
        >
            <Link
                href="/contact-us"
                className={`${lato.className} inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-none bg-black px-5 py-3.5 text-[14px] font-bold uppercase leading-none tracking-normal text-white no-underline shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-[background-color,box-shadow,transform,margin] duration-300 ease-out hover:bg-[#1a1a1a] hover:shadow-[0_6px_18px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.98]`}
            >
                Enquire Now
            </Link>
            <div
                className={`flex shrink-0 overflow-hidden transition-[max-width,opacity,margin-left] duration-300 ease-out ${
                    scrollTopShown
                        ? "ml-2 max-w-[48px] opacity-100"
                        : "ml-0 max-w-0 opacity-0 pointer-events-none"
                }`}
                aria-hidden={!scrollTopShown}
            >
                <div className="w-12 shrink-0">
                    <ScrollToTopButton onVisibleChange={onScrollTopVisibility} />
                </div>
            </div>
        </div>
    );
}
