"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { WelcomeGateway } from "./WelcomeGateway";

function pathIsHome(path: string) {
  return path === "" || path === "/";
}

function pathIsDashboard(path: string) {
  return path.startsWith("/dashboard");
}

const HomeGatewayIntroContext = createContext(false);
const HomeHeroMountKeyContext = createContext(0);

export function useHomeGatewayIntroReady() {
  return useContext(HomeGatewayIntroContext);
}

export function useHomeHeroMountKey() {
  return useContext(HomeHeroMountKeyContext);
}

type GatewaySession = {
  open: boolean;
  introReady: boolean;
  key: number;
  /** Bumps on client navigations landing on `/` so the hero remounts and its GSAP intro runs reliably. */
  homeHeroKey: number;
};

function shouldShowGatewayOnFullPageLoad(): boolean {
  if (typeof performance === "undefined") return true;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  const t = nav?.type;
  return t === "reload" || t === "navigate";
}

export function HomeGatewayProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const prevPathRef = useRef<string | null>(null);

  const [session, setSession] = useState<GatewaySession>(() => ({
    open: false,
    introReady: !pathIsHome(pathname),
    key: 0,
    homeHeroKey: 0,
  }));

  useLayoutEffect(() => {
    const prevStored = prevPathRef.current;
    const nowHome = pathIsHome(pathname);
    const nowDashboard = pathIsDashboard(pathname);

    if (prevStored === null) {
      prevPathRef.current = pathname;

      if (shouldShowGatewayOnFullPageLoad() && !nowDashboard) {
        setSession((s) => ({
          ...s,
          open: true,
          introReady: nowHome ? false : true,
          key: s.key + 1,
        }));
      } else {
        setSession((s) => ({
          ...s,
          open: false,
          introReady: true,
        }));
      }
      return;
    }

    if (prevStored !== pathname) {
      prevPathRef.current = pathname;
      const landedOnHome = pathIsHome(pathname);
      setSession((s) => ({
        ...s,
        open: false,
        introReady: true,
        homeHeroKey: landedOnHome ? s.homeHeroKey + 1 : s.homeHeroKey,
      }));
    }
  }, [pathname]);

  const onGatewayComplete = () => {
    setSession((s) => ({ ...s, open: false, introReady: true }));
  };

  return (
    <HomeGatewayIntroContext.Provider value={session.introReady}>
      <HomeHeroMountKeyContext.Provider value={session.homeHeroKey}>
        {children}
        {session.open && <WelcomeGateway key={session.key} onComplete={onGatewayComplete} />}
      </HomeHeroMountKeyContext.Provider>
    </HomeGatewayIntroContext.Provider>
  );
}
