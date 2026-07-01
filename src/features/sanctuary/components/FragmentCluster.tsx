"use client";

import { anxietyFragments } from "@/features/sanctuary/data/fragments";
import { getSanctuaryConstellation } from "@/features/sanctuary/data/constellations";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";
import { FragmentMesh } from "@/features/sanctuary/components/FragmentMesh";
import { getNextFragmentId } from "@/features/sanctuary/utils/connectionRules";

export function FragmentCluster() {
  const activeConstellationId = useSanctuaryStore((state) => state.activeConstellationId);
  const connectedFragmentIds = useSanctuaryStore((state) => state.connectedFragmentIds);
  const nearFragmentId = useSanctuaryStore((state) => state.nearFragmentId);
  const setNearFragmentId = useSanctuaryStore((state) => state.setNearFragmentId);
  const clearNearFragmentId = useSanctuaryStore((state) => state.clearNearFragmentId);
  const startConnection = useSanctuaryStore((state) => state.startConnection);
  const tryConnectFragment = useSanctuaryStore((state) => state.tryConnectFragment);
  const constellation = getSanctuaryConstellation(activeConstellationId);
  const nextFragmentId = getNextFragmentId(constellation.connectionOrder, connectedFragmentIds);

  return (
    <group>
      {anxietyFragments
        .filter((fragment) => constellation.fragmentIds.includes(fragment.id))
        .map((fragment) => (
          <FragmentMesh
            key={fragment.id}
            fragment={fragment}
            connected={connectedFragmentIds.includes(fragment.id)}
            near={nearFragmentId === fragment.id || nextFragmentId === fragment.id}
            onNear={setNearFragmentId}
            onLeave={clearNearFragmentId}
            onStartConnection={startConnection}
            onTryConnect={tryConnectFragment}
          />
        ))}
    </group>
  );
}
