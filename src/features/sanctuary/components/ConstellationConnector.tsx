"use client";

import { ThreeEvent } from "@react-three/fiber";
import { useMemo } from "react";
import {
  anxietyFragments,
  type PreviewPoint,
} from "@/features/sanctuary/data/fragments";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";
import { ConstellationGlowPulse } from "@/features/sanctuary/components/ConstellationGlowPulse";
import { ConnectionLine } from "@/features/sanctuary/components/ConnectionLine";
import { PreviewLine } from "@/features/sanctuary/components/PreviewLine";

export function ConstellationConnector() {
  const activeFragmentId = useSanctuaryStore((state) => state.activeFragmentId);
  const connections = useSanctuaryStore((state) => state.connections);
  const previewPoint = useSanctuaryStore((state) => state.previewPoint);
  const constellationComplete = useSanctuaryStore((state) => state.constellationComplete);
  const updatePreviewPoint = useSanctuaryStore((state) => state.updatePreviewPoint);
  const fragmentsById = useMemo(
    () => new Map(anxietyFragments.map((fragment) => [fragment.id, fragment])),
    [],
  );
  const activeFragment = activeFragmentId ? fragmentsById.get(activeFragmentId) : undefined;

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    if (!activeFragmentId || constellationComplete) {
      return;
    }

    event.stopPropagation();
    updatePreviewPoint([event.point.x, event.point.y, event.point.z] satisfies PreviewPoint);
  }

  function handlePointerOut() {
    updatePreviewPoint(null);
  }

  return (
    <group>
      {connections.map((connection, index) => (
        <ConnectionLine
          key={`${connection.fromId}-${connection.toId}`}
          connection={connection}
          fragmentsById={fragmentsById}
          isConstellationComplete={constellationComplete}
          pulseIndex={index}
        />
      ))}
      <ConstellationGlowPulse active={constellationComplete} />
      {!constellationComplete ? (
        <PreviewLine activeFragment={activeFragment} previewPoint={previewPoint} />
      ) : null}
      <mesh
        position={[0, 0, -0.04]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[5.2, 3.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
