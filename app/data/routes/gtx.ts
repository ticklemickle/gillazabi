// src/data/routes/gtx.ts
import type { Route } from "./types";

const COMMON_STYLE = {
  strokeWeight: 6,
  strokeOpacity: 0.9,
} as const;

export const GTX_ROUTES: Route[] = [
  {
    id: "gtx-a",
    name: "GTX-A",
    path: [
      { lat: 37.5665, lng: 126.978 }, // 서울시청 근처
      { lat: 37.58, lng: 127.01 },
      { lat: 37.6, lng: 127.05 },
      { lat: 37.52, lng: 127.1 }, // 잠실 근처
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#7b2cff",
      zIndex: 100,
    },
  },
  {
    id: "gtx-b",
    name: "GTX-B",
    path: [
      { lat: 37.455, lng: 126.705 }, // 인천 쪽 샘플
      { lat: 37.48, lng: 126.93 },
      { lat: 37.52, lng: 127.0 },
      { lat: 37.65, lng: 127.07 },
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#1e62ff",
      zIndex: 90,
    },
  },
  {
    id: "gtx-c",
    name: "GTX-C",
    path: [
      { lat: 37.3, lng: 127.01 }, // 수원/용인 쪽 샘플
      { lat: 37.36, lng: 127.03 },
      { lat: 37.45, lng: 127.06 },
      { lat: 37.56, lng: 127.09 },
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#1f9d57",
      zIndex: 80,
    },
  },
];
