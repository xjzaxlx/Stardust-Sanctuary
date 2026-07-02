"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { sanctuaryCopy } from "@/features/sanctuary/data/content";
import { useReducedMotionPreference } from "@/features/sanctuary/utils/useReducedMotionPreference";

type NarrationPanelProps = {
  text: string;
};

export function NarrationPanel({ text }: NarrationPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(panelRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
    );
  }, [prefersReducedMotion, text]);

  return (
    <aside
      ref={panelRef}
      className="sanctuary-narration"
      aria-live="polite"
      aria-label={sanctuaryCopy.accessibility.narrationLabel}
    >
      <p>{text}</p>
    </aside>
  );
}
