import { create } from "zustand";
import {
  getSanctuaryChapter,
  type ChapterId,
  type SceneTuning,
} from "@/features/sanctuary/data/chapters";
import {
  fragmentConnectionOrder,
  type FragmentConnection,
  type PreviewPoint,
} from "@/features/sanctuary/data/fragments";
import {
  buildConnection,
  getNextFragmentId,
  isConstellationComplete,
  shouldStartConnection,
} from "@/features/sanctuary/utils/connectionRules";

type SanctuaryState = {
  hasEntered: boolean;
  currentNarration: string;
  currentChapterLabel: string;
  currentChapter: ChapterId;
  currentSceneTuning: SceneTuning;
  activeConstellationIndex: number;
  activeFragmentId: string | null;
  connectedFragmentIds: string[];
  connections: FragmentConnection[];
  previewPoint: PreviewPoint | null;
  nearFragmentId: string | null;
  constellationComplete: boolean;
  isAudioEnabled: boolean;
  enterSanctuary: () => void;
  transitionToChapter: (chapterId: ChapterId) => void;
  setActiveConstellationIndex: (index: number) => void;
  setCurrentNarration: (text: string) => void;
  startConnection: (fragmentId: string) => void;
  updatePreviewPoint: (point: PreviewPoint | null) => void;
  tryConnectFragment: (fragmentId: string) => void;
  completeConstellation: () => void;
  resetConnectionFlow: () => void;
  connectFragment: (fragmentId: string) => void;
  resetFragments: () => void;
  setNearFragmentId: (fragmentId: string) => void;
  clearNearFragmentId: (fragmentId: string) => void;
  setAudioEnabled: (isEnabled: boolean) => void;
};

function chapterState(chapterId: ChapterId) {
  const chapter = getSanctuaryChapter(chapterId);

  return {
    currentChapter: chapter.id,
    currentChapterLabel: chapter.label,
    currentNarration: chapter.narration,
    currentSceneTuning: chapter.sceneTuning,
  };
}

const initialChapter = getSanctuaryChapter(0);

export const useSanctuaryStore = create<SanctuaryState>((set) => ({
  hasEntered: false,
  currentNarration: initialChapter.narration,
  currentChapterLabel: initialChapter.label,
  currentChapter: initialChapter.id,
  currentSceneTuning: initialChapter.sceneTuning,
  activeConstellationIndex: 0,
  activeFragmentId: null,
  connectedFragmentIds: [],
  connections: [],
  previewPoint: null,
  nearFragmentId: null,
  constellationComplete: false,
  isAudioEnabled: false,
  enterSanctuary: () =>
    set({
      hasEntered: true,
      ...chapterState(1),
    }),
  transitionToChapter: (chapterId) => set(chapterState(chapterId)),
  setActiveConstellationIndex: (index) => set({ activeConstellationIndex: index }),
  setCurrentNarration: (text) => set({ currentNarration: text }),
  startConnection: (fragmentId) =>
    set((state) => {
      if (!shouldStartConnection(fragmentConnectionOrder, state.connectedFragmentIds, fragmentId)) {
        return state;
      }

      return {
        activeFragmentId: fragmentId,
        connectedFragmentIds: [fragmentId],
        previewPoint: null,
        ...chapterState(2),
      };
    }),
  updatePreviewPoint: (point) => set({ previewPoint: point }),
  tryConnectFragment: (fragmentId) =>
    set((state) => {
      if (state.constellationComplete) {
        return state;
      }

      if (!state.activeFragmentId) {
        if (!shouldStartConnection(fragmentConnectionOrder, state.connectedFragmentIds, fragmentId)) {
          return state;
        }

        return {
          activeFragmentId: fragmentId,
          connectedFragmentIds: [fragmentId],
          previewPoint: null,
          ...chapterState(2),
        };
      }

      const nextFragmentId = getNextFragmentId(fragmentConnectionOrder, state.connectedFragmentIds);

      if (fragmentId !== nextFragmentId || state.connectedFragmentIds.includes(fragmentId)) {
        return state;
      }

      const nextConnection = buildConnection(state.activeFragmentId, fragmentId);
      const connectedFragmentIds = [...state.connectedFragmentIds, fragmentId];
      const connections = [...state.connections, nextConnection];
      const constellationComplete = isConstellationComplete(fragmentConnectionOrder, connections);

      return {
        activeFragmentId: constellationComplete ? null : fragmentId,
        connectedFragmentIds,
        connections,
        previewPoint: null,
        constellationComplete,
        ...(constellationComplete ? chapterState(3) : {}),
      };
    }),
  completeConstellation: () =>
    set({
      activeFragmentId: null,
      previewPoint: null,
      constellationComplete: true,
      ...chapterState(3),
    }),
  resetConnectionFlow: () =>
    set({
      activeFragmentId: null,
      connectedFragmentIds: [],
      connections: [],
      previewPoint: null,
      nearFragmentId: null,
      constellationComplete: false,
      ...chapterState(1),
    }),
  connectFragment: (fragmentId) =>
    set((state) => {
      if (state.connectedFragmentIds.includes(fragmentId)) {
        return state;
      }

      return {
        connectedFragmentIds: [...state.connectedFragmentIds, fragmentId],
      };
    }),
  resetFragments: () => set({ connectedFragmentIds: [] }),
  setNearFragmentId: (fragmentId) => set({ nearFragmentId: fragmentId }),
  clearNearFragmentId: (fragmentId) =>
    set((state) => ({
      nearFragmentId: state.nearFragmentId === fragmentId ? null : state.nearFragmentId,
    })),
  setAudioEnabled: (isEnabled) => set({ isAudioEnabled: isEnabled }),
}));
