"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MapView from "./MapView";

export default function HomeClient() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <main className="flex flex-1 overflow-hidden text-black">
        <aside className="hidden md:block overflow-y-auto scrollbar-hide">
          <Sidebar selectedRouteId={selectedRouteId ?? "gtx-a"} />
        </aside>

        <section className="flex-1">
          <MapView onSelectRouteId={setSelectedRouteId} />
        </section>
      </main>
    </div>
  );
}
