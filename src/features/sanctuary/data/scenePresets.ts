export type ScenePresetId = "intro" | "fragments" | "connect" | "constellation" | "rest";

export type SceneTuning = {
  dustSpeedMultiplier: number;
  dustOpacity: number;
  fragmentGlowMultiplier: number;
  cameraDistance: number;
  sparklesOpacity: number;
};

export type AudioMoodId = "hushed" | "near" | "gathering" | "wide" | "rest";

export type AudioMood = {
  id: AudioMoodId;
  ambientGain: number;
  filterFrequency: number;
  interactionGainScale: number;
};

export const sanctuaryScenePresets: Record<ScenePresetId, SceneTuning> = {
  intro: {
    dustSpeedMultiplier: 0.62,
    dustOpacity: 0.4,
    fragmentGlowMultiplier: 0.72,
    cameraDistance: 6.8,
    sparklesOpacity: 0.12,
  },
  fragments: {
    dustSpeedMultiplier: 0.82,
    dustOpacity: 0.52,
    fragmentGlowMultiplier: 0.9,
    cameraDistance: 6.5,
    sparklesOpacity: 0.16,
  },
  connect: {
    dustSpeedMultiplier: 0.95,
    dustOpacity: 0.58,
    fragmentGlowMultiplier: 1,
    cameraDistance: 6.25,
    sparklesOpacity: 0.2,
  },
  constellation: {
    dustSpeedMultiplier: 0.7,
    dustOpacity: 0.66,
    fragmentGlowMultiplier: 1.22,
    cameraDistance: 6.05,
    sparklesOpacity: 0.3,
  },
  rest: {
    dustSpeedMultiplier: 0.42,
    dustOpacity: 0.34,
    fragmentGlowMultiplier: 0.82,
    cameraDistance: 6.9,
    sparklesOpacity: 0.1,
  },
};

export const sanctuaryAudioMoods: Record<AudioMoodId, AudioMood> = {
  hushed: {
    id: "hushed",
    ambientGain: 0.02,
    filterFrequency: 480,
    interactionGainScale: 0.82,
  },
  near: {
    id: "near",
    ambientGain: 0.024,
    filterFrequency: 560,
    interactionGainScale: 0.9,
  },
  gathering: {
    id: "gathering",
    ambientGain: 0.028,
    filterFrequency: 680,
    interactionGainScale: 1,
  },
  wide: {
    id: "wide",
    ambientGain: 0.03,
    filterFrequency: 720,
    interactionGainScale: 1.08,
  },
  rest: {
    id: "rest",
    ambientGain: 0.018,
    filterFrequency: 420,
    interactionGainScale: 0.72,
  },
};

export function getScenePreset(presetId: ScenePresetId) {
  return sanctuaryScenePresets[presetId];
}

export function getAudioMood(moodId: AudioMoodId) {
  return sanctuaryAudioMoods[moodId];
}
