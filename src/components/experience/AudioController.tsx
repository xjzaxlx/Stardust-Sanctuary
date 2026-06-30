"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createStardustAudio, type StardustAudio } from "@/lib/audio";

export type StardustAudioHandle = {
  playConnect: () => void;
  playComplete: () => void;
};

export const AudioController = forwardRef<StardustAudioHandle>(function AudioController(
  _props,
  ref,
) {
  const audioRef = useRef<StardustAudio | null>(null);
  const [enabled, setEnabled] = useState(false);

  useImperativeHandle(ref, () => ({
    playConnect: () => audioRef.current?.playConnect(),
    playComplete: () => audioRef.current?.playComplete(),
  }));

  useEffect(() => {
    return () => {
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, []);

  async function toggleAudio() {
    if (!audioRef.current) {
      audioRef.current = createStardustAudio();
    }

    if (!audioRef.current) {
      setEnabled(false);
      return;
    }

    if (audioRef.current.isRunning()) {
      await audioRef.current.suspend();
      setEnabled(false);
      return;
    }

    await audioRef.current.resume();
    setEnabled(true);
  }

  return (
    <div className="sanctuary__audio">
      <button
        className="sanctuary__audio-button"
        type="button"
        onClick={toggleAudio}
        aria-pressed={enabled}
      >
        {enabled ? "Sound on" : "Sound off"}
      </button>
    </div>
  );
});
