"use client";

import { Line } from "@react-three/drei";
import { useMemo } from "react";
import type { AnxietyFragment } from "@/features/sanctuary/data/fragments";
import type { FragmentConnection } from "@/features/sanctuary/data/fragments";

type ConnectionLineProps = {
  connection: FragmentConnection;
  fragmentsById: Map<string, AnxietyFragment>;
  pulseIndex: number;
};

export function ConnectionLine({ connection, fragmentsById, pulseIndex }: ConnectionLineProps) {
  const glowOpacity = 0.14 + (pulseIndex % 3) * 0.015;
  const points = useMemo(() => {
    const from = fragmentsById.get(connection.fromId);
    const to = fragmentsById.get(connection.toId);

    if (!from || !to) {
      return [];
    }

    return [from.position, to.position];
  }, [connection.fromId, connection.toId, fragmentsById]);

  if (points.length < 2) {
    return null;
  }

  return (
    <>
      <Line points={points} color="#eefbff" lineWidth={1.1} transparent opacity={0.78} />
      <Line
        points={points}
        color="#8fdcff"
        lineWidth={4.2}
        transparent
        opacity={glowOpacity}
      />
    </>
  );
}
