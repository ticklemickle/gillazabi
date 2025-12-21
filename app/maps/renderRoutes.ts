import type { Route } from "../data/routes";
import { routeLabelHTML } from "./routeLabel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Naver = any;

/**
 * routes.ts의 Route 타입(평평한 strokeColor/labelColor 구조)에 맞춘 렌더러
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderRoutes(map: any, naver: Naver, routes: Route[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlays: any[] = [];

  for (const r of routes) {
    const color = r.strokeColor ?? "#ff0000";

    // 1) Polyline
    const polyline = new naver.maps.Polyline({
      map,
      path: r.path.map((p) => new naver.maps.LatLng(p.lat, p.lng)),
      strokeColor: color,
      strokeWeight: r.strokeWeight ?? 6,
      strokeOpacity: r.strokeOpacity ?? 0.9,
      zIndex: r.zIndex ?? 1,
    });
    overlays.push(polyline);

    // 2) 라벨(이름표) - HTML 마커
    const labelPos = r.label; // routes.ts에서 label은 필수
    const labelMarker = new naver.maps.Marker({
      map,
      position: new naver.maps.LatLng(labelPos.lat, labelPos.lng),
      icon: {
        content: routeLabelHTML(r.name, r.labelColor ?? color),
        anchor: new naver.maps.Point(20, 20),
      },
      clickable: false,
    });
    overlays.push(labelMarker);
  }

  // cleanup
  return () => overlays.forEach((o) => o.setMap?.(null));
}
