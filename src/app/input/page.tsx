"use client";

import { useEffect, useState } from "react";
import { RadioGroup } from "@/components/inputForm/RadioGroup";
import {
  shouldShowField,
  validateFormData,
  conditionalFields,
  fieldLabels,
  selectFields,
  fieldOptions,
} from "@/components/inputForm/utils";
import { renderCustomSelect } from "@/components/inputForm/renderCustomSelect";
import { renderCheckboxGroup } from "@/components/inputForm/CheckboxGroup";
import { useRouter } from "next/navigation";
import { generateHashedKey } from "@/components/generateHashKEy";
import { doc, setDoc } from "firebase/firestore";
import { getKSTTimestamp } from "@/constants/time";
import { FirebaseDB } from "@/lib/firebase";
import LoadingOverlay from "@/components/LoadingOverlay";
import {
  clearUserStorage,
  getOrCreateUserId,
  loadFormData,
  saveFormData,
} from "@/components/inputForm/lib/userStorage";

export default function inputPage() {
  const [formData, setFormData] = useState<Record<string, any>>({
    birthYear: "",
    childrenBirthYear: "",
    houseCount: "",
    married: "",
    children: "",
    income: "",
    price: "",
    loan: "",
    purpose: "",
    moveIn: "",
    region: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

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

  const handleReset = () => {
    if (confirm("저장된 데이터를 모두 초기화하시겠습니까?")) {
      clearUserStorage();
      window.location.reload();
    }
  };

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const saved = loadFormData();
    if (saved) setFormData(saved);
  }, []);

  const handleSubmit = async () => {
    const missing = validateFormData(formData);

    if (missing.length > 0) {
      const koreanLabels = missing
        .map((key) => `- ${fieldLabels[key] || key}`)
        .join("\n");
      alert(`다음 항목을 선택해주세요:\n${koreanLabels}`);
      return;
    }

    saveFormData(formData);

    const key = generateHashedKey();
    setIsLoading(true);

    try {
      await setDoc(doc(FirebaseDB, "reports", key), {
        ...formData,
        userId: getOrCreateUserId(),
        createdAt: getKSTTimestamp(),
      });
      router.push(`/result?key=${key}`);
    } catch (error) {
      console.error("문서 저장 실패:", error);
      alert("데이터 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 px-4 py-6 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="mt-4 mb-10">
          <div className="relative">
            <h1 className="text-2xl font-semibold text-center text-[#000]">
              부동산 정책 맞춤 조회
            </h1>

            <button
              type="button"
              onClick={handleReset}
              className="absolute top-1/2 -translate-y-1/2 right-0 text-black text-base px-2 py-1 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
              title="전체 초기화"
            >
              ⟳
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {renderCustomSelect(
            "birthYear",
            selectFields.birthYear,
            formData.birthYear,
            handleSelectChange
          )}

          <RadioGroup
            name="houseCount"
            options={fieldOptions.houseCount}
            label={fieldLabels.houseCount}
            value={formData.houseCount}
            onChange={handleChange}
          />
          <RadioGroup
            name="married"
            options={fieldOptions.married}
            label={fieldLabels.married}
            value={formData.married}
            onChange={handleChange}
          />
          <RadioGroup
            name="children"
            options={fieldOptions.children}
            label={fieldLabels.children}
            value={formData.children}
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
          {renderCheckboxGroup({
            name: "region",
            options: selectFields.region.options,
            label: selectFields.region.label,
            value: formData.region,
            onChange: handleCheckboxChange,
          })}
          {renderCustomSelect(
            "price",
            selectFields.price,
            formData.price,
            handleSelectChange
          )}
          <RadioGroup
            name="loan"
            options={fieldOptions.loan}
            label={fieldLabels.loan}
            value={formData.loan}
            onChange={handleChange}
          />

          <RadioGroup
            name="purpose"
            options={fieldOptions.purpose}
            label={fieldLabels.purpose}
            value={formData.purpose}
            onChange={handleChange}
          />

          {shouldShowField("moveIn", formData) && (
            <RadioGroup
              name="moveIn"
              options={fieldOptions.moveIn}
              label={fieldLabels.moveIn}
              value={formData.moveIn}
              onChange={handleChange}
            />
          )}

          <div className="pt-4 space-y-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-main-color text-white font-semibold py-3 rounded-xl hover:bg-main-color/90 transition"
            >
              🔍 나에게 맞는 정책 보기
            </button>
          </div>

          {isLoading && <LoadingOverlay />}
        </div>
      </div>
    </main>
  );
}
