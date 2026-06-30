export type AnxietyFragment = {
  id: string;
  position: [number, number, number];
  label: string;
  emotionWeight: number;
  size: number;
  color: string;
};

export const anxietyFragments: AnxietyFragment[] = [
  {
    id: "overthinking",
    position: [-1.35, 0.72, 0.06],
    label: "过度思考",
    emotionWeight: 0.72,
    size: 0.22,
    color: "#c7e8ff",
  },
  {
    id: "future-catastrophe",
    position: [1.18, 0.68, -0.18],
    label: "对未来灾难化想象",
    emotionWeight: 0.86,
    size: 0.2,
    color: "#d8ccff",
  },
  {
    id: "fear-of-mistakes",
    position: [-0.78, -0.34, 0.2],
    label: "害怕做错",
    emotionWeight: 0.64,
    size: 0.18,
    color: "#ffe4c2",
  },
  {
    id: "comparison-loop",
    position: [0.86, -0.46, 0.08],
    label: "无法停下比较",
    emotionWeight: 0.76,
    size: 0.19,
    color: "#c8fff0",
  },
  {
    id: "quiet-fatigue",
    position: [-0.18, 1.18, -0.28],
    label: "说不出口的疲惫",
    emotionWeight: 0.58,
    size: 0.17,
    color: "#ffd8ec",
  },
  {
    id: "wish-to-be-understood",
    position: [0.08, -1.06, -0.12],
    label: "想被理解",
    emotionWeight: 0.52,
    size: 0.21,
    color: "#d6f4ff",
  },
];
