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
      { lat: 37.3824, lng: 126.6564, name: "송도역(예정)" },
      { lat: 37.4563, lng: 126.7052, name: "인천시청역(예정)" },
      { lat: 37.503, lng: 126.7873, name: "부천종합운동장역(예정)" },
      { lat: 37.5219, lng: 126.9245, name: "여의도역(예정)" },
      { lat: 37.5546, lng: 126.9707, name: "서울역(예정)" },
      { lat: 37.5804, lng: 127.0474, name: "청량리역(예정)" },
      { lat: 37.6516, lng: 127.3116, name: "마석역(예정)" },
    ],

    style: {
      ...COMMON_STYLE,
      strokeColor: "#234699",
      zIndex: 90,
    },
  },
  {
    id: "gtx-c",
    name: "GTX-C",
    path: [
      { lat: 37.3111, lng: 127.1089, name: "수원역(예정)" },
      { lat: 37.3444, lng: 126.9483, name: "금정역(예정)" },
      { lat: 37.4019, lng: 126.922, name: "의왕역(예정)" },
      { lat: 37.4559, lng: 126.8936, name: "광명역(예정)" },
      { lat: 37.5219, lng: 126.9245, name: "여의도역(예정)" },
      { lat: 37.5546, lng: 126.9707, name: "서울역(예정)" },
      { lat: 37.5663, lng: 127.0091, name: "삼각지역(예정)" },
      { lat: 37.584, lng: 127.0586, name: "청량리역(예정)" },
      { lat: 37.6317, lng: 127.0616, name: "상계역(예정)" },
      { lat: 37.6688, lng: 127.0447, name: "의정부역(예정)" },
      { lat: 37.747, lng: 127.0449, name: "양주역(예정)" },
      { lat: 37.8243, lng: 127.5101, name: "덕정역(예정)" },
    ],

    style: {
      ...COMMON_STYLE,
      strokeColor: "#306E5B",
      zIndex: 80,
    },
  },
];
