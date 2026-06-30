export const sanctuarySceneConfig = {
  camera: {
    position: [0, 0, 6.4] as [number, number, number],
    fov: 43,
    parallax: {
      x: 0.22,
      y: 0.14,
      ease: 0.035,
    },
  },
  dust: {
    count: 480,
    innerRadius: 2.1,
    outerRadius: 7.6,
    height: 4.6,
    centerClearance: {
      width: 1.8,
      height: 1.2,
    },
    pointSize: 0.026,
    opacity: 0.58,
    driftSpeed: 0.014,
    parallaxRotation: {
      x: 0.025,
      y: 0.05,
    },
  },
  fog: {
    color: "#02030a",
    near: 5.7,
    far: 12.4,
  },
  lighting: {
    ambientIntensity: 0.26,
    keyIntensity: 1.05,
    fillIntensity: 0.34,
  },
  anchor: {
    position: [0, 0, -0.55] as [number, number, number],
    radius: 0.22,
  },
};
