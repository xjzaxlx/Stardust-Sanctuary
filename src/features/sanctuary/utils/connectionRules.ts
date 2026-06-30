import type { FragmentConnection } from "@/features/sanctuary/data/fragments";

export function shouldStartConnection(
  connectionOrder: string[],
  connectedFragmentIds: string[],
  fragmentId: string,
) {
  return connectedFragmentIds.length === 0 && fragmentId === connectionOrder[0];
}

export function getNextFragmentId(connectionOrder: string[], connectedFragmentIds: string[]) {
  return connectionOrder[connectedFragmentIds.length] ?? null;
}

export function buildConnection(fromId: string, toId: string): FragmentConnection {
  return { fromId, toId };
}

export function isConstellationComplete(
  connectionOrder: string[],
  connections: FragmentConnection[],
) {
  return connections.length >= Math.max(connectionOrder.length - 1, 0);
}
