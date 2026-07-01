"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import type { AnxietyFragment } from "@/features/sanctuary/data/fragments";
import type { FragmentConnection } from "@/features/sanctuary/data/fragments";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";

type ConnectionLineProps = {
  connection: FragmentConnection;
  fragmentsById: Map<string, AnxietyFragment>;
  isConstellationComplete: boolean;
  pulseIndex: number;
};

export function ConnectionLine({
  connection,
  fragmentsById,
  isConstellationComplete,
  pulseIndex,
}: ConnectionLineProps) {
  const glowOpacity =
    sanctuarySceneConfig.artDirection.lineGlowOpacity +
    (pulseIndex % 3) * 0.012 +
    (isConstellationComplete ? 0.06 : 0);
  const points = useMemo(() => {
    const from = fragmentsById.get(connection.fromId);
    const to = fragmentsById.get(connection.toId);

    if (!from || !to) {
      return [];
    }

    const jitter = sanctuarySceneConfig.artDirection.lineJitter;
    const direction = pulseIndex % 2 === 0 ? 1 : -1;
    const midpoint: [number, number, number] = [
      (from.position[0] + to.position[0]) / 2 + direction * jitter * 0.42,
      (from.position[1] + to.position[1]) / 2 + Math.sin(pulseIndex + 1) * jitter,
      (from.position[2] + to.position[2]) / 2 - 0.04,
    ];

    return [from.position, midpoint, to.position];
  }, [connection.fromId, connection.toId, fragmentsById, pulseIndex]);

  if (points.length < 2) {
    return null;
  }

  return (
    <>
      <Line
        points={points}
        color="#f1f0e8"
        lineWidth={0.95}
        transparent
        opacity={isConstellationComplete ? 0.8 : 0.68}
      />
      <Line
        points={points}
        color="#a8d9df"
        lineWidth={isConstellationComplete ? 4.6 : 3.6}
        transparent
        opacity={glowOpacity}
      />
    </>
  );
}
