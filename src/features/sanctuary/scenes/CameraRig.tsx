"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sanctuarySceneConfig } from "@/features/sanctuary/data/sceneConfig";
import { useSanctuaryStore } from "@/features/sanctuary/state/useSanctuaryStore";
import { useQualityPreset } from "@/features/sanctuary/utils/useQualityPreset";

const cameraHome = new THREE.Vector3(...sanctuarySceneConfig.camera.position);

export function CameraRig() {
  const qualityPreset = useQualityPreset();
  const cameraDistance = useSanctuaryStore(
    (state) => state.currentSceneTuning.cameraDistance,
  );

  useFrame(({ camera, pointer }) => {
    const targetX =
      cameraHome.x +
      pointer.x * sanctuarySceneConfig.camera.parallax.x * qualityPreset.motionScale;
    const targetY =
      cameraHome.y +
      pointer.y * sanctuarySceneConfig.camera.parallax.y * qualityPreset.motionScale;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      sanctuarySceneConfig.camera.parallax.ease * qualityPreset.motionScale,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      sanctuarySceneConfig.camera.parallax.ease * qualityPreset.motionScale,
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
