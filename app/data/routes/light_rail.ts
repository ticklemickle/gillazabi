import type { Route } from "./types";

const COMMON_STYLE = {
  strokeWeight: 3.5,
  strokeOpacity: 0.6,
} as const;

export const LIGHT_RAIL: Route[] = [
  {
    id: "seobu-line",
    name: "서부선",
    path: [
      { lat: 37.59257, lng: 126.9139, name: "새절역" },
      { lat: 37.58565, lng: 126.92263, name: "충암초교" },
      { lat: 37.58157, lng: 126.92685, name: "" },
      { lat: 37.5787, lng: 126.92273, name: "명지대학교(서울캠퍼스)" },
      { lat: 37.56861, lng: 126.93227, name: "연희초교" },
      { lat: 37.56463, lng: 126.92913, name: "" },
      { lat: 37.55991, lng: 126.9347, name: "연세대학교(본캠퍼스)" },
      { lat: 37.55991, lng: 126.9369, name: "" },
      { lat: 37.55459, lng: 126.9362, name: "신촌역(2호선)" },
      { lat: 37.5474, lng: 126.9313, name: "광흥창역(6호선)" },
      { lat: 37.5319, lng: 126.9216, name: "순복음교회(여의도)" },
      { lat: 37.52439, lng: 126.9285, name: "여의도" },
      { lat: 37.518692, lng: 126.93406, name: "삼익아파트" },
      { lat: 37.51344, lng: 126.9402, name: "노량진역(1·9호선)" },
      { lat: 37.50887, lng: 126.9401, name: "" },
      { lat: 37.50465, lng: 126.93907, name: "장승배기역(7호선)" },
      { lat: 37.49913, lng: 126.9439, name: "건영약수아파트" },
      { lat: 37.4934, lng: 126.9433, name: "" },
      { lat: 37.48925, lng: 126.9459, name: "구암초교" },
      { lat: 37.4856, lng: 126.956, name: "중앙동성당" },
      { lat: 37.4811, lng: 126.9528, name: "서울대입구역(2호선)" },
    ],
    style: {
      ...COMMON_STYLE,
      strokeColor: "#F40303",
      zIndex: 100,
    },
  },
];
