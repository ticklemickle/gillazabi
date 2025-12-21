// src/lib/naver/routeUtils.ts
export type LatLng = { lat: number; lng: number };

export function midPoint(path: LatLng[]): LatLng {
  if (path.length === 0) return { lat: 0, lng: 0 };
  return path[Math.floor(path.length / 2)];
}
