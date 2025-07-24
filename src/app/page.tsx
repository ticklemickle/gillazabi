"use client";

import { useState } from "react";
import { RadioGroup } from "@/components/inputForm/RadioGroup";
import {
  shouldShowField,
  validateFormData,
  conditionalFields,
  fieldLabels,
  selectFields,
} from "@/components/inputForm/utils";
import { renderCustomSelect } from "@/components/inputForm/renderCustomSelect";
import { renderCheckboxGroup } from "@/components/inputForm/CheckboxGroup";
import { useRouter } from "next/navigation";
import { generateHashedKey } from "@/components/generateHashKEy";
import { doc, setDoc } from "firebase/firestore";
import { getKSTTimestamp } from "@/constants/time";
import { FirebaseDB } from "@/lib/firebase";

export default function HomePage() {
  const [formData, setFormData] = useState<Record<string, any>>({
    birthYear: "",
    childrenBirthYear: "",
    houseCount: "",
    married: "",
    children: "",
    income: "",
    price: "",
    loan: "",
    liveIn: "",
    moveIn: "",
    area: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      // 종속 필드 초기화
      Object.entries(conditionalFields).forEach(
        ([field, { dependsOn, showIf }]) => {
          if (dependsOn === name && !showIf.includes(value)) {
            next[field] = "";
          }
        }
      );

      return next;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      Object.entries(conditionalFields).forEach(
        ([field, { dependsOn, showIf }]) => {
          if (dependsOn === name && !showIf.includes(value)) {
            next[field] = "";
          }
        }
      );

      return next;
    });
  };

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const current = prev[name] || [];
      const updated = checked
        ? [...current, value]
        : current.filter((item: string) => item !== value);
      return { ...prev, [name]: updated };
    });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    const missing = validateFormData(formData);

    if (missing.length > 0) {
      const koreanLabels = missing
        .map((key) => `- ${fieldLabels[key] || key}`)
        .join("\n");
      alert(`다음 항목을 선택해주세요:\n${koreanLabels}`);
      return;
    }

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

          <RadioGroup
            name="houseCount"
            options={["무주택", "1주택", "2주택 이상"]}
            label="주택 수"
            onChange={handleChange}
          />
          <RadioGroup
            name="married"
            options={["기혼", "미혼"]}
            label="결혼 여부"
            onChange={handleChange}
          />
          <RadioGroup
            name="children"
            options={["있음", "없음"]}
            label="자녀 유무"
            onChange={handleChange}
          />
          {shouldShowField("childrenBirthYear", formData) &&
            renderCustomSelect(
              "childrenBirthYear",
              selectFields.childrenBirthYear,
              formData.childrenBirthYear,
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
          <RadioGroup
            name="loan"
            options={["예", "아니오"]}
            label="현재 대출 여부"
            onChange={handleChange}
          />
          {shouldShowField("moveIn", formData) && (
            <RadioGroup
              name="moveIn"
              options={["3개월 이내", "6개월 이내", "1년 이내", "미정"]}
              label="전입 예정 시기"
              onChange={handleChange}
            />
          )}
          <RadioGroup
            name="liveIn"
            options={["예", "아니오"]}
            label="실거주 여부"
            onChange={handleChange}
          />
          {renderCheckboxGroup({
            name: "area",
            options: selectFields.area.options,
            label: selectFields.area.label,
            value: formData.area,
            onChange: handleCheckboxChange,
          })}

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-main-color text-white font-semibold py-3 rounded-xl hover:bg-main-color/90 transition"
            >
              🔍 나에게 맞는 정책 보기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
