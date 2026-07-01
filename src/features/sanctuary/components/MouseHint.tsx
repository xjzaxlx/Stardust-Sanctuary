"use client";

import { sanctuaryCopy } from "@/features/sanctuary/data/content";

export function MouseHint() {
  return <p className="sanctuary-mouse-hint">{sanctuaryCopy.hints.pointer}</p>;
}
