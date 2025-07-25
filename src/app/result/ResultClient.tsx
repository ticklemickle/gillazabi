"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { FirebaseDB } from "@/lib/firebase";
import RecommendedHomes from "./recommend/RecommendedHomes";
import PolicyList from "./policy/PolicyList";
import LoadingOverlay from "@/components/LoadingOverlay";
import FundingSummary from "./summary/FundingSummary";
import UserSummary from "./user/UserSummary";
import { Region } from "./recommend/lists/houseType";

const getPolicyTags = (data: Record<string, string>): string[] => {
  const tags: string[] = [];

  if (data.houseCount === "무주택") tags.push("무주택");
  if (data.married === "기혼") tags.push("기혼");
  if (data.children === "있음") tags.push("자녀");
  if (parseInt(data.price.replace(/[^0-9]/g, "")) >= 60000)
    tags.push("6억초과");
  if (data.liveIn === "예") tags.push("실거주");
  if (data.moveIn === "예") tags.push("전입");
  if (data.loan === "예") tags.push("대출");

  return tags;
};

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

  if (loading) return <LoadingOverlay />;
  if (!key) return <p>URL에 key 파라미터가 없습니다.</p>;
  if (!data) return <p>데이터를 찾을 수 없습니다.</p>;

  return (
    <main className="bg-gray-100 py-6 px-4 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        {/* 헤더 */}
        <header className="text-center">
          <h1 className="text-2xl font-semibold">📝 부동산 정책 맞춤 리포트</h1>
          <p className="text-sm text-gray-500 mt-1">
            당신의 조건에 맞는 정책 요약과 추천 정보
          </p>
        </header>

        {/* 사용자 정보 */}
        <section>
          <UserSummary data={data} />
        </section>

        {/* 추천 매물 */}
        <section>
          <RecommendedHomes
            maxPrice={parseFloat(data.price?.replace(/[^0-9.]/g, "") || "999")}
            realUseOnly={data.liveIn === "예"}
            region={data.region as Region}
          />
        </section>

        {/* 정책 목록 */}
        <section>
          <div className="space-y-6">
            <PolicyList tags={getPolicyTags(data)} />
          </div>
        </section>

        {/* 자금 요약 */}
        <section className="mt-10">
          <FundingSummary price={data.price} />
        </section>

        {/* 푸터 */}
        <footer className="pt-6 border-t text-center">
          <p className="text-xs text-gray-400">
            ※ 본 리포트는 참고용으로, 실제 거래 시 금융기관 또는 전문가와 반드시
            상담하세요.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700">
              📥 PDF로 저장
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm hover:bg-gray-300">
              🔗 링크 공유
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
