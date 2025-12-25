"use client";

import { useEffect, useRef, useState } from "react";
// import Sidebar from "./Sidebar";
import MapView from "./MapView";
import MobileBottomDock from "./MobileBottomDock";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";

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
      <Header />

      <main className="relative flex-1 overflow-hidden text-black">
        {/* Map: 화면 꽉 */}
        <section className="absolute inset-0">
          <MapView onSelectRouteId={setSelectedRouteId} />
        </section>

        {/* Sidebar: 필요한 만큼만 + 너무 커지면 내부 스크롤 */}
        <div
          ref={sidebarScrollRef}
          className="
          hidden md:block
          absolute left-2 top-2 z-10
          w-full max-w-md
          max-h-[calc(100vh-120px)]
          overflow-y-auto scrollbar-hide
          rounded-2xl shadow-lg
        "
        >
          <Sidebar selectedRouteId={selectedRouteId} />
        </div>

        {/* Mobile dock */}
        <MobileBottomDock
          selectedRouteId={selectedRouteId}
          showSummary={false}
        />
      </main>
    </div>
  );
}
