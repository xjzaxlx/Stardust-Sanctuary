"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AudioController, type StardustAudioHandle } from "@/components/experience/AudioController";
import { NarrationOverlay } from "@/components/experience/NarrationOverlay";
import { StardustScene } from "@/components/experience/StardustScene";
import { constellations } from "@/data/constellations";
import { getNarration, openingNarration } from "@/data/narration";
import { getNextFragmentId } from "@/lib/interaction";
import { sceneConfig } from "@/lib/sceneConfig";
import type { FragmentId } from "@/types/constellation";

export function StardustCanvas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [connectedIds, setConnectedIds] = useState<FragmentId[]>([]);
  const [narration, setNarration] = useState(openingNarration);
  const [isComplete, setIsComplete] = useState(false);
  const audioRef = useRef<StardustAudioHandle>(null);
  const transitionRef = useRef<number | null>(null);
  const activeConstellation = constellations[activeIndex];

  useEffect(() => {
    return () => {
      if (transitionRef.current) {
        window.clearTimeout(transitionRef.current);
      }
      document.body.style.cursor = "auto";
    };
  }, []);

  const handleFragmentSelect = useCallback(
    (id: FragmentId) => {
      if (isComplete) {
        return;
      }

      const nextFragmentId = getNextFragmentId(activeConstellation, connectedIds);

      if (id !== nextFragmentId || connectedIds.includes(id)) {
        return;
      }

      const nextConnectedIds = [...connectedIds, id];
      setConnectedIds(nextConnectedIds);
      audioRef.current?.playConnect();

      if (nextConnectedIds.length === activeConstellation.connectionOrder.length) {
        setIsComplete(true);
        setNarration(getNarration(activeConstellation.id));
        audioRef.current?.playComplete();
        transitionRef.current = window.setTimeout(() => {
          setActiveIndex((currentIndex) => (currentIndex + 1) % constellations.length);
          setConnectedIds([]);
          setIsComplete(false);
        }, sceneConfig.completionDelayMs);
      }
    },
    [activeConstellation, connectedIds, isComplete],
  );

  return (
    <main className="sanctuary">
      <div className="sanctuary__canvas">
        <Canvas
          dpr={[1, 1.6]}
          camera={{ position: [0, 0, sceneConfig.cameraZ], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <StardustScene
              constellation={activeConstellation}
              connectedIds={connectedIds}
              isComplete={isComplete}
              onFragmentSelect={handleFragmentSelect}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="sanctuary__vignette" />
      <section className="sanctuary__title" aria-label="Stardust Sanctuary">
        <p className="sanctuary__eyebrow">Stardust Sanctuary</p>
        <h1>星尘收容所</h1>
        <p className="sanctuary__constellation">
          {activeConstellation.name} / {activeConstellation.subtitle}
        </p>
      </section>
      <NarrationOverlay text={narration} />
      <AudioController ref={audioRef} />
    </main>
  );
}
