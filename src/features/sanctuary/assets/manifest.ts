export type SanctuaryAssetKind = "model" | "texture" | "audio" | "font" | "data";

export type SanctuaryAssetManifestItem = {
  id: string;
  kind: SanctuaryAssetKind;
  path: string;
  required: boolean;
  description: string;
};

export const sanctuaryAssetManifest = [
  {
    id: "models-directory",
    kind: "model",
    path: "/models/README.md",
    required: false,
    description: "Future GLB fragments, vessels, and constellation objects.",
  },
  {
    id: "textures-directory",
    kind: "texture",
    path: "/textures/README.md",
    required: false,
    description: "Future star, dust, and KTX2 texture assets.",
  },
  {
    id: "ambient-placeholder",
    kind: "audio",
    path: "/audio/ambient-placeholder.txt",
    required: false,
    description: "Placeholder for future ambient loops and soft interaction tones.",
  },
] satisfies SanctuaryAssetManifestItem[];

export const sanctuaryAssetPathRules = {
  models: "/models/*",
  textures: "/textures/*",
  audio: "/audio/*",
  fonts: "/fonts/*",
  data: "/data/*",
};
