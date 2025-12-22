import { routeLabelHTML } from "./routeLabel";
import type { Route } from "../data/routes/types"; // 경로는 renderRoutes.ts 위치에 맞게 조정

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Naver = any;

function getLabelPos(route: Route) {
  if (route.label) return route.label;

  const path = route.path ?? [];
  if (path.length === 0) return { lat: 0, lng: 0 };

  return path[Math.floor(path.length / 2)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderRoutes(map: any, naver: Naver, routes: Route[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlays: any[] = [];

  for (const r of routes) {
    const strokeColor = r.style?.strokeColor ?? "#ff0000";
    const strokeWeight = r.style?.strokeWeight ?? 6;
    const strokeOpacity = r.style?.strokeOpacity ?? 0.9;
    const zIndex = r.style?.zIndex ?? 1;

    // 1) Polyline
    const polyline = new naver.maps.Polyline({
      map,
      path: r.path.map((p) => new naver.maps.LatLng(p.lat, p.lng)),
      strokeColor,
      strokeWeight,
      strokeOpacity,
      zIndex,
    });
    overlays.push(polyline);

    // 2) 라벨(이름표) - HTML 마커
    const labelPos = getLabelPos(r);
    const labelMarker = new naver.maps.Marker({
      map,
      position: new naver.maps.LatLng(labelPos.lat, labelPos.lng),
      icon: {
        // labelStyle 없이 선 색상으로 통일
        content: routeLabelHTML(r.name, strokeColor),
        anchor: new naver.maps.Point(20, 20),
      },
      clickable: false,
    });
    overlays.push(labelMarker);
  }

  // cleanup
  return () => overlays.forEach((o) => o.setMap?.(null));
}
