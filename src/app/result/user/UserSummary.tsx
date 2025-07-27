"use client";
import { useState } from "react";
interface Props {
  data: Record<string, string>;
}

export default function UserSummary({ data }: Props) {
  const [visible, setVisible] = useState(true);

  return (
    <section>
      <div className="flex items-center justify-between border-b pb-1 mb-2">
        <h2 className="text-lg font-semibold flex items-center">
          👤 사용자 정보
          <label className="ml-3 relative w-5 h-5 cursor-pointer">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={visible}
              onChange={() => setVisible(!visible)}
              title="사용자 정보 표시 여부"
            />
            {/* 외곽 원형 */}
            <div className="w-5 h-5 rounded-full border bg-white peer-checked:bg-main-color flex items-center justify-center transition-colors">
              {/* 체크 아이콘 (항상 표시) */}
              <svg
                className={`w-3 h-3 stroke-[3] ${
                  visible ? "stroke-white" : "stroke-gray-300"
                }`}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </label>
        </h2>
      </div>

      {visible && (
        <ul className="mb-6 text-sm list-disc list-inside space-y-1">
          <li>
            {data.houseCount} / {data.married} / 자녀{" "}
            {data.children === "있음" ? "1명 이상" : "없음"}
          </li>
          <li>연소득 {data.income}</li>
          <li>
            희망 매매가: {data.price}, 대출: {data.loan}{" "}
          </li>
          <li>
            {data.liveIn === "예" ? "실거주 예정" : "비거주"} /{" "}
            {data.moveIn === "예" ? "6개월 내 전입 예정" : "전입 계획 없음"}
          </li>
        </ul>
      )}
    </section>
  );
}
