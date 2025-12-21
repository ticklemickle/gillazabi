// src/data/routes/types.ts

import { LatLng } from "../routes";

export type Route = {
  id: string;
  name: string;
  path: LatLng[];

  // 없으면 자동으로 path 중간점으로 처리 가능
  label?: LatLng;

  style?: {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    zIndex?: number;
  };

  labelStyle?: {
    color?: string;
  };
};
