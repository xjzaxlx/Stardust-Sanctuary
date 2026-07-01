"use client";

import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { AnxietyFragment } from "@/features/sanctuary/data/fragments";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

type FragmentMeshProps = {
  fragment: AnxietyFragment;
  connected: boolean;
  near: boolean;
  onNear: (fragmentId: string) => void;
  onLeave: (fragmentId: string) => void;
  onStartConnection: (fragmentId: string) => void;
  onTryConnect: (fragmentId: string) => void;
};

export function FragmentMesh({
  fragment,
  connected,
  near,
  onNear,
  onLeave,
  onStartConnection,
  onTryConnect,
}: FragmentMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const basePosition = useRef(new THREE.Vector3(...fragment.position));
  const driftPhase = fragment.emotionWeight * 8.7;
  const fragmentGlowMultiplier = useSanctuaryStore(
    (state) => state.currentSceneTuning.fragmentGlowMultiplier,
  );

  useFrame(({ clock }) => {
    const group = groupRef.current;
    const material = materialRef.current;

    if (!group || !material) {
      return;
    }

    const time = clock.elapsedTime;
    const instability = connected ? 0.28 : 0.72 + fragment.emotionWeight * 0.28;
    const targetScale = connected ? 1.1 : near ? 1.18 : 1;
    const rotationSpeed = connected ? 0.18 : near ? 0.11 : 0.34 + fragment.emotionWeight * 0.16;
    const floatAmount = connected ? 0.025 : 0.065 * instability;

    group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    group.position.y =
      basePosition.current.y + Math.sin(time * (0.56 + instability * 0.18) + driftPhase) * floatAmount;
    group.position.x =
      basePosition.current.x + Math.cos(time * 0.38 + driftPhase) * floatAmount * 0.45;
    group.rotation.x += 0.004 * rotationSpeed;
    group.rotation.y += 0.006 * rotationSpeed;
    group.rotation.z += connected ? 0.0008 : 0.0018 * instability;

    material.emissiveIntensity = THREE.MathUtils.lerp(
      material.emissiveIntensity,
      (connected ? 0.7 : near ? 0.56 : 0.2) * fragmentGlowMultiplier,
      0.08,
    );
    material.opacity = THREE.MathUtils.lerp(
      material.opacity,
      connected ? 0.96 : near ? 0.9 : 0.72,
      0.08,
    );
  });

  function handlePointerOver(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    onNear(fragment.id);
    onTryConnect(fragment.id);
  }

  function handlePointerOut(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    onLeave(fragment.id);
  }

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    onStartConnection(fragment.id);
    onTryConnect(fragment.id);
  }

  return (
    <group ref={groupRef} position={fragment.position}>
      <mesh
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <icosahedronGeometry args={[fragment.size, 1]} />
        <meshStandardMaterial
          ref={materialRef}
          color={fragment.color}
          emissive={fragment.color}
          emissiveIntensity={connected ? 0.7 : 0.2}
          roughness={0.48}
          metalness={0.02}
          transparent
          opacity={connected ? 0.96 : 0.72}
        />
      </mesh>
      <mesh
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={2.3}
      >
        <sphereGeometry args={[fragment.size, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
