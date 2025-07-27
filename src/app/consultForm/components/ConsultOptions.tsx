"use client";

import { RadioGroup } from "@/components/inputForm/RadioGroup";
import { renderCustomSelect } from "@/components/inputForm/renderCustomSelect";
import { renderCheckboxGroup } from "@/components/inputForm/CheckboxGroup";
import { useState, useEffect } from "react";

type Props = {
  values: {
    day: string[];
    time: string;
    method: string;
    contact: string;
  };
  onChange: (
    field: string,
    value: string | string[],
    checked?: boolean
  ) => void;
};

export default function ConsultOptions({ values, onChange }: Props) {
  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    const current = values[name as keyof typeof values] as string[];
    const newValue = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onChange(name, newValue);
  };

  return (
    <div className="space-y-4">
      {/* ✅ 요일 다중 선택 */}
      {renderCheckboxGroup({
        name: "day",
        label: "상담 가능 요일",
        options: ["월", "화", "수", "목", "금", "토", "일"],
        value: values.day,
        onChange: handleCheckboxChange,
      })}

      {/* ✅ 시간 선택 */}
      {renderCustomSelect(
        "time",
        {
          label: "상담 가능 시간",
          options: [
            "08:00~10:00",
            "10:00~12:00",
            "12:00~15:00",
            "15:00~18:00",
            "18:00~21:00",
            "21시 이후",
          ],
        },
        values.time,
        onChange
      )}

      <RadioGroup
        name="method"
        label="상담 방법"
        options={["전화 / 화상", "카톡", "방문"]}
        value={values.method}
        onChange={(e) => onChange("method", e.target.value)}
      />

      <div>
        <label htmlFor="contact" className="block font-semibold mb-1">
          연락받을 연락처
        </label>
        <input
          id="contact"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={11}
          className="w-full p-2 border rounded text-sm"
          placeholder="예: 01012345678"
          value={values.contact}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, "");
            onChange("contact", onlyNums);
          }}
        />
      </div>
    </div>
  );
}
