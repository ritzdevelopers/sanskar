"use client";

import { useEffect, useState } from "react";
import { getLenisInstance, LENIS_PROGRAMMATIC_DURATION } from "./lenisInstance";

const SCROLL_THRESHOLD = 320;

type ScrollToTopButtonProps = {
    onVisibleChange?: (visible: boolean) => void;
};

export function ScrollToTopButton({ onVisibleChange }: ScrollToTopButtonProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY || document.documentElement.scrollTop;
            setVisible(y > SCROLL_THRESHOLD);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        onVisibleChange?.(visible);
    }, [visible, onVisibleChange]);

    const handleClick = () => {
        const lenis = getLenisInstance();
        if (lenis) {
            lenis.scrollTo(0, { duration: LENIS_PROGRAMMATIC_DURATION });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label="Scroll to top"
            className="flex h-[42px] w-12 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-[3px] bg-[#F7A51D] text-white opacity-100 transition-opacity duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        >
            <i className="ri-arrow-up-s-line text-lg leading-none sm:text-xl" aria-hidden />
        </button>
    );
}
