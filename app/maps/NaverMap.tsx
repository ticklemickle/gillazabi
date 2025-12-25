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

import { feasibilityDataMap } from "@/app/data/feasibility";

function applyRouteFiltersByFeasibility<
  T extends { id?: string; feasibilityKey?: string }
>(routes: T[], filters: { region: string; stage: string }) {
  return routes.filter((route) => {
    const key = route.feasibilityKey ?? route.id;
    if (!key) return false;

    const meta = feasibilityDataMap[key];
    if (!meta) return false;

    const regionOk =
      filters.region === "all" || meta.regionId === filters.region;

    const stageOk = filters.stage === "all" || meta.stageId === filters.stage;

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
    () => applyRouteFiltersByFeasibility(ROUTES as any[], filters),
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
      filteredRoutes,
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
