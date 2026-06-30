import { create } from "zustand";

type SanctuaryState = {
  hasEntered: boolean;
  currentNarration: string;
  currentChapterLabel: string;
  activeConstellationIndex: number;
  connectedFragmentIds: string[];
  nearFragmentId: string | null;
  isAudioEnabled: boolean;
  enterSanctuary: () => void;
  setActiveConstellationIndex: (index: number) => void;
  setCurrentNarration: (text: string) => void;
  connectFragment: (fragmentId: string) => void;
  resetFragments: () => void;
  setNearFragmentId: (fragmentId: string) => void;
  clearNearFragmentId: (fragmentId: string) => void;
  setAudioEnabled: (isEnabled: boolean) => void;
};

export const useSanctuaryStore = create<SanctuaryState>((set) => ({
  hasEntered: false,
  currentNarration: "把散落的念头，慢慢放回夜空。",
  currentChapterLabel: "Chapter 01 / 初入夜空",
  activeConstellationIndex: 0,
  connectedFragmentIds: [],
  nearFragmentId: null,
  isAudioEnabled: false,
  enterSanctuary: () =>
    set({
      hasEntered: true,
      currentNarration: "每一块碎片，都不是错误。",
    }),
  setActiveConstellationIndex: (index) => set({ activeConstellationIndex: index }),
  setCurrentNarration: (text) => set({ currentNarration: text }),
  connectFragment: (fragmentId) =>
    set((state) => {
      if (state.connectedFragmentIds.includes(fragmentId)) {
        return state;
      }

      return {
        connectedFragmentIds: [...state.connectedFragmentIds, fragmentId],
        currentNarration: "它被看见了，也就不必独自漂浮。",
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
