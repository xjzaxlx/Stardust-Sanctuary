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
    near: 4.9,
    far: 11.2,
  },
  lighting: {
    ambientIntensity: 0.24,
    keyIntensity: 1.08,
    fillIntensity: 0.38,
  },
  anchor: {
    position: [0, 0, -0.55] as [number, number, number],
    radius: 0.22,
  },
  postprocessing: {
    enabled: true,
    bloomIntensity: 0.38,
    luminanceThreshold: 0.82,
    luminanceSmoothing: 0.22,
    mipmapBlur: true,
  },
  artDirection: {
    grainEnabled: true,
    grainOpacity: 0.075,
    vignetteOpacity: 0.72,
    paperTintOpacity: 0.16,
    fragmentSoftness: 0.34,
    lineJitter: 0.08,
    lineGlowOpacity: 0.12,
    dustOpacityScale: 0.82,
  },
};
