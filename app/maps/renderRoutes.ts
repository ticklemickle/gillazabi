import { routeLabelHTML } from "./routeLabel";
import type { Route } from "../data/routes/types"; // 경로는 renderRoutes.ts 위치에 맞게 조정

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Naver = any;

function getLabelPos(route: Route) {
  const first = route.path[0];
  if (!first) return null;
  const OFFSET_LAT = 0.001;

  return {
    lat: first.lat + OFFSET_LAT,
    lng: first.lng,
  };
}

function stationDotHTML(color: string, sizePx = 10) {
  // 흰 테두리+살짝 그림자 -> 지도 배경에서 잘 보임
  const borderPx = 2;
  const total = sizePx;
  return `
    <div style="
      width:${total}px;
      height:${total}px;
      border-radius:50%;
      background:${color};
      border:${borderPx}px solid #fff;
      box-shadow:0 1px 3px rgba(0,0,0,.35);
      box-sizing:border-box;
    "></div>
  `;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderRoutes(map: any, naver: Naver, routes: Route[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlays: any[] = [];

  for (const r of routes) {
    const color = r.style?.strokeColor ?? "#ff0000";
    const strokeWeight = r.style?.strokeWeight ?? 6;
    const strokeOpacity = r.style?.strokeOpacity ?? 0.9;
    const zIndex = r.style?.zIndex ?? 1;

    // 1) Polyline
    const polyline = new naver.maps.Polyline({
      map,
      path: r.path.map((p) => new naver.maps.LatLng(p.lat, p.lng)),
      strokeColor: color,
      strokeWeight,
      strokeOpacity,
      zIndex,
    });
    overlays.push(polyline);

    // 2) Station dots (각 정거장 원형 dot)
    for (const p of r.path) {
      const dot = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(p.lat, p.lng),
        icon: {
          content: stationDotHTML(color, 10),
          // dot의 정중앙이 좌표에 오도록
          anchor: new naver.maps.Point(5, 5),
        },
        clickable: false,
        zIndex: zIndex + 1, // 선 위에 올라오게
      });
      overlays.push(dot);
    }

    // 3) 라벨(이름표) - HTML 마커
    const labelPos = getLabelPos(r);
    if (!labelPos) continue;
    const labelMarker = new naver.maps.Marker({
      map,
      position: new naver.maps.LatLng(labelPos.lat, labelPos.lng),
      icon: {
        // labelStyle 없이 선 색상으로 통일
        content: routeLabelHTML(r.name, color),
        anchor: new naver.maps.Point(20, 20),
      },
      clickable: false,
    });
    overlays.push(labelMarker);
  }

  // cleanup
  return () => overlays.forEach((o) => o.setMap?.(null));
}
