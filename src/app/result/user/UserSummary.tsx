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
          <input
            type="checkbox"
            className="ml-3 w-4 h-4 accent-main-color"
            checked={visible}
            onChange={() => setVisible(!visible)}
            title="사용자 정보 표시 여부"
          />
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
