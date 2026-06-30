"use client";

import { Line } from "@react-three/drei";
import type { AnxietyFragment, PreviewPoint } from "@/features/sanctuary/data/fragments";

type PreviewLineProps = {
  activeFragment: AnxietyFragment | undefined;
  previewPoint: PreviewPoint | null;
};

export function PreviewLine({ activeFragment, previewPoint }: PreviewLineProps) {
  if (!activeFragment || !previewPoint) {
    return null;
  }

  return (
    <>
      <Line
        points={[activeFragment.position, previewPoint]}
        color="#e9f8ff"
        lineWidth={0.8}
        transparent
        opacity={0.44}
      />
      <Line
        points={[activeFragment.position, previewPoint]}
        color="#91d9ff"
        lineWidth={2.8}
        transparent
        opacity={0.1}
      />
    </>
  );
}
