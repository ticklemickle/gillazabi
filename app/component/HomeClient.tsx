"use client";

import { useEffect, useRef, useState } from "react";
// import Sidebar from "./Sidebar";
import MapView from "./MapView";
import MobileBottomDock from "./MobileBottomDock";
import Sidebar from "./Sidebar/Sidebar";

export default function HomeClient() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const sidebarScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sidebarScrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [selectedRouteId]);

  return (
    <div className="h-screen flex flex-col">
      <main className="flex flex-1 overflow-hidden text-black">
        {/* PC: 기존 Sidebar 유지 */}
        <div
          ref={sidebarScrollRef}
          className="hidden md:block w-full max-w-md h-full overflow-y-auto scrollbar-hide"
        >
          <Sidebar selectedRouteId={selectedRouteId} />
        </div>

        {/* Mobile: 하단 핵심 요약 */}
        <MobileBottomDock
          selectedRouteId={selectedRouteId}
          showSummary={false}
        />

        <section className="flex-1">
          <MapView onSelectRouteId={setSelectedRouteId} />
        </section>
      </main>
    </div>
  );
}
