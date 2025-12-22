import type { Route } from "../data/routes/types";
import {
  addDotInteractions,
  bindSelectRouteId,
  createPolyline,
  createRouteLabelMarker,
  createStationDot,
  createStationInfoWindow,
  getLabelPos,
} from "./routeFunction";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Naver = any;
type Overlay = { setMap?: (map: unknown | null) => void };
type Listener = unknown;

export function renderRoutes(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any,
  naver: Naver,
  routes: Route[],
  onSelectRouteId: (routeId: string) => void
) {
  const overlays: Overlay[] = [];
  const listeners: Listener[] = [];

  const stationInfo = createStationInfoWindow(naver);

  let pinnedKey: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stationDots: any[] = [];
  const DOT_VISIBLE_ZOOM = 13;

  for (const r of routes) {
    const color = r.style?.strokeColor ?? "#ff0000";
    const strokeWeight = r.style?.strokeWeight ?? 6;
    const strokeOpacity = r.style?.strokeOpacity ?? 0.9;
    const zIndex = r.style?.zIndex ?? 1;

    // 1) Polyline
    const polyline = createPolyline(
      naver,
      map,
      r,
      color,
      strokeWeight,
      strokeOpacity,
      zIndex
    );
    overlays.push(polyline);

    bindSelectRouteId(naver, polyline, r.id, onSelectRouteId, listeners);

    const hasRouteName = r.name.trim().length > 0;
    if (!hasRouteName) {
      continue; // 다음 route로
    }

    // 2) Station dots
    for (const p of r.path) {
      const name = p.name ?? "";
      if (!name) continue;

      const dot = createStationDot(naver, map, p.lat, p.lng, color, zIndex);
      overlays.push(dot);
      //지도 ZOOM 비율에 따라 dot 안 보여주기
      stationDots.push(dot);

      bindSelectRouteId(naver, dot, r.id, onSelectRouteId, listeners);

      const key = `${p.lat},${p.lng}`;

      addDotInteractions({
        naver,
        map,
        dot,
        stationInfo,
        name,
        key,
        getPinnedKey: () => pinnedKey,
        setPinnedKey: (v) => {
          pinnedKey = v;
        },
        listeners,
      });
    }

    // 3) 라벨(이름표)
    const labelPos = getLabelPos(r);
    if (labelPos) {
      const labelMarker = createRouteLabelMarker(
        naver,
        map,
        labelPos.lat,
        labelPos.lng,
        r.name,
        color
      );
      overlays.push(labelMarker);

      bindSelectRouteId(naver, labelMarker, r.id, onSelectRouteId, listeners);
    }
  }

  const zoomListener = naver.maps.Event.addListener(map, "zoom_changed", () => {
    const zoom = map.getZoom();
    for (const dot of stationDots) {
      dot.setMap(zoom >= DOT_VISIBLE_ZOOM ? map : null);
    }
  });

  listeners.push(zoomListener);

  const initialZoom = map.getZoom();
  for (const dot of stationDots) {
    dot.setMap(initialZoom >= DOT_VISIBLE_ZOOM ? map : null);
  }

  // cleanup
  return () => {
    pinnedKey = null;
    stationInfo.close();
    listeners.forEach((l) => naver.maps.Event.removeListener(l));
    overlays.forEach((o) => o.setMap?.(null));
  };
}
