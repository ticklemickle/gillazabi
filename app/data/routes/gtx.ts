// src/data/routes/gtx.ts
import type { Route } from "./types";

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
      strokeColor: "#7b2cff",
      strokeWeight: 6,
      strokeOpacity: 0.9,
      zIndex: 100,
    },
    labelStyle: { color: "#7b2cff" },
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
      strokeColor: "#1e62ff",
      strokeWeight: 6,
      strokeOpacity: 0.9,
      zIndex: 90,
    },
    labelStyle: { color: "#1e62ff" },
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
      strokeColor: "#1f9d57",
      strokeWeight: 6,
      strokeOpacity: 0.9,
      zIndex: 80,
    },
    labelStyle: { color: "#1f9d57" },
  },
];
