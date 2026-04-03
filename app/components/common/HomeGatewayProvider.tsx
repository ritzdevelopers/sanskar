"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { WelcomeGateway } from "./WelcomeGateway";

function pathIsHome(path: string) {
  return path === "" || path === "/";
}

const HomeGatewayIntroContext = createContext(false);

export function useHomeGatewayIntroReady() {
  return useContext(HomeGatewayIntroContext);
}

type GatewaySession = {
  open: boolean;
  introReady: boolean;
  key: number;
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
  }));

  useLayoutEffect(() => {
    const prevStored = prevPathRef.current;
    const nowHome = pathIsHome(pathname);

    if (prevStored === null) {
      prevPathRef.current = pathname;

      if (shouldShowGatewayOnFullPageLoad()) {
        setSession((s) => ({
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
      setSession((s) => ({
        ...s,
        open: false,
        introReady: true,
      }));
    }
  }, [pathname]);

  const onGatewayComplete = () => {
    setSession((s) => ({ ...s, open: false, introReady: true }));
  };

  return (
    <HomeGatewayIntroContext.Provider value={session.introReady}>
      {children}
      {session.open && <WelcomeGateway key={session.key} onComplete={onGatewayComplete} />}
    </HomeGatewayIntroContext.Provider>
  );
}
