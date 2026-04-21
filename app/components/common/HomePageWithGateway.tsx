"use client";

import { useEffect } from "react";
import { HeroSection } from "../home/HeroSection";
import { ScrollToStorySectionOnHash } from "./ScrollToStorySectionOnHash";
import { useHomeGatewayIntroReady, useHomeHeroMountKey } from "./HomeGatewayProvider";

type HomePageWithGatewayProps = {
  children: React.ReactNode;
};

export function HomePageWithGateway({ children }: HomePageWithGatewayProps) {
  const introReady = useHomeGatewayIntroReady();
  const heroMountKey = useHomeHeroMountKey();

  useEffect(() => {
    const ensureImageAccessibility = () => {
      const images = document.querySelectorAll<HTMLImageElement>("img");
      images.forEach((img) => {
        const alt = (img.getAttribute("alt") || "").trim();
        if (!alt) {
          img.setAttribute("alt", "Sanskar Realty image");
        }
        if (!img.getAttribute("title")) {
          img.setAttribute("title", img.getAttribute("alt") || "Sanskar Realty image");
        }
      });
    };

    ensureImageAccessibility();
    const observer = new MutationObserver(() => ensureImageAccessibility());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollToStorySectionOnHash />
      <HeroSection key={heroMountKey} startIntroAnimation={introReady} />
      {children}
    </>
  );
}
