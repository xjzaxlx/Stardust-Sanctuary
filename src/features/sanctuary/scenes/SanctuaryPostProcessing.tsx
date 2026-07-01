"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { usePostProcessingPreference } from "@/features/sanctuary/scenes/usePostProcessingPreference";

export function SanctuaryPostProcessing() {
  const isPostProcessingEnabled = usePostProcessingPreference();
  const config = sanctuarySceneConfig.postprocessing;

  if (!isPostProcessingEnabled) {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={config.bloomIntensity}
        luminanceThreshold={config.luminanceThreshold}
        luminanceSmoothing={config.luminanceSmoothing}
        mipmapBlur={config.mipmapBlur}
      />
    </EffectComposer>
  );
}
