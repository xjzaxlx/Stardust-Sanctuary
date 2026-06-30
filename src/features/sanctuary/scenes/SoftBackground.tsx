"use client";

import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";

export function SoftBackground() {
  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <fog
        attach="fog"
        args={[
          sanctuarySceneConfig.fog.color,
          sanctuarySceneConfig.fog.near,
          sanctuarySceneConfig.fog.far,
        ]}
      />
      <ambientLight intensity={sanctuarySceneConfig.lighting.ambientIntensity} />
      <pointLight
        position={[2.6, 2.2, 3.8]}
        intensity={sanctuarySceneConfig.lighting.keyIntensity}
        color="#c9ecff"
      />
      <pointLight
        position={[-3.1, -1.7, 2.6]}
        intensity={sanctuarySceneConfig.lighting.fillIntensity}
        color="#d8c9ff"
      />
    </>
  );
}
