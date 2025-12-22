import type { Route } from "../data/routes/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Naver = any;

export function routeLabelHTML(name: string, color = "#111") {
  return `
    <div style="
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:8px 12px;
      border-radius:10px;
      background:#fff;
      border:2px solid ${color};
      box-shadow:0 6px 18px rgba(0,0,0,0.15);
      font-weight:700;
      font-size:14px;
      white-space:nowrap;
    ">
      <span style="width:10px;height:10px;border-radius:999px;background:${color};display:inline-block;"></span>
      ${name}
    </div>
  `;
}

interface MarkerLike {
  setMap(map: unknown | null): void;
}

interface InfoWindowLike {
  open(map: unknown, marker: MarkerLike): void;
  close(): void;
  setContent(html: string): void;
}

type Listener = unknown;

const LABEL_OFFSET_LAT = 0.001;

export function getLabelPos(route: Route) {
  const first = route.path[0];
  if (!first) return null;

  return {
    lat: first.lat + LABEL_OFFSET_LAT,
    lng: first.lng,
  };
}

export function stationDotHTML(color: string, sizePx = 10) {
  const borderPx = 2;

  return `
    <div style="
      width:${sizePx}px;
      height:${sizePx}px;
      border-radius:50%;
      background:${color};
      border:${borderPx}px solid #fff;
      box-shadow:0 1px 3px rgba(0,0,0,.35);
      box-sizing:border-box;
    "></div>
  `;
}

export function stationNameHTML(name: string) {
  return `
    <div style="
      white-space: nowrap;
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1.2;
      border-radius: 10px;
      background: rgba(0,0,0,0.78);
      color: #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      pointer-events: none;
    ">
      ${escapeHtml(name)}
    </div>
  `;
}

// 간단한 XSS 방지 (name에 < > 등이 들어갈 수 있으면 필요)
function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createStationInfoWindow(naver: Naver) {
  return new naver.maps.InfoWindow({
    content: "",
    borderWidth: 0,
    backgroundColor: "transparent",
    disableAnchor: true,
    pixelOffset: new naver.maps.Point(0, -8),
  });
}

export function createPolyline(
  naver: Naver,
  map: unknown,
  route: Route,
  color: string,
  strokeWeight: number,
  strokeOpacity: number,
  zIndex: number
) {
  return new naver.maps.Polyline({
    map,
    path: route.path.map((p) => new naver.maps.LatLng(p.lat, p.lng)),
    strokeColor: color,
    strokeWeight,
    strokeOpacity,
    zIndex,
  });
}

export function createStationDot(
  naver: Naver,
  map: unknown,
  lat: number,
  lng: number,
  color: string,
  zIndex: number
) {
  return new naver.maps.Marker({
    map,
    position: new naver.maps.LatLng(lat, lng),
    icon: {
      content: stationDotHTML(color, 10),
      anchor: new naver.maps.Point(5, 5),
    },
    clickable: true,
    zIndex: zIndex + 1,
  });
}

export function createRouteLabelMarker(
  naver: Naver,
  map: unknown,
  lat: number,
  lng: number,
  routeName: string,
  color: string
) {
  return new naver.maps.Marker({
    map,
    position: new naver.maps.LatLng(lat, lng),
    icon: {
      content: routeLabelHTML(routeName, color),
      anchor: new naver.maps.Point(20, 20),
    },
    clickable: false,
  });
}

export function addDotInteractions(params: {
  naver: Naver;
  map: unknown;
  dot: MarkerLike;
  stationInfo: InfoWindowLike;
  name: string;
  key: string;
  getPinnedKey: () => string | null;
  setPinnedKey: (v: string | null) => void;
  listeners: Listener[];
}) {
  const {
    naver,
    map,
    dot,
    stationInfo,
    name,
    key,
    getPinnedKey,
    setPinnedKey,
    listeners,
  } = params;

  // hover: pinned(클릭 고정) 상태가 아니면 보여주기
  listeners.push(
    naver.maps.Event.addListener(dot, "mouseover", () => {
      if (!name) return;
      const pinnedKey = getPinnedKey();
      if (pinnedKey && pinnedKey !== key) return;

      stationInfo.setContent(stationNameHTML(name));
      stationInfo.open(map, dot);
    })
  );

  // mouseout: pinned 아니면 닫기
  listeners.push(
    naver.maps.Event.addListener(dot, "mouseout", () => {
      if (getPinnedKey() === key) return;
      stationInfo.close();
    })
  );

  // click: 토글(고정/해제)
  listeners.push(
    naver.maps.Event.addListener(dot, "click", () => {
      if (!name) return;

      if (getPinnedKey() === key) {
        setPinnedKey(null);
        stationInfo.close();
        return;
      }

      setPinnedKey(key);
      stationInfo.setContent(stationNameHTML(name));
      stationInfo.open(map, dot);
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateDotVisibility(map: any, dots: any[], minZoom: number) {
  const zoom = map.getZoom();

  for (const dot of dots) {
    if (zoom >= minZoom) {
      dot.setMap(map);
    } else {
      dot.setMap(null);
    }
  }
}
