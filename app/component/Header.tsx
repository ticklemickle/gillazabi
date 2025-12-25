import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-6 bg-white text-black">
      <div className="flex items-center gap-2 font-bold text-lg">
        <Link
          href="/"
          className="rounded py-0.5 inline-flex cursor-pointer"
          onClick={(e) => {
            // 현재 경로와 목적지가 같을 때 강제 새로고침
            if (window.location.pathname === "/") {
              e.preventDefault(); // 기본 링크 동작 방지
              window.location.reload(); // 새로고침
            }
          }}
        >
          <Image
            src="/image/logo/logo.png"
            alt="길라잡이 로고"
            width={180}
            height={60}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Right: Menu */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        <button className="hover:underline">AI 분석</button>
        <button className="hover:underline">지역별 분석</button>
      </nav>
    </header>
  );
}
