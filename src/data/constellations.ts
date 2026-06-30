import type { Constellation } from "@/types/constellation";

export const constellations: Constellation[] = [
  {
    id: "first-breath",
    name: "First Breath",
    subtitle: "第一口安静的呼吸",
    fragments: [
      { id: "breath-1", position: [-2.6, -0.5, 0], size: 0.16, color: "#bfe8ff" },
      { id: "breath-2", position: [-1.5, 0.6, -0.2], size: 0.12, color: "#f6d8ff" },
      { id: "breath-3", position: [-0.3, 0.1, 0.1], size: 0.14, color: "#d7f6ff" },
      { id: "breath-4", position: [1.0, 0.8, -0.1], size: 0.13, color: "#fff0c7" },
      { id: "breath-5", position: [2.3, -0.15, 0.15], size: 0.18, color: "#c6fff1" },
    ],
    connectionOrder: ["breath-1", "breath-2", "breath-3", "breath-4", "breath-5"],
  },
  {
    id: "quiet-harbor",
    name: "Quiet Harbor",
    subtitle: "把漂流停在微光里",
    fragments: [
      { id: "harbor-1", position: [-2.1, 0.95, 0.05], size: 0.13, color: "#cbe7ff" },
      { id: "harbor-2", position: [-0.95, 0.18, -0.1], size: 0.15, color: "#e2d5ff" },
      { id: "harbor-3", position: [-0.15, -0.65, 0.1], size: 0.11, color: "#d6fffb" },
      { id: "harbor-4", position: [1.15, -0.38, -0.15], size: 0.14, color: "#fff2cf" },
      { id: "harbor-5", position: [2.15, 0.55, 0.1], size: 0.16, color: "#bce6ff" },
      { id: "harbor-6", position: [0.55, 1.1, -0.05], size: 0.12, color: "#ffd8e8" },
    ],
    connectionOrder: ["harbor-1", "harbor-2", "harbor-3", "harbor-4", "harbor-5", "harbor-6"],
  },
  {
    id: "soft-return",
    name: "Soft Return",
    subtitle: "碎片知道回家的路",
    fragments: [
      { id: "return-1", position: [-2.35, -0.2, -0.1], size: 0.17, color: "#b7efff" },
      { id: "return-2", position: [-1.25, -0.95, 0.12], size: 0.12, color: "#d7c7ff" },
      { id: "return-3", position: [0.15, -0.55, -0.05], size: 0.14, color: "#fce8b7" },
      { id: "return-4", position: [1.05, 0.28, 0.08], size: 0.13, color: "#c8fff1" },
      { id: "return-5", position: [0.25, 1.1, -0.12], size: 0.11, color: "#ffe0ef" },
      { id: "return-6", position: [-1.35, 0.78, 0.02], size: 0.15, color: "#d7f4ff" },
    ],
    connectionOrder: ["return-1", "return-2", "return-3", "return-4", "return-5", "return-6"],
  },
];
