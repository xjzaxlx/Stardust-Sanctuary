"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";

const cameraHome = new THREE.Vector3(...sanctuarySceneConfig.camera.position);

export function CameraRig() {
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
      cameraHome.z,
      sanctuarySceneConfig.camera.parallax.ease,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}
