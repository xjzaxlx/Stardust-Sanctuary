"use client";

import { getSanctuaryConstellation } from "@/features/sanctuary/data/constellations";
import { sanctuaryCopy } from "@/features/sanctuary/data/content";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

type WebGLFallbackProps = {
  onRetry: () => void;
};

export function WebGLFallback({ onRetry }: WebGLFallbackProps) {
  const currentNarration = useSanctuaryStore((state) => state.currentNarration);
  const activeConstellationId = useSanctuaryStore((state) => state.activeConstellationId);
  const constellation = getSanctuaryConstellation(activeConstellationId);

  return (
    <section className="sanctuary-webgl-fallback" aria-labelledby="sanctuary-fallback-title">
      <div className="sanctuary-webgl-fallback__inner">
        <p className="sanctuary-webgl-fallback__eyebrow">{sanctuaryCopy.brand.eyebrow}</p>
        <h2 id="sanctuary-fallback-title">{sanctuaryCopy.webglFallback.title}</h2>
        <p className="sanctuary-webgl-fallback__narration">{currentNarration}</p>
        <div className="sanctuary-webgl-fallback__constellation">
          <p>{constellation.name}</p>
          <p>{constellation.description}</p>
          <p>{constellation.completionNarration}</p>
        </div>
        <p className="sanctuary-disclaimer">{sanctuaryCopy.accessibility.disclaimer}</p>
        <button className="sanctuary-webgl-fallback__button" type="button" onClick={onRetry}>
          {sanctuaryCopy.webglFallback.retryButton}
        </button>
      </div>
    </section>
  );
}
