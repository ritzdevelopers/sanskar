"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "./lenisInstance";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      /* Route touch through Lenis on mobile so drags on fixed/pinned layers still scroll the page */
      syncTouch: true,
      touchMultiplier: 1.2,
      allowNestedScroll: true,
    });

    const scroller = document.documentElement;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.animatedScroll;
      },
      scrollHeight: () => scroller.scrollHeight,
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight,
        };
      },
      pinType: scroller.style.transform ? "transform" : "fixed",
    });

    const onStRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", onStRefresh);
    ScrollTrigger.refresh();

    setLenisInstance(lenis);

    return () => {
      setLenisInstance(null);
      ScrollTrigger.removeEventListener("refresh", onStRefresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(scroller);
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}
