"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

type NarrationPanelProps = {
  text: string;
};

export function NarrationPanel({ text }: NarrationPanelProps) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!panelRef.current) {
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
    );
  }, [text]);

  return (
    <aside ref={panelRef} className="sanctuary-narration" aria-live="polite">
      <p>{text}</p>
    </aside>
  );
}
