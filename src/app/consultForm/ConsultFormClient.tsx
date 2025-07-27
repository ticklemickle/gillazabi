"use client";

import { fieldLabels } from "@/components/inputForm/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ConsultOptions from "./components/ConsultOptions";
import {
  getOrCreateUserId,
  saveFormData,
} from "@/components/inputForm/lib/userStorage";
import { generateHashedKey } from "@/components/generateHashKEy";
import { doc, setDoc } from "firebase/firestore";
import { getKSTTimestamp } from "@/constants/time";
import { FirebaseDB } from "@/lib/firebase";

export default function ConsultFormClient() {
  const params = useSearchParams();
  const [extraMessage, setExtraMessage] = useState("");
  const [consultData, setConsultData] = useState({
    day: [] as string[],
    time: "",
    method: "",
    contact: "",
  });

  const router = useRouter();

  const fields = {
    houseCount: params.get("houseCount") || "",
    married: params.get("married") || "",
    children: params.get("children") || "",
    income: params.get("income") || "",
    price: params.get("price") || "",
    loan: params.get("loan") || "",
    purpose: params.get("purpose") || "",
    moveIn: params.get("moveIn") || "",
    region: params.get("region") || "",
  };

  const handleChangeConsultData = (field: string, value: string | string[]) => {
    setConsultData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ...fields,
      ...consultData,
      extraMessage,
    };

    const missing = Object.entries(formData)
      .filter(([_, v]) => v === "" || (Array.isArray(v) && v.length === 0))
      .map(([k]) => k);

    if (missing.length > 0) {
      const koreanLabels = missing
        .map((key) => `- ${fieldLabels[key] || key}`)
        .join("\n");
      alert(`다음 항목을 입력해주세요:\n${koreanLabels}`);
      return;
    }

    if (extraMessage.trim().length < 5) {
      alert("추가 문의 내용은 최소 5자 이상 입력해주세요.");
      return;
    }

    const contact = formData.contact;
    if (!/^010\d{8}$/.test(contact)) {
      alert("휴대폰 번호를 다시 확인해주세요.");
      return;
    }

    const key = generateHashedKey();

    try {
      await setDoc(doc(FirebaseDB, "consultations", key), {
        ...formData,
        userId: getOrCreateUserId(),
        createdAt: getKSTTimestamp(),
      });

      alert("상담 신청이 완료되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("Firebase 저장 실패:", error);
      alert("데이터 저장 중 오류가 발생했습니다. 다시 시도 부탁드립니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 text-sm shadow p-4">
      <h1 className="text-lg font-semibold text-center">
        부동산 상담 신청하기
      </h1>

      <ul className="bg-white rounded space-y-2">
        {Object.entries(fields).map(([key, value]) => (
          <li
            key={key}
            className="flex justify-between border-b pb-1 last:border-b-0"
          >
            <span className="font-semibold">{fieldLabels[key] || key}</span>
            <span className="text-gray-700">{value}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="pt-4 space-y-4">
        <div>
          <label htmlFor="extraMessage" className="block font-semibold mb-1">
            추가로 문의하고 싶은 내용
          </label>
          <textarea
            id="extraMessage"
            value={extraMessage}
            onChange={(e) => setExtraMessage(e.target.value)}
            rows={4}
            maxLength={200}
            className="w-full p-2 border rounded text-sm"
            placeholder="예: 대출 조건이 어떻게 되는지 궁금합니다."
          />
        </div>

        <ConsultOptions
          values={consultData}
          onChange={handleChangeConsultData}
        />
        <button
          type="submit"
          className="w-full py-3 rounded text-white font-semibold bg-main-color"
        >
          신청하기
        </button>
      </form>
    </div>
  );
}
