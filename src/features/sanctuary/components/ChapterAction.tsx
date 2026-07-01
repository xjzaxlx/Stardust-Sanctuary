"use client";

import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

export function ChapterAction() {
  const currentChapter = useSanctuaryStore((state) => state.currentChapter);
  const transitionToChapter = useSanctuaryStore((state) => state.transitionToChapter);

  if (currentChapter !== 3) {
    return null;
  }

  return (
    <div className="sanctuary-chapter-action">
      <button
        className="sanctuary-chapter-action__button"
        type="button"
        onClick={() => transitionToChapter(4)}
      >
        安静离开
      </button>
    </div>
  );
}
