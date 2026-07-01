"use client";

type AudioToggleProps = {
  isMuted: boolean;
  isReady: boolean;
  onToggle: () => void;
};

export function AudioToggle({ isMuted, isReady, onToggle }: AudioToggleProps) {
  const label = isMuted ? "开启声音" : "静音";

  return (
    <button
      className="sanctuary-audio-toggle"
      type="button"
      onClick={onToggle}
      aria-pressed={!isMuted}
      aria-label={label}
    >
      {isReady || isMuted ? label : "静音"}
    </button>
  );
}
