export type SanctuaryConstellationId = "echo" | "harbor" | "glimmer";

export type SanctuaryConstellation = {
  id: SanctuaryConstellationId;
  name: string;
  description: string;
  fragmentIds: string[];
  connectionOrder: string[];
  completionNarration: string;
};

export const sanctuaryConstellations: Record<
  SanctuaryConstellationId,
  SanctuaryConstellation
> = {
  echo: {
    id: "echo",
    name: "回声座",
    description: "那些反复出现的想法，终于被温柔地听见。",
    fragmentIds: [
      "overthinking",
      "future-catastrophe",
      "fear-of-mistakes",
      "comparison-loop",
      "quiet-fatigue",
      "wish-to-be-understood",
    ],
    connectionOrder: [
      "overthinking",
      "future-catastrophe",
      "fear-of-mistakes",
      "comparison-loop",
      "quiet-fatigue",
      "wish-to-be-understood",
    ],
    completionNarration: "它们连在一起时，你也不必独自承担。",
  },
  harbor: {
    id: "harbor",
    name: "停泊座",
    description: "你可以暂时不往前走。",
    fragmentIds: [
      "quiet-fatigue",
      "wish-to-be-understood",
      "overthinking",
      "comparison-loop",
      "fear-of-mistakes",
      "future-catastrophe",
    ],
    connectionOrder: [
      "quiet-fatigue",
      "wish-to-be-understood",
      "overthinking",
      "comparison-loop",
      "fear-of-mistakes",
      "future-catastrophe",
    ],
    completionNarration: "停在这里，也是一种抵达。",
  },
  glimmer: {
    id: "glimmer",
    name: "微光座",
    description: "很小的光，也足够陪你过一小段夜路。",
    fragmentIds: [
      "wish-to-be-understood",
      "fear-of-mistakes",
      "quiet-fatigue",
      "overthinking",
      "future-catastrophe",
      "comparison-loop",
    ],
    connectionOrder: [
      "wish-to-be-understood",
      "fear-of-mistakes",
      "quiet-fatigue",
      "overthinking",
      "future-catastrophe",
      "comparison-loop",
    ],
    completionNarration: "微光不需要解释，它只是陪你亮着。",
  },
};

export const defaultSanctuaryConstellationId: SanctuaryConstellationId = "echo";

export function getSanctuaryConstellation(constellationId: SanctuaryConstellationId) {
  return sanctuaryConstellations[constellationId];
}
