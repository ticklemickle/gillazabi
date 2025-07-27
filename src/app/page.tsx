"use client";

import { useRouter } from "next/navigation";

export default function MainLandingPage() {
  const router = useRouter();

  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-between px-6 py-12 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900">내집길라잡이</h1>
        <p className="text-gray-600 text-base">
          나에게 맞는 정부 지원 정책을 찾고 <br /> 전문가 상담까지 받아보세요.
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => router.push("/input")}
          className="w-full py-4 text-white bg-main-color text-lg font-semibold rounded-xl hover:bg-main-color/90 transition"
        >
          🔍 나에게 맞는 정책 추천 받기
        </button>
      </div>

      <footer className="text-xs text-gray-400 pt-10">
        © {new Date().getFullYear()} 부동산 지원 서비스
      </footer>
    </main>
  );
}
