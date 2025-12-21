// src/data/routes.ts

export type LatLng = {
  lat: number;
  lng: number;
};

export type Route = {
  id: string;
  name: string;

  // 노선 좌표
  path: LatLng[];

  // 라벨 위치 (필수)
  label: LatLng;

  // 선 스타일
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  zIndex?: number;

  // 라벨 색상
  labelColor?: string;
};

export const ROUTES: Route[] = [
  // ======================
  // GTX-A
  // ======================
  {
    id: "gtx-a",
    name: "GTX-A",
    path: [
      { lat: 37.6543, lng: 126.7727 }, // 운정
      { lat: 37.631, lng: 126.832 }, // 킨텍스
      { lat: 37.5665, lng: 126.978 }, // 서울역
      { lat: 37.4019, lng: 127.1083 }, // 수서
    ],
    label: { lat: 37.5665, lng: 126.978 },
    strokeColor: "#7b2cff",
    strokeWeight: 6,
    strokeOpacity: 0.9,
    zIndex: 100,
    labelColor: "#7b2cff",
  },

  // ======================
  // GTX-B
  // ======================
  {
    id: "gtx-b",
    name: "GTX-B",
    path: [
      { lat: 37.455, lng: 126.705 }, // 송도
      { lat: 37.508, lng: 126.72 }, // 부평
      { lat: 37.5665, lng: 126.978 }, // 서울역
      { lat: 37.651, lng: 127.061 }, // 마석
    ],
    label: { lat: 37.5665, lng: 126.978 },
    strokeColor: "#1e62ff",
    strokeWeight: 6,
    strokeOpacity: 0.9,
    zIndex: 95,
    labelColor: "#1e62ff",
  },

  // ======================
  // GTX-C
  // ======================
  {
    id: "gtx-c",
    name: "GTX-C",
    path: [
      { lat: 37.3, lng: 127.01 }, // 수원
      { lat: 37.36, lng: 127.03 }, // 의왕
      { lat: 37.5665, lng: 126.978 }, // 서울역
      { lat: 37.656, lng: 127.038 }, // 덕정
    ],
    label: { lat: 37.5665, lng: 126.978 },
    strokeColor: "#1f9d57",
    strokeWeight: 6,
    strokeOpacity: 0.9,
    zIndex: 90,
    labelColor: "#1f9d57",
  },

  // ======================
  // 신분당선
  // ======================
  {
    id: "shinbundang",
    name: "신분당선",
    path: [
      { lat: 37.3943, lng: 127.1112 }, // 광교
      { lat: 37.4019, lng: 127.1083 }, // 수서
      { lat: 37.5045, lng: 127.0254 }, // 강남
      { lat: 37.5299, lng: 126.9648 }, // 신사
    ],
    label: { lat: 37.5045, lng: 127.0254 },
    strokeColor: "#d32f2f",
    strokeWeight: 5,
    strokeOpacity: 0.9,
    zIndex: 80,
    labelColor: "#d32f2f",
  },

  // ======================
  // 경강선
  // ======================
  {
    id: "gyeonggang",
    name: "경강선",
    path: [
      { lat: 37.283, lng: 127.444 }, // 여주
      { lat: 37.295, lng: 127.57 }, // 이천
      { lat: 37.3943, lng: 127.1112 }, // 판교
    ],
    label: { lat: 37.3943, lng: 127.1112 },
    strokeColor: "#3949ab",
    strokeWeight: 5,
    strokeOpacity: 0.9,
    zIndex: 70,
    labelColor: "#3949ab",
  },
];
