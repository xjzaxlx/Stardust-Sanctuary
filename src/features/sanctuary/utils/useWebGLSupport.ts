"use client";

import { useState } from "react";

function detectWebGLSupport() {
  if (typeof document === "undefined") {
    return null;
  }

  const canvas = document.createElement("canvas");

  return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
}

export function useWebGLSupport() {
  const [isWebGLSupported] = useState<boolean | null>(() => detectWebGLSupport());

  return isWebGLSupported;
}
