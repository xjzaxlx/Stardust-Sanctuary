"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type NarrationOverlayProps = {
  text: string;
};

export function NarrationOverlay({ text }: NarrationOverlayProps) {
  const lineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!lineRef.current) {
      return;
    }

    gsap.fromTo(
      lineRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" },
    );
  }, [text]);

  return (
    <div className="sanctuary__narration" aria-live="polite">
      <p ref={lineRef}>{text}</p>
    </div>
  );
}
