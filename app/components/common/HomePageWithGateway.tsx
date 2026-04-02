"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "../home/HeroSection";
import { ScrollToStorySectionOnHash } from "./ScrollToStorySectionOnHash";
import { WelcomeGateway } from "./WelcomeGateway";

type HomePageWithGatewayProps = {
  children: React.ReactNode;
};

export function HomePageWithGateway({ children }: HomePageWithGatewayProps) {
  const GATEWAY_SEEN_KEY = "sanskar_gateway_seen";
  const [isHydrated, setIsHydrated] = useState(false);
  const [shouldShowGateway, setShouldShowGateway] = useState(false);
  const [gatewayDone, setGatewayDone] = useState(false);

  useEffect(() => {
    const hasSeenGateway = window.localStorage.getItem(GATEWAY_SEEN_KEY) === "1";
    setShouldShowGateway(!hasSeenGateway);
    setGatewayDone(hasSeenGateway);
    setIsHydrated(true);
  }, []);

  const handleGatewayComplete = () => {
    window.localStorage.setItem(GATEWAY_SEEN_KEY, "1");
    setShouldShowGateway(false);
    setGatewayDone(true);
  };

  return (
    <>
      <ScrollToStorySectionOnHash />
      {isHydrated && shouldShowGateway && <WelcomeGateway onComplete={handleGatewayComplete} />}
      <HeroSection startIntroAnimation={gatewayDone} />
      {children}
    </>
  );
}
