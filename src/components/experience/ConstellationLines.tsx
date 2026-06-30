"use client";

import { Line } from "@react-three/drei";
import type { Constellation, FragmentId } from "@/types/constellation";

type ConstellationLinesProps = {
  constellation: Constellation;
  connectedIds: FragmentId[];
};

export function ConstellationLines({
  constellation,
  connectedIds,
}: ConstellationLinesProps) {
  const points = connectedIds
    .map((id) => constellation.fragments.find((fragment) => fragment.id === id))
    .filter((fragment) => fragment !== undefined)
    .map((fragment) => fragment.position);

  if (points.length < 2) {
    return null;
  }

  return (
    <>
      <Line points={points} color="#effbff" lineWidth={1.6} transparent opacity={0.9} />
      <Line points={points} color="#74d7ff" lineWidth={5} transparent opacity={0.13} />
    </>
  );
}
