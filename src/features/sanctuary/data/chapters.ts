export type ChapterId = 0 | 1 | 2 | 3 | 4;

export type SceneTuning = {
  dustSpeedMultiplier: number;
  dustOpacity: number;
  fragmentGlowMultiplier: number;
  cameraDistance: number;
  sparklesOpacity: number;
};

export type SanctuaryChapter = {
  id: ChapterId;
  label: string;
  title: string;
  narration: string;
  sceneTuning: SceneTuning;
};

export const sanctuaryChapters: Record<ChapterId, SanctuaryChapter> = {
  0: {
    id: 0,
    label: "Chapter 00 / 进入",
    title: "Intro",
    narration: "夜空并不要求你立刻完整。",
    sceneTuning: {
      dustSpeedMultiplier: 0.62,
      dustOpacity: 0.4,
      fragmentGlowMultiplier: 0.72,
      cameraDistance: 6.8,
      sparklesOpacity: 0.12,
    },
  },
  1: {
    id: 1,
    label: "Chapter 01 / 看见碎片",
    title: "Fragments",
    narration: "有些念头，只是还没有找到位置。",
    sceneTuning: {
      dustSpeedMultiplier: 0.82,
      dustOpacity: 0.52,
      fragmentGlowMultiplier: 0.9,
      cameraDistance: 6.5,
      sparklesOpacity: 0.16,
    },
  },
  2: {
    id: 2,
    label: "Chapter 02 / 慢慢连接",
    title: "Connect",
    narration: "把它们连起来，不是为了修好自己，而是为了看见自己。",
    sceneTuning: {
      dustSpeedMultiplier: 0.95,
      dustOpacity: 0.58,
      fragmentGlowMultiplier: 1,
      cameraDistance: 6.25,
      sparklesOpacity: 0.2,
    },
  },
  3: {
    id: 3,
    label: "Chapter 03 / 星座出现",
    title: "Constellation",
    narration: "你没有消除黑夜。你只是点亮了其中一小片。",
    sceneTuning: {
      dustSpeedMultiplier: 0.7,
      dustOpacity: 0.66,
      fragmentGlowMultiplier: 1.22,
      cameraDistance: 6.05,
      sparklesOpacity: 0.3,
    },
  },
  4: {
    id: 4,
    label: "Chapter 04 / 离开",
    title: "Rest",
    narration: "今晚，已经足够了。",
    sceneTuning: {
      dustSpeedMultiplier: 0.42,
      dustOpacity: 0.34,
      fragmentGlowMultiplier: 0.82,
      cameraDistance: 6.9,
      sparklesOpacity: 0.1,
    },
  },
};

export function getSanctuaryChapter(chapterId: ChapterId) {
  return sanctuaryChapters[chapterId];
}
