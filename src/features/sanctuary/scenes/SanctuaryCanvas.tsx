"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { SanctuaryScene } from "@/features/sanctuary/scenes/SanctuaryScene";
import { useQualityPreset } from "@/features/sanctuary/utils/useQualityPreset";

export function SanctuaryCanvas() {
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
        <Suspense fallback={null}>
          <SanctuaryScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
