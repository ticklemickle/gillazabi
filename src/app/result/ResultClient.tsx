"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { FirebaseDB } from "@/lib/firebase";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const docRef = doc(FirebaseDB, "reports", key);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("문서 불러오기 오류:", error);
        setData(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [key]);

  if (loading) return <p>로딩 중...</p>;
  if (!key) return <p>URL에 key 파라미터가 없습니다.</p>;
  if (!data) return <p>데이터를 찾을 수 없습니다.</p>;

  return (
    <main className="bg-gray-100 py-6 px-4 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold">
            📝 2024 부동산 정책 맞춤 리포트
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            당신의 조건에 맞는 정책 요약과 추천 정보
          </p>
        </header>

        <section>
          <h2 className="text-lg font-semibold border-b pb-1 mb-2">
            👤 사용자 정보 요약
          </h2>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>출생연도: {data.birthYear}</li>
            <li>연소득: {data.income}</li>
            <li>자녀 여부: {data.children}</li>
            <li>혼인 여부: {data.married}</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
