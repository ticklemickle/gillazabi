import type { Route } from "./types";

const COMMON_STYLE = {
  strokeWeight: 3.5,
  strokeOpacity: 0.6,
} as const;

export const LIGHT_RAIL: Route[] = [
  {
    id: "western line",
    name: "서부선",
    path: [
      { lat: 37.5906, lng: 126.914, name: "새절역" },
      { lat: 37.5909, lng: 126.9137, name: "충암초교" },
      { lat: 37.5796, lng: 126.92277, name: "명지대학교(서울캠퍼스)" },
      { lat: 37.5694, lng: 126.9338, name: "연희초교" },
      { lat: 37.5664, lng: 126.9388, name: "연세대학교(본캠퍼스)" },
      { lat: 37.5552, lng: 126.936, name: "신촌역(2호선)" },
      { lat: 37.5447, lng: 126.9263, name: "광흥창역(6호선)" },
      { lat: 37.5215, lng: 126.924, name: "순복음교회(여의도)" },
      { lat: 37.525, lng: 126.925, name: "여의도" },
      { lat: 37.5488, lng: 126.9893, name: "삼익아파트" },
      { lat: 37.5087, lng: 126.939, name: "노량진역(1·9호선)" },
      { lat: 37.4876, lng: 126.9625, name: "장승배기역(7호선)" },
      { lat: 37.4984, lng: 126.9443, name: "건영약수아파트" },
      { lat: 37.4984, lng: 126.9443, name: "구암초교" },
      { lat: 37.4984, lng: 126.9443, name: "중앙동성당" },
      { lat: 37.4811, lng: 126.9528, name: "서울대입구역(2호선)" },
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#F40303",
      zIndex: 100,
    },
  },
];
