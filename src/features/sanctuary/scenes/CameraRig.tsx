"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";

const cameraHome = new THREE.Vector3(...sanctuarySceneConfig.camera.position);

export function CameraRig() {
  const cameraDistance = useSanctuaryStore(
    (state) => state.currentSceneTuning.cameraDistance,
  );

  useFrame(({ camera, pointer }) => {
    const targetX = cameraHome.x + pointer.x * sanctuarySceneConfig.camera.parallax.x;
    const targetY = cameraHome.y + pointer.y * sanctuarySceneConfig.camera.parallax.y;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      sanctuarySceneConfig.camera.parallax.ease,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      sanctuarySceneConfig.camera.parallax.ease,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      cameraDistance,
      sanctuarySceneConfig.camera.parallax.ease,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}
