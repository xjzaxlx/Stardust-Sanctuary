"use client";

import { sanctuaryCopy } from "@/features/sanctuary/data/content";
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
        aria-label={sanctuaryCopy.actions.restAriaLabel}
      >
        {sanctuaryCopy.actions.rest}
      </button>
    </div>
  );
}
