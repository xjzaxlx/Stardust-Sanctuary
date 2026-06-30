export type FragmentId = string;

export type StarFragmentData = {
  id: FragmentId;
  position: [number, number, number];
  size: number;
  color: string;
};

export type Constellation = {
  id: string;
  name: string;
  subtitle: string;
  fragments: StarFragmentData[];
  connectionOrder: FragmentId[];
};

export type FragmentStatus = "dormant" | "available" | "connected" | "complete";
