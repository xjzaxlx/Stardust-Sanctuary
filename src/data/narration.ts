export const openingNarration = "慢慢地，散开的念头开始发光。";

const narrationByConstellationId: Record<string, string> = {
  "first-breath": "你没有消失，只是在重新聚拢。",
  "quiet-harbor": "每一片焦虑，都可以先停靠一会儿。",
  "soft-return": "星尘记得温柔，也记得你。",
};

export function getNarration(constellationId: string) {
  return narrationByConstellationId[constellationId] ?? openingNarration;
}
