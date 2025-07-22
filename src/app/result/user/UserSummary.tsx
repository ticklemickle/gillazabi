// components/UserSummary.tsx

"use client";

interface Props {
  data: Record<string, string>;
}

export default function UserSummary({ data }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold border-b pb-1 mb-2">
        👤 사용자 정보 요약
      </h2>
      <ul className="text-sm list-disc list-inside space-y-1">
        <li>
          {data.houseCount} / {data.married} / 자녀{" "}
          {data.children === "있음" ? "1명 이상" : "없음"}
        </li>
        <li>연소득 {data.income}</li>
        <li>
          {data.planBuy === "있음" ? "매수 계획 있음" : "매수 계획 없음"} (
          {data.price}, 대출 {data.loan})
        </li>
        <li>
          {data.liveIn === "예" ? "실거주 예정" : "비거주"} /{" "}
          {data.moveIn === "예" ? "6개월 내 전입 예정" : "전입 계획 없음"}
        </li>
      </ul>
    </section>
  );
}
