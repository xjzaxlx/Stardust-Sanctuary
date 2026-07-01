"use client";

import { useEffect, useState } from "react";
import {
  getQualityPreset,
  type QualityPreset,
  type QualityPresetId,
  sanctuaryQualityDetection,
} from "@/features/sanctuary/data/quality";

function resolveQualityPresetId(): QualityPresetId {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrow = window.matchMedia(
    `(max-width: ${sanctuaryQualityDetection.narrowWidth}px)`,
  ).matches;
  const isMidWidth = window.matchMedia(
    `(max-width: ${sanctuaryQualityDetection.midWidth}px)`,
  ).matches;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
  const dpr = window.devicePixelRatio || 1;

  if (
    prefersReducedMotion ||
    hardwareConcurrency <= sanctuaryQualityDetection.lowCoreCount ||
    (hasCoarsePointer && dpr >= sanctuaryQualityDetection.coarsePointerLowDpr)
  ) {
    return "low";
  }

  if (
    hasCoarsePointer ||
    isNarrow ||
    isMidWidth ||
    hardwareConcurrency <= sanctuaryQualityDetection.mediumCoreCount ||
    dpr > sanctuaryQualityDetection.highDpr
  ) {
    return "medium";
  }

  return "high";
}

export function useQualityPreset(): QualityPreset {
  const [presetId, setPresetId] = useState<QualityPresetId>("medium");

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia(`(max-width: ${sanctuaryQualityDetection.narrowWidth}px)`),
      window.matchMedia(`(max-width: ${sanctuaryQualityDetection.midWidth}px)`),
    ];

    function syncPreset() {
      setPresetId(resolveQualityPresetId());
    }

    syncPreset();

    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", syncPreset);
    }

    window.addEventListener("resize", syncPreset);

    return () => {
      for (const mediaQuery of mediaQueries) {
        mediaQuery.removeEventListener("change", syncPreset);
      }

      window.removeEventListener("resize", syncPreset);
    };
  }, []);

  return getQualityPreset(presetId);
}
