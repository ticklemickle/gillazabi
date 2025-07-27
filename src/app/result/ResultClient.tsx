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
import { parseMaxPrice } from "./recommend/parsePriceRange";
import { usePdfAndShare } from "@/components/usePdfAndShare";

const getPolicyTags = (data: Record<string, string>): string[] => {
  const tags: string[] = [];

  if (data.houseCount === "무주택") tags.push("무주택");
  if (data.married === "기혼") tags.push("기혼");
  if (data.children === "있음") tags.push("자녀");
  if (parseInt(data.price.replace(/[^0-9]/g, "")) >= 60000)
    tags.push("6억초과");
  if (data.purpose === "실거주") tags.push("실거주");
  if (data.moveIn === "예") tags.push("전입");
  if (data.loan === "예") tags.push("대출");

  return tags;
};

export default function ResultClient() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const { printRef, handleSavePdf, handleCopyLink } = usePdfAndShare();

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
    <main ref={printRef} className="bg-gray-100 py-6 px-4 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-8">
        {/* 헤더 */}
        <header className="text-center">
          <h1 className="text-2xl font-semibold">부동산 정책 맞춤 리포트</h1>
          <p className="text-sm text-gray-500 mt-1">
            최적의 정책 요약과 추천 단지
          </p>
        </header>

        {/* 사용자 정보 */}
        <section>
          <UserSummary data={data} />
        </section>

        {/* 추천 매물 */}
        <section>
          <RecommendedHomes
            maxPrice={parseMaxPrice(data.price)}
            realUseOnly={data.purpose === "실거주"}
            region={data.region as Region}
          />
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                const query = new URLSearchParams({
                  houseCount: data.houseCount,
                  married: data.married,
                  children: data.children,
                  income: data.income,
                  price: data.price,
                  loan: data.loan,
                  purpose: data.purpose,
                  moveIn: data.moveIn,
                  region: data.region,
                }).toString();

                window.open(`/consultForm?${query}`, "_blank");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-main-color font-semibold text-white text-sm font-medium shadow-md hover:bg-main-darkest transition"
            >
              더 많은 매물을 문의하기
            </button>
          </div>
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
          <div className="mt-4 flex flex-row gap-3 justify-center">
            <button
              onClick={handleSavePdf}
              className="bg-main-color text-white px-4 py-2 rounded-xl text-sm hover:bg-main-darkest"
            >
              📥 PDF로 저장
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm hover:bg-gray-300"
            >
              🔗 링크 공유
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
