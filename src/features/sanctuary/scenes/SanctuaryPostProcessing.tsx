"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { useQualityPreset } from "@/features/sanctuary/utils/useQualityPreset";

export function SanctuaryPostProcessing() {
  const qualityPreset = useQualityPreset();
  const config = sanctuarySceneConfig.postprocessing;

  if (!config.enabled || !qualityPreset.enableBloom) {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={config.bloomIntensity * qualityPreset.bloomIntensityScale}
        luminanceThreshold={config.luminanceThreshold}
        luminanceSmoothing={config.luminanceSmoothing}
        mipmapBlur={config.mipmapBlur}
      />
    </EffectComposer>
  );
}
