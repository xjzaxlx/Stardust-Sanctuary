"use client";

import { IntroOverlay } from "@/features/sanctuary/components/IntroOverlay";
import { MouseHint } from "@/features/sanctuary/components/MouseHint";
import { NarrationPanel } from "@/features/sanctuary/components/NarrationPanel";
import { SanctuaryCanvas } from "@/features/sanctuary/scenes/SanctuaryCanvas";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

export function SanctuaryExperience() {
  const hasEntered = useSanctuaryStore((state) => state.hasEntered);
  const enterSanctuary = useSanctuaryStore((state) => state.enterSanctuary);
  const currentNarration = useSanctuaryStore((state) => state.currentNarration);
  const currentChapterLabel = useSanctuaryStore((state) => state.currentChapterLabel);

  return (
    <main className="sanctuary-shell" data-entered={hasEntered}>
      {hasEntered ? <SanctuaryCanvas /> : null}
      <div className="sanctuary-shell__sky" aria-hidden="true" />
      <div className="sanctuary-shell__shade" aria-hidden="true" />
      {!hasEntered ? <IntroOverlay onEnter={enterSanctuary} /> : null}
      <div className="sanctuary-shell__ui">
        <p className="sanctuary-shell__kicker">Stardust Sanctuary</p>
        <div className="sanctuary-shell__chapter" aria-label="Current chapter">
          {currentChapterLabel}
        </div>
      </div>
      {hasEntered ? (
        <>
          <NarrationPanel text={currentNarration} />
          <MouseHint />
        </>
      ) : null}
    </main>
  );
}
