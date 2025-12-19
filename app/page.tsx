import Header from "./component/Header";
import MapView from "./component/MapView";
import Sidebar from "./component/Sidebar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar: md 이상에서만 표시 */}
        <aside className="hidden md:block w-[400px] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* MapView: 항상 표시, 남은 영역 전체 */}
        <section className="flex-1">
          <MapView />
        </section>
      </main>
    </div>
  );
}
