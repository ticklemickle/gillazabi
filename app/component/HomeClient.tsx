"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MapView from "./MapView";
import MobileBottomDock from "./MobileBottomDock";

export default function HomeClient() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <main className="flex flex-1 overflow-hidden text-black">
        {/* PC: 기존 Sidebar 유지 */}
        <div className="hidden md:block">
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
