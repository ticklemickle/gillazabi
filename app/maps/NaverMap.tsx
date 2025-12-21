"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { renderRoutes } from "./renderRoutes";
import { ROUTES } from "../data/routes";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!mapRef.current) return;
    if (!window.naver?.maps) return;

    const naver = window.naver;
    const center = new naver.maps.LatLng(37.3595704, 127.105399);

    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 12,
    });

    const cleanup = renderRoutes(map, naver, ROUTES);
    return cleanup;
  }, [ready]);

  const ncpKeyId = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ncpKeyId}`}
        onLoad={() => setReady(true)}
      />
      <div ref={mapRef} className="w-full h-full" />
    </>
  );
}
