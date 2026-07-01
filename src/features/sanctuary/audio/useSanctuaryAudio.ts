"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SanctuaryAudioManager } from "@/features/sanctuary/audio/SanctuaryAudioManager";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

export function useSanctuaryAudio() {
  const managerRef = useRef<SanctuaryAudioManager | null>(null);
  const lastConnectionCountRef = useRef(0);
  const hasPlayedCompleteRef = useRef(false);
  const [isMuted, setMutedState] = useState(false);
  const [isReady, setReady] = useState(false);
  const setAudioEnabled = useSanctuaryStore((state) => state.setAudioEnabled);

  const initialize = useCallback(async () => {
    if (!managerRef.current) {
      managerRef.current = new SanctuaryAudioManager();
    }

    await managerRef.current.initialize();
    managerRef.current.setMuted(isMuted);
    setReady(true);
    setAudioEnabled(true);
  }, [isMuted, setAudioEnabled]);

  const toggleMuted = useCallback(() => {
    setMutedState((nextMuted) => {
      const isNextMuted = !nextMuted;

      managerRef.current?.setMuted(isNextMuted);
      setAudioEnabled(!isNextMuted);

      return isNextMuted;
    });
  }, [setAudioEnabled]);

  useEffect(() => {
    return () => {
      setAudioEnabled(false);
      void managerRef.current?.dispose();
      managerRef.current = null;
    };
  }, [setAudioEnabled]);

  useEffect(() => {
    return useSanctuaryStore.subscribe((state) => {
      const manager = managerRef.current;

      if (!manager) {
        return;
      }

      manager.setNearFragment(Boolean(state.nearFragmentId));

      if (state.connections.length > lastConnectionCountRef.current) {
        manager.playConnection();
      }

      if (state.constellationComplete && !hasPlayedCompleteRef.current) {
        manager.playChapterComplete();
        hasPlayedCompleteRef.current = true;
      }

      if (!state.constellationComplete) {
        hasPlayedCompleteRef.current = false;
      }

      lastConnectionCountRef.current = state.connections.length;
    });
  }, []);

  return {
    initialize,
    isMuted,
    isReady,
    toggleMuted,
  };
}
