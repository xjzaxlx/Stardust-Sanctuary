"use client";

import { anxietyFragments } from "@/features/sanctuary/data/fragments";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";
import { FragmentMesh } from "@/features/sanctuary/components/FragmentMesh";

export function FragmentCluster() {
  const connectedFragmentIds = useSanctuaryStore((state) => state.connectedFragmentIds);
  const nearFragmentId = useSanctuaryStore((state) => state.nearFragmentId);
  const setNearFragmentId = useSanctuaryStore((state) => state.setNearFragmentId);
  const clearNearFragmentId = useSanctuaryStore((state) => state.clearNearFragmentId);
  const connectFragment = useSanctuaryStore((state) => state.connectFragment);

  return (
    <group>
      {anxietyFragments.map((fragment) => (
        <FragmentMesh
          key={fragment.id}
          fragment={fragment}
          connected={connectedFragmentIds.includes(fragment.id)}
          near={nearFragmentId === fragment.id}
          onNear={setNearFragmentId}
          onLeave={clearNearFragmentId}
          onConnect={connectFragment}
        />
      ))}
    </group>
  );
}
