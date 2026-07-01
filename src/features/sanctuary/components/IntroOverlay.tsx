"use client";

import { getSanctuaryChapter } from "@/features/sanctuary/data/chapters";
import { sanctuaryCopy } from "@/features/sanctuary/data/content";

type IntroOverlayProps = {
  onEnter: () => void;
};

const introChapter = getSanctuaryChapter(0);

export function IntroOverlay({ onEnter }: IntroOverlayProps) {
  return (
    <section className="sanctuary-intro" aria-labelledby="sanctuary-title">
      <div className="sanctuary-intro__inner">
        <p className="sanctuary-intro__eyebrow">{sanctuaryCopy.brand.eyebrow}</p>
        <h1 id="sanctuary-title">{sanctuaryCopy.brand.title}</h1>
        <div className="sanctuary-intro__copy">
          <p>{introChapter.narration}</p>
        </div>
        <button className="sanctuary-intro__button" type="button" onClick={onEnter}>
          {sanctuaryCopy.intro.enterButton}
        </button>
      </div>
    </section>
  );
}
