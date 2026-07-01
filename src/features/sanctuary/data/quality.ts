export type QualityPresetId = "high" | "medium" | "low";

export type QualityPreset = {
  id: QualityPresetId;
  dpr: [number, number];
  dustCount: number;
  dustOpacityScale: number;
  sparklesCount: number;
  enableBloom: boolean;
  bloomIntensityScale: number;
  fragmentHitScale: number;
  glPowerPreference: WebGLPowerPreference;
};

export const sanctuaryQualityDetection = {
  narrowWidth: 720,
  midWidth: 1024,
  lowCoreCount: 4,
  mediumCoreCount: 6,
  highDpr: 1.75,
  coarsePointerLowDpr: 2.5,
};

export const sanctuaryQualityPresets: Record<QualityPresetId, QualityPreset> = {
  high: {
    id: "high",
    dpr: [1, 1.5],
    dustCount: 520,
    dustOpacityScale: 1,
    sparklesCount: 28,
    enableBloom: true,
    bloomIntensityScale: 1,
    fragmentHitScale: 2.4,
    glPowerPreference: "high-performance",
  },
  medium: {
    id: "medium",
    dpr: [1, 1.25],
    dustCount: 340,
    dustOpacityScale: 0.86,
    sparklesCount: 18,
    enableBloom: true,
    bloomIntensityScale: 0.58,
    fragmentHitScale: 2.8,
    glPowerPreference: "high-performance",
  },
  low: {
    id: "low",
    dpr: [1, 1],
    dustCount: 190,
    dustOpacityScale: 0.72,
    sparklesCount: 8,
    enableBloom: false,
    bloomIntensityScale: 0,
    fragmentHitScale: 3.25,
    glPowerPreference: "low-power",
  },
};

export function getQualityPreset(presetId: QualityPresetId) {
  return sanctuaryQualityPresets[presetId];
}
