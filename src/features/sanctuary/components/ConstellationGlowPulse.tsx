"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";

type ConstellationGlowPulseProps = {
  active: boolean;
};

export function ConstellationGlowPulse({ active }: ConstellationGlowPulseProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const pulseStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      pulseStartRef.current = null;
    }
  }, [active]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const material = materialRef.current;

    if (!mesh || !material) {
      return;
    }

    if (!active) {
      mesh.visible = false;
      return;
    }

    if (pulseStartRef.current === null) {
      pulseStartRef.current = clock.elapsedTime;
    }

    const elapsed = clock.elapsedTime - pulseStartRef.current;
    const progress = THREE.MathUtils.clamp(elapsed / 1.35, 0, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    mesh.visible = progress < 1;
    mesh.scale.setScalar(0.72 + easeOut * 2.7);
    material.opacity = (1 - easeOut) * 0.14;
  });

  return (
    <mesh ref={meshRef} position={sanctuarySceneConfig.anchor.position} visible={false}>
      <sphereGeometry args={[sanctuarySceneConfig.anchor.radius, 32, 16]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#d8ecec"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
