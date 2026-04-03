"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const VENTURE_LINE = "A VENTURE OF YATHARTH GROUP";

type WelcomeGatewayProps = {
  onComplete?: () => void;
};

export function WelcomeGateway({ onComplete }: WelcomeGatewayProps) {
  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLParagraphElement | null>(null);
  const topGoldRef = useRef<HTMLSpanElement | null>(null);
  const bottomGoldRef = useRef<HTMLSpanElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const topGold = topGoldRef.current;
    const bottomGold = bottomGoldRef.current;

    if (!overlay || !logo || !line || !topGold || !bottomGold) return;

    gsap.killTweensOf([overlay, logo, line, topGold, bottomGold]);

    let typingTimeout: ReturnType<typeof setTimeout> | undefined;
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    let charIndex = 0;
    let cancelled = false;

    const typeNextChar = () => {
      if (cancelled) return;
      if (charIndex >= VENTURE_LINE.length) {
        gsap.to(bottomGold, {
          scaleX: 1,
          duration: 1.05,
          ease: "power2.inOut",
        });
        hideTimeout = setTimeout(() => {
          if (cancelled) return;
          gsap.to(overlay, {
            autoAlpha: 0,
            duration: 1.15,
            ease: "power2.out",
            onComplete: () => {
              setIsVisible(false);
              onCompleteRef.current?.();
            },
          });
        }, 750);
        return;
      }

      charIndex += 1;
      setTypedText(VENTURE_LINE.slice(0, charIndex));
      typingTimeout = setTimeout(typeNextChar, 78);
    };

    const ctx = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(logo, { autoAlpha: 0, y: 32, scale: 0.95 });
      gsap.set(line, { autoAlpha: 0, y: 8 });
      gsap.set([topGold, bottomGold], {
        scaleX: 0,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const tl = gsap.timeline();

      tl.fromTo(
        logo,
        { autoAlpha: 0, y: 32, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      )
        .to(
          topGold,
          {
            scaleX: 1,
            duration: 1.05,
            ease: "power2.inOut",
          },
          "-=0.15"
        )
        .to(
          line,
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "<0.45"
        )
        .call(
          () => {
            typingTimeout = setTimeout(typeNextChar, 220);
          },
          undefined,
          "<0.55"
        );
    }, overlay);

    return () => {
      cancelled = true;
      if (typingTimeout) clearTimeout(typingTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
      ctx.revert();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[120] flex items-center justify-center bg-black px-4 sm:px-6 md:px-8">
      <div className="flex w-full max-w-[min(100%,520px)] flex-col items-center gap-4 text-center sm:max-w-none sm:gap-6 md:gap-8">
        <div ref={logoRef} className="w-full px-2">
          <Image
            src="/assets/sanskar_logo_white.png"
            alt="Sanskar Realty"
            width={520}
            height={158}
            sizes="(max-width: 640px) 260px, (max-width: 768px) 360px, (max-width: 1024px) 440px, (max-width: 1280px) 520px, 540px"
            priority
            fetchPriority="high"
            className="mx-auto h-auto w-full max-w-[260px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[520px] xl:max-w-[540px]"
          />
        </div>

        {/* Golden lines match full sentence width (invisible layer reserves width while typing) */}
        <div className="grid w-full max-w-[min(100%,calc(100vw-2rem))] overflow-x-auto [grid-template-areas:'stack'] place-items-stretch sm:w-max sm:max-w-[min(100%,calc(100vw-3rem))] md:overflow-visible">
          <div
            className="invisible pointer-events-none flex min-w-0 flex-col gap-3 [grid-area:stack]"
            aria-hidden
          >
            <span className="block h-px w-full shrink-0 bg-transparent" />
            <p className="whitespace-nowrap text-center font-['Lato'] text-[10px] tracking-[0.12em] sm:text-[12px] sm:tracking-[0.18em] md:text-[13px] lg:text-[14px] xl:text-[15px]">
              {VENTURE_LINE}
              <span className="ml-1 inline-block h-[14px] w-[1px]" />
            </p>
            <span className="block h-px w-full shrink-0 bg-transparent" />
          </div>
          <div className="flex min-w-0 flex-col gap-3 [grid-area:stack]">
            <span
              ref={topGoldRef}
              className="block h-px w-full origin-center bg-[#D4AF37] will-change-transform"
              aria-hidden
            />
            <p
              ref={lineRef}
              className="whitespace-nowrap text-center font-['Lato'] text-[10px] tracking-[0.12em] text-white sm:text-[12px] sm:tracking-[0.18em] md:text-[13px] lg:text-[14px] xl:text-[15px]"
            >
              {typedText}
              <span className="ml-1 inline-block h-[14px] w-[1px] animate-pulse bg-white align-[-2px]" />
            </p>
            <span
              ref={bottomGoldRef}
              className="block h-px w-full origin-center bg-[#D4AF37] will-change-transform"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
