import type Lenis from "lenis";

let instance: Lenis | null = null;

/** Matches `SmoothScrollProvider` Lenis feel for programmatic scrolls. */
export const LENIS_PROGRAMMATIC_DURATION = 1.15;

export function setLenisInstance(l: Lenis | null) {
  instance = l;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
