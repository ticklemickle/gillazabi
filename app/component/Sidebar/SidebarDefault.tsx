"use client";

import React, { useMemo, useState } from "react";

type Option = { id: string; label: string };

const REGION_OPTIONS: Option[] = [
  { id: "all", label: "전체" },
  { id: "gangnam", label: "강남권" },
  { id: "gangbuk", label: "강북권" },
  { id: "seonam", label: "서남권" },
  { id: "seobuk", label: "서북권" },
  { id: "incheon", label: "인천, 광역" },
  { id: "gg_north", label: "경기 북부" },
  { id: "gg_south", label: "경기 남부" },
];

const STAGE_OPTIONS: Option[] = [
  { id: "all", label: "전체" },
  { id: "plan", label: "계획" },
  { id: "pre_feasibility", label: "예비타당성" },
  { id: "basic_plan", label: "기본계획" },
  { id: "design_bid", label: "설계, 입찰" },
  { id: "construction", label: "공사 중" },
  { id: "partial_open", label: "부분 개통" },
  { id: "open_done", label: "개통 완료" },
  { id: "review", label: "검토 단계" },
];

function FilterChipButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 w-full rounded-md border transition text-sm",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-main-light",
        selected
          ? "border-rose-500 bg-rose-100 text-red-600"
          : "border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Section({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}) {
  // 스샷 느낌처럼 3열 그리드 + 마지막 줄 2개여도 유지
  const gridCols = "grid-cols-3";

  return (
    <section className="space-y-4">
      <h2 className="font-extrabold tracking-tight text-neutral-900">
        {title}
      </h2>

      <div className={`grid ${gridCols} gap-x-3 gap-y-3`}>
        {options.map((opt) => (
          <FilterChipButton
            key={opt.id}
            label={opt.label}
            selected={value === opt.id}
            onClick={() => onChange(opt.id)}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Sidebar의 "default 화면" 컴포넌트
 * - 아무것도 누르지 않았을 때 렌더링
 * - 필요하면 onApply로 부모에 선택값 전달 가능
 */
export default function SidebarDefault({
  onApply,
}: {
  onApply?: (filters: { region: string; stage: string }) => void;
}) {
  const [region, setRegion] = useState<string>("all");
  const [stage, setStage] = useState<string>("all");

  const filters = useMemo(() => ({ region, stage }), [region, stage]);

  // 선택 즉시 반영을 원하면 여기에서 호출
  React.useEffect(() => {
    onApply?.(filters);
  }, [filters, onApply]);

  return (
    <div className="w-full max-w-md bg-white">
      <div className="px-6 pr-15 py-10 space-y-10">
        <Section
          title="권역 선택"
          options={REGION_OPTIONS}
          value={region}
          onChange={setRegion}
        />

        <div className="border-t border-dashed border-neutral-300" />

        <Section
          title="진행 단계"
          options={STAGE_OPTIONS}
          value={stage}
          onChange={setStage}
        />
      </div>
    </div>
  );
}
