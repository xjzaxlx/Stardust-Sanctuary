"use client";

import { useCallback } from "react";
import type { CSSProperties } from "react";
import { useSanctuaryAudio } from "@/features/sanctuary/audio/useSanctuaryAudio";
import { AudioToggle } from "@/features/sanctuary/components/AudioToggle";
import { IntroOverlay } from "@/features/sanctuary/components/IntroOverlay";
import { ChapterAction } from "@/features/sanctuary/components/ChapterAction";
import { MouseHint } from "@/features/sanctuary/components/MouseHint";
import { NarrationPanel } from "@/features/sanctuary/components/NarrationPanel";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { SanctuaryCanvas } from "@/features/sanctuary/scenes/SanctuaryCanvas";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

export function SanctuaryExperience() {
  const hasEntered = useSanctuaryStore((state) => state.hasEntered);
  const enterSanctuary = useSanctuaryStore((state) => state.enterSanctuary);
  const currentNarration = useSanctuaryStore((state) => state.currentNarration);
  const currentChapterLabel = useSanctuaryStore((state) => state.currentChapterLabel);
  const { initialize, isMuted, isReady, toggleMuted } = useSanctuaryAudio();
  const handleEnter = useCallback(() => {
    void initialize().catch(() => undefined);
    enterSanctuary();
  }, [enterSanctuary, initialize]);
  const artDirectionStyle = {
    "--sanctuary-grain-opacity": sanctuarySceneConfig.artDirection.grainEnabled
      ? sanctuarySceneConfig.artDirection.grainOpacity
      : 0,
    "--sanctuary-paper-tint-opacity": sanctuarySceneConfig.artDirection.paperTintOpacity,
    "--sanctuary-vignette-opacity": sanctuarySceneConfig.artDirection.vignetteOpacity,
  } as CSSProperties;

  return (
    <main className="sanctuary-shell" data-entered={hasEntered} style={artDirectionStyle}>
      {hasEntered ? <SanctuaryCanvas /> : null}
      <div className="sanctuary-shell__sky" aria-hidden="true" />
      <div className="sanctuary-shell__shade" aria-hidden="true" />
      <div className="sanctuary-shell__paper" aria-hidden="true" />
      <div className="sanctuary-shell__vignette" aria-hidden="true" />
      {!hasEntered ? <IntroOverlay onEnter={handleEnter} /> : null}
      <div className="sanctuary-shell__ui">
        <p className="sanctuary-shell__kicker">Stardust Sanctuary</p>
        <div className="sanctuary-shell__chapter" aria-label="Current chapter">
          {currentChapterLabel}
        </div>
      </div>
      {hasEntered ? (
        <AudioToggle isMuted={isMuted} isReady={isReady} onToggle={toggleMuted} />
      ) : null}
      {hasEntered ? (
        <>
          <NarrationPanel text={currentNarration} />
          <ChapterAction />
          <MouseHint />
        </>
      ) : null}
    </main>
  );
}
