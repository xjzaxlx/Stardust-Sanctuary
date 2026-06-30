"use client";

import { useMemo, useRef } from "react";
import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ConstellationLines } from "@/components/experience/ConstellationLines";
import { StarFragment } from "@/components/experience/StarFragment";
import { getFragmentStatus, getNextFragmentId } from "@/lib/interaction";
import { sceneConfig } from "@/lib/sceneConfig";
import type { Constellation, FragmentId } from "@/types/constellation";

type StardustSceneProps = {
  constellation: Constellation;
  connectedIds: FragmentId[];
  isComplete: boolean;
  onFragmentSelect: (id: FragmentId) => void;
};

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function CameraDrift() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.32, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.22, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function DustField() {
  const positions = useMemo(() => {
    const values = new Float32Array(sceneConfig.particleCount * 3);

    for (let index = 0; index < sceneConfig.particleCount; index += 1) {
      const radius = sceneConfig.particleRadius * Math.cbrt(seededRandom(index + 1));
      const theta = seededRandom(index + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(index + 3) - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[index * 3 + 2] = radius * Math.cos(phi) - 1.5;
    }

    return values;
  }, []);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.006;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b9ddff" size={0.025} transparent opacity={0.62} />
    </points>
  );
}

export function StardustScene({
  constellation,
  connectedIds,
  isComplete,
  onFragmentSelect,
}: StardustSceneProps) {
  const nextFragmentId = getNextFragmentId(constellation, connectedIds);

  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <fog attach="fog" args={["#02030a", 6.5, 13]} />
      <CameraDrift />
      <ambientLight intensity={0.45} />
      <pointLight position={[1.8, 2.5, 3.5]} intensity={2.4} color="#bfeaff" />
      <pointLight position={[-2.4, -1.4, 2.2]} intensity={0.8} color="#ffd7ef" />
      <DustField />
      <Sparkles
        count={90}
        scale={[6, 2.8, 3.5]}
        size={1.7}
        speed={0.16}
        opacity={0.35}
        color="#d7f4ff"
      />
      <ConstellationLines constellation={constellation} connectedIds={connectedIds} />
      {constellation.fragments.map((fragment) => (
        <StarFragment
          key={fragment.id}
          fragment={fragment}
          status={getFragmentStatus(fragment.id, connectedIds, nextFragmentId, isComplete)}
          onSelect={onFragmentSelect}
        />
      ))}
    </>
  );
}
