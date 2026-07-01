"use client";

import { useEffect, useState } from "react";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";

function shouldEnablePostProcessing() {
  const config = sanctuarySceneConfig.postprocessing;

  if (!config.enabled) {
    return false;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrowViewport = window.matchMedia("(max-width: 760px)").matches;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
  const isLowPerformance = hardwareConcurrency <= 4 || prefersReducedMotion;
  const isMobileLike = hasCoarsePointer || isNarrowViewport;

  if (isMobileLike && !config.mobileEnabled) {
    return false;
  }

  if (isLowPerformance && !config.lowPerformanceEnabled) {
    return false;
  }

  return true;
}

export function usePostProcessingPreference() {
  const [isEnabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(max-width: 760px)"),
    ];

    function syncPreference() {
      setEnabled(shouldEnablePostProcessing());
    }

    syncPreference();

    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", syncPreference);
    }

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", syncPreference);
      }
    };
  }, []);

  return isEnabled;
}
