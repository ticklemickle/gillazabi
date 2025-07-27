"use client";

import { useRouter } from "next/navigation";

export default function MainLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center space-y-3">
          <img src="/image/logo.png" alt="로고" className="w-12 h-12 mx-auto" />
          <h1 className="text-2xl text-black-600 font-semibold">
            내집길라잡이
          </h1>
          <p className="text-sm text-gray-600">
            정부 주택 정책과 상담을 한 번에
            <br />
            신뢰할 수 있는 부동산 지원 서비스
          </p>
        </div>

        <div className="w-full max-w-md mt-10 space-y-4 text-center">
          <button
            onClick={() => router.push("/input")}
            className="w-auto px-12 py-3 text-white bg-main-color text-lg font-semibold rounded-xl hover:bg-main-darkest transition"
          >
            부동산 정책 맞춤 조회
          </button>
        </div>
      </main>

      <footer className="text-[11px] text-gray-400 py-6 text-center mx-auto">
        © {new Date().getFullYear()} 국토교통부 / LH 정책 기반 정보 제공 서비스
        <br />본 사이트는 공공기관 안내 목적이며, 광고를 포함하지 않습니다.
      </footer>
    </div>
  );
}
