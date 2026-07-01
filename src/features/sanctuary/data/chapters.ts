import {
  getAudioMood,
  getScenePreset,
  type AudioMood,
  type AudioMoodId,
  type ScenePresetId,
  type SceneTuning,
} from "@/features/sanctuary/data/scenePresets";

export type ChapterId = 0 | 1 | 2 | 3 | 4;

export type SanctuaryChapter = {
  id: ChapterId;
  label: string;
  title: string;
  narration: string;
  scenePresetId: ScenePresetId;
  audioMoodId: AudioMoodId;
  sceneTuning: SceneTuning;
  audioMood: AudioMood;
};

export const sanctuaryChapters: Record<ChapterId, SanctuaryChapter> = {
  0: {
    id: 0,
    label: "Chapter 00 / 进入",
    title: "Intro",
    narration: "夜空并不要求你立刻完整。",
    scenePresetId: "intro",
    audioMoodId: "hushed",
    sceneTuning: getScenePreset("intro"),
    audioMood: getAudioMood("hushed"),
  },
  1: {
    id: 1,
    label: "Chapter 01 / 看见碎片",
    title: "Fragments",
    narration: "有些念头，只是还没有找到位置。",
    scenePresetId: "fragments",
    audioMoodId: "near",
    sceneTuning: getScenePreset("fragments"),
    audioMood: getAudioMood("near"),
  },
  2: {
    id: 2,
    label: "Chapter 02 / 慢慢连接",
    title: "Connect",
    narration: "把它们连起来，不是为了修好自己，而是为了看见自己。",
    scenePresetId: "connect",
    audioMoodId: "gathering",
    sceneTuning: getScenePreset("connect"),
    audioMood: getAudioMood("gathering"),
  },
  3: {
    id: 3,
    label: "Chapter 03 / 星座出现",
    title: "Constellation",
    narration: "你没有消除黑夜。你只是点亮了其中一小片。",
    scenePresetId: "constellation",
    audioMoodId: "wide",
    sceneTuning: getScenePreset("constellation"),
    audioMood: getAudioMood("wide"),
  },
  4: {
    id: 4,
    label: "Chapter 04 / 离开",
    title: "Rest",
    narration: "今晚，已经足够了。",
    scenePresetId: "rest",
    audioMoodId: "rest",
    sceneTuning: getScenePreset("rest"),
    audioMood: getAudioMood("rest"),
  },
};

export function getSanctuaryChapter(chapterId: ChapterId) {
  return sanctuaryChapters[chapterId];
}
