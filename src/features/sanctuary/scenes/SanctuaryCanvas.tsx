"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function seededRandom(seed: number) {
  const value = Math.sin(seed * 19.91) * 9137.31;

  return value - Math.floor(value);
}

function StardustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 360;
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.2 + seededRandom(index + 1) * 5.2;
      const angle = seededRandom(index + 2) * Math.PI * 2;
      const height = (seededRandom(index + 3) - 0.5) * 4.2;

      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = height;
      values[index * 3 + 2] = Math.sin(angle) * radius - 1.2;
    }

    return values;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y = clock.elapsedTime * 0.025 + pointer.x * 0.08;
    pointsRef.current.rotation.x = pointer.y * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d7ecff" size={0.032} transparent opacity={0.72} />
    </points>
  );
}

function SanctuaryScene() {
  return (
    <>
      <color attach="background" args={["#02030a"]} />
      <fog attach="fog" args={["#02030a", 5.8, 11]} />
      <ambientLight intensity={0.28} />
      <pointLight position={[2.4, 1.8, 3.8]} intensity={1.1} color="#cbeaff" />
      <StardustField />
      <Sparkles
        count={42}
        scale={[5.4, 2.8, 3.8]}
        size={1.5}
        speed={0.12}
        opacity={0.32}
        color="#f2fbff"
      />
      <mesh position={[0, 0, -0.4]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#d8f4ff"
          emissive="#8fd8ff"
          emissiveIntensity={0.48}
          roughness={0.5}
          transparent
          opacity={0.86}
        />
      </mesh>
    </>
  );
}

export function SanctuaryCanvas() {
  return (
    <div className="sanctuary-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 44 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <SanctuaryScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
