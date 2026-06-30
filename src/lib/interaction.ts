import type { Constellation, FragmentId, FragmentStatus } from "@/types/constellation";

export function getNextFragmentId(
  constellation: Constellation,
  connectedIds: FragmentId[],
) {
  return constellation.connectionOrder[connectedIds.length];
}

export function getFragmentStatus(
  fragmentId: FragmentId,
  connectedIds: FragmentId[],
  nextFragmentId: FragmentId | undefined,
  isComplete: boolean,
): FragmentStatus {
  if (isComplete) {
    return "complete";
  }

  if (connectedIds.includes(fragmentId)) {
    return "connected";
  }

  if (fragmentId === nextFragmentId) {
    return "available";
  }

  return "dormant";
}
