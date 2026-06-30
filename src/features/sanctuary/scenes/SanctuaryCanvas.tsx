"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { SanctuaryScene } from "@/features/sanctuary/scenes/SanctuaryScene";

export function SanctuaryCanvas() {
  return (
    <div className="sanctuary-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: sanctuarySceneConfig.camera.position,
          fov: sanctuarySceneConfig.camera.fov,
        }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SanctuaryScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
