"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "@/lib/firebase";
import { generateHashedKey } from "@/components/generateHashKEy";

export default function HomePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = generateHashedKey();

    try {
      await setDoc(doc(FirebaseDB, "reports", key), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      router.push(`/result?key=${key}`);
    } catch (error) {
      console.error("문서 저장 실패:", error);
      alert("데이터 저장 중 오류가 발생했습니다.");
    }
  };

  const renderRadio = (name: string, options: string[]) => (
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
          <div className="py-3 bg-gray-100 rounded-xl text-center font-medium peer-checked:bg-blue-600 peer-checked:text-white cursor-pointer">
            {v}
          </div>
        </label>
      ))}
    </div>
  );

  const renderSelect = (name: string, options: string[], label: string) => (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select
        name={name}
        className="w-full border rounded-xl py-3 px-4"
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        required
      >
        <option value="">선택</option>
        {options.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="bg-gray-50 px-4 py-6 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          🏠 부동산 정책 맞춤 조회
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {renderSelect(
            "birthYear",
            ["2000년 이후", "1990년대", "1980년대", "1970년대"],
            "출생연도"
          )}
          {renderRadio("houseCount", ["무주택", "1주택", "2주택 이상"])}
          {renderRadio("married", ["기혼", "미혼"])}
          {renderRadio("children", ["있음", "없음"])}
          {renderSelect(
            "income",
            ["5,000만원 미만", "1억원 미만", "1억원 이상"],
            "연소득 (세전)"
          )}
          {renderRadio("planBuy", ["있음", "없음"])}
          {renderSelect(
            "price",
            ["6억 미만", "6억 ~ 9억", "9억 초과"],
            "희망 매매가"
          )}
          {renderRadio("loan", ["예", "아니오"])}
          {renderRadio("liveIn", ["예", "아니오"])}
          {renderRadio("moveIn", ["예", "아니오"])}
          {renderRadio("jeonseLoan", ["예", "아니오"])}
          {renderSelect(
            "loanPurpose",
            ["주택 구입", "전세 보증금", "생활자금", "기타"],
            "대출의 주요 목적"
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            >
              🔍 나에게 맞는 정책 보기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
