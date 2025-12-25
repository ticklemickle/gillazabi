"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { renderRoutes } from "./renderRoutes";
import { ROUTES } from "../data/routes";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

type Filters = { region: string; stage: string };

type Props = {
  filters: Filters;
  onSelectRouteId: (routeId: string) => void;
};

function applyRouteFilters<T extends { regionId?: string; stageId?: string }>(
  routes: T[],
  filters: Filters
) {
  return routes.filter((r) => {
    const regionOk =
      filters.region === "all" ||
      (typeof r.regionId === "string" && r.regionId === filters.region);

    const stageOk =
      filters.stage === "all" ||
      (typeof r.stageId === "string" && r.stageId === filters.stage);

    // 필터가 all이 아닌데 route에 메타(regionId/stageId)가 없으면 제외되는 게 자연스럽습니다.
    return regionOk && stageOk;
  });
}

export default function NaverMap({ filters, onSelectRouteId }: Props) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const cleanupRef = useRef<null | (() => void)>(null);

  const [ready, setReady] = useState(false);

  // filters가 바뀌면 매번 새로운 배열을 만들기보다 memo로 안정화
  const filteredRoutes = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => applyRouteFilters(ROUTES as any[], filters),
    [filters]
  );

  // 1) Map 인스턴스는 1번만 생성
  useEffect(() => {
    if (!ready) return;
    if (!mapElRef.current) return;
    if (!window.naver?.maps) return;

    if (mapInstanceRef.current) return; // ✅ 이미 생성됨

    const naver = window.naver;
    const center = new naver.maps.LatLng(37.5488687, 126.98932);

    mapInstanceRef.current = new naver.maps.Map(mapElRef.current, {
      center,
      zoom: 12,
    });

    // 언마운트 시 정리
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      mapInstanceRef.current = null;
    };
  }, [ready]);

  // 2) overlays(노선)만 갱신
  useEffect(() => {
    if (!ready) return;
    if (!window.naver?.maps) return;
    if (!mapInstanceRef.current) return;

    const naver = window.naver;
    const map = mapInstanceRef.current;

    // ✅ 이전에 그린 overlays/리스너 제거
    cleanupRef.current?.();
    cleanupRef.current = renderRoutes(
      map,
      naver,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      filteredRoutes as any,
      onSelectRouteId
    );

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [ready, filteredRoutes, onSelectRouteId]);

  const ncpKeyId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ncpKeyId}`}
        onLoad={() => setReady(true)}
      />
      <div ref={mapElRef} className="w-full h-full" />
    </>
  );
}
