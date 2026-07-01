"use client";

import { Sparkles } from "@react-three/drei";
import { ConstellationConnector } from "@/features/sanctuary/components/ConstellationConnector";
import { FragmentCluster } from "@/features/sanctuary/components/FragmentCluster";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { CameraRig } from "@/features/sanctuary/scenes/CameraRig";
import { SoftBackground } from "@/features/sanctuary/scenes/SoftBackground";
import { StarDustField } from "@/features/sanctuary/scenes/StarDustField";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

function PostProcessingPlaceholder() {
  return null;
}

function CentralAnchor() {
  return (
    <mesh position={sanctuarySceneConfig.anchor.position}>
      <icosahedronGeometry args={[sanctuarySceneConfig.anchor.radius, 1]} />
      <meshStandardMaterial
        color="#d8f4ff"
        emissive="#7fc9ee"
        emissiveIntensity={0.34}
        roughness={0.58}
        transparent
        opacity={0.74}
      />
    </mesh>
  );
}

export function SanctuaryScene() {
  const sparklesOpacity = useSanctuaryStore(
    (state) => state.currentSceneTuning.sparklesOpacity,
  );

  return (
    <>
      <SoftBackground />
      <CameraRig />
      <StarDustField />
      <Sparkles
        count={28}
        scale={[5.2, 2.6, 3.6]}
        size={1.1}
        speed={0.08}
        opacity={sparklesOpacity}
        color="#eef9ff"
      />
      <ConstellationConnector />
      <FragmentCluster />
      <CentralAnchor />
      <PostProcessingPlaceholder />
    </>
  );
}
