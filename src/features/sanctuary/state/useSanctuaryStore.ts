import { create } from "zustand";
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
  currentChapter: number;
  activeConstellationIndex: number;
  activeFragmentId: string | null;
  connectedFragmentIds: string[];
  connections: FragmentConnection[];
  previewPoint: PreviewPoint | null;
  nearFragmentId: string | null;
  constellationComplete: boolean;
  isAudioEnabled: boolean;
  enterSanctuary: () => void;
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

const openingNarration = "把散落的念头，慢慢放回夜空。";
const enteredNarration = "每一块碎片，都不是错误。";
const connectedNarration = "它被看见了，也就不必独自漂浮。";
const completeNarration = "它们连在一起时，你也不必独自承担。";

export const useSanctuaryStore = create<SanctuaryState>((set) => ({
  hasEntered: false,
  currentNarration: openingNarration,
  currentChapterLabel: "Chapter 01 / 初入夜空",
  currentChapter: 1,
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
      currentNarration: enteredNarration,
    }),
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
        currentNarration: "先从一块碎片开始，慢慢靠近下一点微光。",
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
          currentNarration: "第一块碎片安静下来了。",
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
        currentChapter: constellationComplete ? 2 : state.currentChapter,
        currentChapterLabel: constellationComplete
          ? "Chapter 02 / 星座成形"
          : state.currentChapterLabel,
        currentNarration: constellationComplete ? completeNarration : connectedNarration,
      };
    }),
  completeConstellation: () =>
    set({
      activeFragmentId: null,
      previewPoint: null,
      constellationComplete: true,
      currentChapter: 2,
      currentChapterLabel: "Chapter 02 / 星座成形",
      currentNarration: completeNarration,
    }),
  resetConnectionFlow: () =>
    set({
      activeFragmentId: null,
      connectedFragmentIds: [],
      connections: [],
      previewPoint: null,
      nearFragmentId: null,
      constellationComplete: false,
      currentChapter: 1,
      currentChapterLabel: "Chapter 01 / 初入夜空",
      currentNarration: enteredNarration,
    }),
  connectFragment: (fragmentId) =>
    set((state) => {
      if (state.connectedFragmentIds.includes(fragmentId)) {
        return state;
      }

      return {
        connectedFragmentIds: [...state.connectedFragmentIds, fragmentId],
        currentNarration: connectedNarration,
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
