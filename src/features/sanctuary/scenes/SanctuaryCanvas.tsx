"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { SanctuaryScene } from "@/features/sanctuary/scenes/SanctuaryScene";
import { useQualityPreset } from "@/features/sanctuary/utils/useQualityPreset";

type SanctuaryCanvasProps = {
  onSceneReady?: () => void;
};

function SanctuarySceneFallback() {
  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <fog attach="fog" args={["#02030a", 5, 11]} />
    </>
  );
}

function SanctuarySceneReady({ onSceneReady }: SanctuaryCanvasProps) {
  useEffect(() => {
    onSceneReady?.();
  }, [onSceneReady]);

  return null;
}

export function SanctuaryCanvas({ onSceneReady }: SanctuaryCanvasProps) {
  const qualityPreset = useQualityPreset();

  return (
    <div className="sanctuary-canvas" aria-hidden="true" data-quality={qualityPreset.id}>
      <Canvas
        dpr={qualityPreset.dpr}
        camera={{
          position: sanctuarySceneConfig.camera.position,
          fov: sanctuarySceneConfig.camera.fov,
        }}
        gl={{
          antialias: qualityPreset.id !== "low",
          alpha: false,
          powerPreference: qualityPreset.glPowerPreference,
        }}
      >
        <Suspense fallback={<SanctuarySceneFallback />}>
          <SanctuaryScene />
          <SanctuarySceneReady onSceneReady={onSceneReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
