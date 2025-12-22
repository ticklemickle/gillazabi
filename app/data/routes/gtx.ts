// src/data/routes/gtx.ts
import type { Route } from "./types";

const COMMON_STYLE = {
  strokeWeight: 5,
  strokeOpacity: 0.7,
} as const;

export const GTX_ROUTES: Route[] = [
  {
    id: "gtx-a",
    name: "GTX-A",
    path: [
      { lat: 37.5546, lng: 126.9707, name: "서울역" },
      { lat: 37.50887, lng: 127.06304, name: "삼성역(예정)" },
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#98618F",
      zIndex: 100,
    },
  },
  {
    id: "gtx-b",
    name: "GTX-B",
    path: [
      { lat: 37.455, lng: 126.705, name: "sample1" },
      { lat: 37.48, lng: 126.93, name: "sample1" },
      { lat: 37.52, lng: 127.0, name: "sample1" },
      { lat: 37.65, lng: 127.07, name: "sample1" },
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
      { lat: 37.3, lng: 127.01, name: "sample1" },
      { lat: 37.36, lng: 127.03, name: "sample1" },
      { lat: 37.45, lng: 127.06, name: "sample1" },
      { lat: 37.56, lng: 127.09, name: "sample1" },
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#1f9d57",
      zIndex: 80,
    },
  },
];
