"use client";

import { useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sceneConfig } from "@/lib/sceneConfig";
import type { FragmentStatus, StarFragmentData } from "@/types/constellation";

type StarFragmentProps = {
  fragment: StarFragmentData;
  status: FragmentStatus;
  onSelect: (id: string) => void;
};

export function StarFragment({ fragment, status, onSelect }: StarFragmentProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isLit = status === "available" || status === "connected" || status === "complete";
  const scale = status === "available" || hovered ? 1.25 : 1;

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    const time = clock.elapsedTime;
    meshRef.current.rotation.x += 0.0025;
    meshRef.current.rotation.y += 0.004;
    meshRef.current.position.y =
      fragment.position[1] + Math.sin(time * 0.7 + fragment.size * 20) * sceneConfig.fragmentDrift;
  });

  function handleSelect(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    onSelect(fragment.id);
  }

  return (
    <mesh
      ref={meshRef}
      position={fragment.position}
      scale={scale}
      onClick={handleSelect}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <icosahedronGeometry args={[fragment.size, 1]} />
      <meshStandardMaterial
        color={fragment.color}
        emissive={fragment.color}
        emissiveIntensity={isLit ? 1.55 : 0.3}
        roughness={0.35}
        metalness={0.08}
        transparent
        opacity={status === "dormant" ? 0.58 : 0.96}
      />
      {isLit && (
        <mesh scale={2.2}>
          <sphereGeometry args={[fragment.size, 16, 16]} />
          <meshBasicMaterial color={fragment.color} transparent opacity={0.08} />
        </mesh>
      )}
    </mesh>
  );
}
