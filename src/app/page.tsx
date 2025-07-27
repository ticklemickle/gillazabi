"use client";

import { useRouter } from "next/navigation";

export default function MainLandingPage() {
  const router = useRouter();

  return (
    <main className="bg-[#f7f9fc] min-h-screen flex flex-col items-center justify-between px-6 py-12 space-y-10">
      <div className="text-center space-y-3">
        <img src="/image/logo.png" alt="로고" className="w-12 h-12 mx-auto" />
        <h1 className="text-2xl font-bold text-[#1e355e]">내집길라잡이</h1>
        <p className="text-sm text-gray-600">
          정부 주택 정책과 상담을 한 번에
          <br />
          신뢰할 수 있는 부동산 지원 서비스
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => router.push("/input")}
          className="w-full py-4 text-white bg-[#0c4da2] text-lg font-semibold rounded-xl hover:bg-[#093b84] transition"
        >
          부동산 정책 맞춤 조회
        </button>
      </div>

      <footer className="text-[11px] text-gray-400 pt-10 text-center">
        © {new Date().getFullYear()} 국토교통부 / LH 정책 기반 정보 제공 서비스
        <br />본 사이트는 공공기관 안내 목적이며, 광고를 포함하지 않습니다.
      </footer>
    </main>
  );
}
