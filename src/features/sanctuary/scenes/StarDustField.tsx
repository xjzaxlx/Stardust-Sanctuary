"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

function seededRandom(seed: number) {
  const value = Math.sin(seed * 19.91) * 9137.31;

  return value - Math.floor(value);
}

function isInsideConstellationSpace(x: number, y: number) {
  return (
    Math.abs(x) < sanctuarySceneConfig.dust.centerClearance.width &&
    Math.abs(y) < sanctuarySceneConfig.dust.centerClearance.height
  );
}

function buildDustPositions() {
  const values = new Float32Array(sanctuarySceneConfig.dust.count * 3);

  for (let index = 0; index < sanctuarySceneConfig.dust.count; index += 1) {
    const radius =
      sanctuarySceneConfig.dust.innerRadius +
      seededRandom(index + 1) *
        (sanctuarySceneConfig.dust.outerRadius - sanctuarySceneConfig.dust.innerRadius);
    const angle = seededRandom(index + 2) * Math.PI * 2;
    let x = Math.cos(angle) * radius;
    let y = (seededRandom(index + 3) - 0.5) * sanctuarySceneConfig.dust.height;

    if (isInsideConstellationSpace(x, y)) {
      x += Math.sign(x || seededRandom(index + 4) - 0.5) * 1.2;
      y += Math.sign(y || seededRandom(index + 5) - 0.5) * 0.75;
    }

    values[index * 3] = x;
    values[index * 3 + 1] = y;
    values[index * 3 + 2] = Math.sin(angle) * radius - 1.2;
  }

  return values;
}

export function StarDustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => buildDustPositions(), []);
  const dustSpeedMultiplier = useSanctuaryStore(
    (state) => state.currentSceneTuning.dustSpeedMultiplier,
  );
  const dustOpacity = useSanctuaryStore((state) => state.currentSceneTuning.dustOpacity);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y =
      clock.elapsedTime * sanctuarySceneConfig.dust.driftSpeed * dustSpeedMultiplier +
      pointer.x * sanctuarySceneConfig.dust.parallaxRotation.y;
    pointsRef.current.rotation.x = pointer.y * sanctuarySceneConfig.dust.parallaxRotation.x;

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        dustOpacity * sanctuarySceneConfig.artDirection.dustOpacityScale,
        0.04,
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#c9dce8"
        size={sanctuarySceneConfig.dust.pointSize}
        transparent
        opacity={sanctuarySceneConfig.dust.opacity * sanctuarySceneConfig.artDirection.dustOpacityScale}
        depthWrite={false}
      />
    </points>
  );
}
