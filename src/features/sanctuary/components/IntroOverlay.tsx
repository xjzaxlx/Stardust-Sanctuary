"use client";

import { getSanctuaryChapter } from "@/features/sanctuary/data/chapters";

type IntroOverlayProps = {
  onEnter: () => void;
};

const introChapter = getSanctuaryChapter(0);

export function IntroOverlay({ onEnter }: IntroOverlayProps) {
  return (
    <section className="sanctuary-intro" aria-labelledby="sanctuary-title">
      <div className="sanctuary-intro__inner">
        <p className="sanctuary-intro__eyebrow">Stardust Sanctuary</p>
        <h1 id="sanctuary-title">星尘收容所</h1>
        <div className="sanctuary-intro__copy">
          <p>{introChapter.narration}</p>
        </div>
        <button className="sanctuary-intro__button" type="button" onClick={onEnter}>
          进入收容所
        </button>
      </div>
    </section>
  );
}
