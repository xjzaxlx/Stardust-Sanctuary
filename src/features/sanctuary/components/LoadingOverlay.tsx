"use client";

import { sanctuaryCopy } from "@/features/sanctuary/data/content";

type LoadingOverlayProps = {
  visible: boolean;
};

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <section
      className="sanctuary-loading"
      aria-live="polite"
      aria-label={sanctuaryCopy.loading.ariaLabel}
    >
      <div className="sanctuary-loading__inner">
        <p className="sanctuary-loading__eyebrow">{sanctuaryCopy.loading.eyebrow}</p>
        <p className="sanctuary-loading__text">{sanctuaryCopy.loading.text}</p>
        <p className="sanctuary-loading__progress">{sanctuaryCopy.loading.progress}</p>
      </div>
    </section>
  );
}
