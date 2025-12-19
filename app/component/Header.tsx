import Image from "next/image";

export default function Header() {
  return (
    <header className="h-14 flex items-center justify-between px-6 bg-[#0CA678] text-white">
      <div className="flex items-center gap-2 font-bold text-lg">
        <span className="text-[#11a36a] rounded px-2 py-0.5">
          <Image
            src="/image/logo/gillazabi_logo.png"
            alt="길라잡이 로고"
            width={180}
            height={60}
            className="h-8 w-auto"
          />
        </span>
      </div>

      {/* Right: Menu */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        <button className="hover:underline">AI 분석</button>
        <button className="hover:underline">지역별 분석</button>
      </nav>
    </header>
  );
}
