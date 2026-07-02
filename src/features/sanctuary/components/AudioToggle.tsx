"use client";

import { sanctuaryCopy } from "@/features/sanctuary/data/content";

type AudioToggleProps = {
  isMuted: boolean;
  isReady: boolean;
  onToggle: () => void;
};

export function AudioToggle({ isMuted, isReady, onToggle }: AudioToggleProps) {
  const label = isMuted ? sanctuaryCopy.audio.muted : sanctuaryCopy.audio.unmuted;
  const ariaLabel = isMuted ? sanctuaryCopy.audio.ariaMuted : sanctuaryCopy.audio.ariaUnmuted;

  return (
    <button
      className="sanctuary-audio-toggle"
      type="button"
      onClick={onToggle}
      aria-pressed={!isMuted}
      aria-label={ariaLabel}
    >
      {isReady || isMuted ? label : sanctuaryCopy.audio.pending}
    </button>
  );
}
