"use client";

import { HeroSection } from "../home/HeroSection";
import { ScrollToStorySectionOnHash } from "./ScrollToStorySectionOnHash";
import { useHomeGatewayIntroReady, useHomeHeroMountKey } from "./HomeGatewayProvider";

type HomePageWithGatewayProps = {
  children: React.ReactNode;
};

export function HomePageWithGateway({ children }: HomePageWithGatewayProps) {
  const introReady = useHomeGatewayIntroReady();
  const heroMountKey = useHomeHeroMountKey();

  return (
    <>
      <ScrollToStorySectionOnHash />
      <HeroSection key={heroMountKey} startIntroAnimation={introReady} />
      {children}
    </>
  );
}
