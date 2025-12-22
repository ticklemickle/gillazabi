// src/data/routes/types.ts

export type LatLng = {
  lat: number;
  lng: number;
  name: string;
};

export type RouteStyle = {
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  zIndex?: number;
};

export type Route = {
  id: string;
  name: string;
  path: LatLng[];

  // 없으면 path 중간점을 사용
  label?: LatLng;

  style?: RouteStyle;
};
