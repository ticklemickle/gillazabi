"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "@/lib/firebase";
import { generateHashedKey } from "@/components/generateHashKEy";
import { selectFields } from "@/components/selection/formSchema";
import { renderCustomSelect } from "@/components/selection/renderCustomSelect";
import { getKSTTimestamp } from "@/constants/time";

const fieldLabels: Record<string, string> = {
  birthYear: "출생연도",
  houseCount: "주택 수",
  married: "결혼 여부",
  children: "자녀 유무",
  income: "연소득",
  planBuy: "주택 구매 계획",
  price: "희망 매매가",
  loan: "현재 대출 여부",
  liveIn: "매수 후 거주 여부",
  moveIn: "2년 이내 입주 계획",
  jeonseLoan: "전세자금 대출 여부",
  loanPurpose: "대출의 주요 목적",
};

export default function HomePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<Record<string, string>>({
    birthYear: "",
    houseCount: "",
    married: "",
    children: "",
    income: "",
    planBuy: "",
    price: "",
    loan: "",
    liveIn: "",
    moveIn: "",
    jeonseLoan: "",
    loanPurpose: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFormData = () => {
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => value === "")
      .map(([key]) => fieldLabels[key] || key);

    if (emptyFields.length > 0) {
      alert(`다음 항목을 선택해주세요:\n- ${emptyFields.join("\n- ")}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormData()) return; // 유효성 검사 실패 시 중단

    const key = generateHashedKey();

    try {
      await setDoc(doc(FirebaseDB, "reports", key), {
        ...formData,
        createdAt: getKSTTimestamp(),
      });
      router.push(`/result?key=${key}`);
    } catch (error) {
      console.error("문서 저장 실패:", error);
      alert("데이터 저장 중 오류가 발생했습니다.");
    }
  };

  const renderRadio = (name: string, options: string[], label?: string) => (
    <div className="space-y-1">
      {label && (
        <label className="block font-semibold text-[#000] mb-1">{label}</label>
      )}
      <div className="flex gap-3">
        {options.map((v) => (
          <label className="flex-1 block" key={v}>
            <input
              type="radio"
              name={name}
              value={v}
              className="sr-only peer"
              onChange={handleChange}
            />
            <div
              className="py-3 bg-gray-100 rounded-xl text-center cursor-pointer text-[#000]
             border border-transparent 
             hover:border-main-color hover:text-main-color hover:font-semibold
             peer-checked:border-main-color peer-checked:text-main-color peer-checked:font-semibold"
            >
              {v}
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <main className="bg-gray-50 px-4 py-6 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-[#000]">
          🏠 부동산 정책 맞춤 조회
        </h1>

        <div className="space-y-4">
          {renderCustomSelect(
            "birthYear",
            selectFields.birthYear,
            formData.birthYear,
            handleSelectChange
          )}

          {renderCustomSelect(
            "income",
            selectFields.income,
            formData.income,
            handleSelectChange
          )}

          {renderCustomSelect(
            "price",
            selectFields.price,
            formData.price,
            handleSelectChange
          )}

          {renderCustomSelect(
            "loanPurpose",
            selectFields.loanPurpose,
            formData.loanPurpose,
            handleSelectChange
          )}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {renderRadio(
            "houseCount",
            ["무주택", "1주택", "2주택 이상"],
            "주택 수"
          )}
          {renderRadio("married", ["기혼", "미혼"], "결혼 여부")}
          {renderRadio("children", ["있음", "없음"], "자녀 유무")}

          {renderRadio("planBuy", ["있음", "없음"], "주택 구매 계획")}
          {renderRadio("loan", ["예", "아니오"], "현재 대출 여부")}
          {renderRadio("liveIn", ["예", "아니오"], "매수 후 거주 여부")}
          {renderRadio("moveIn", ["예", "아니오"], "2년 이내 입주 계획")}
          {renderRadio("jeonseLoan", ["예", "아니오"], "전세자금 대출 여부")}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-main-color text-white font-semibold py-3 rounded-xl hover:bg-main-color/90 transition"
            >
              🔍 나에게 맞는 정책 보기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
