"use client";

import { HeroSection } from "../home/HeroSection";
import { ScrollToStorySectionOnHash } from "./ScrollToStorySectionOnHash";
import { useHomeGatewayIntroReady } from "./HomeGatewayProvider";

type HomePageWithGatewayProps = {
  children: React.ReactNode;
};

export function HomePageWithGateway({ children }: HomePageWithGatewayProps) {
  const introReady = useHomeGatewayIntroReady();

  return (
    <>
      <ScrollToStorySectionOnHash />
      <HeroSection startIntroAnimation={introReady} />
      {children}
    </>
  );
}
