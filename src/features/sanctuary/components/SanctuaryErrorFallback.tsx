"use client";

import { sanctuaryCopy } from "@/features/sanctuary/data/content";

type SanctuaryErrorFallbackProps = {
  onRetry: () => void;
};

export function SanctuaryErrorFallback({ onRetry }: SanctuaryErrorFallbackProps) {
  return (
    <section className="sanctuary-error" role="alert" aria-live="assertive">
      <div className="sanctuary-error__inner">
        <p className="sanctuary-error__eyebrow">{sanctuaryCopy.error.eyebrow}</p>
        <p className="sanctuary-error__text">{sanctuaryCopy.error.text}</p>
        <button className="sanctuary-error__button" type="button" onClick={onRetry}>
          {sanctuaryCopy.error.retryButton}
        </button>
      </div>
    </section>
  );
}
