"use client";

import React, { useMemo, useState } from "react";
import { feasibilityDataMap } from "@/app/data/feasibility";
import type { FeasibilityData } from "@/app/data/feasibility";

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
        "h-10 w-full rounded-md border transition text-sm font-semibold",
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
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">
        {title}
      </h2>

      <div className="grid grid-cols-3 gap-x-3 gap-y-3">
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

// SidebarDefault.tsx
type Filters = { region: string; stage: string };

export default function SidebarDefault({
  filters,
  onChangeFilters,
  onSelectRouteId,
}: {
  filters: Filters;
  onChangeFilters: (next: Filters) => void;
  onSelectRouteId?: (routeId: string) => void;
}) {
  const region = filters.region;
  const stage = filters.stage;

  // ✅ 기존 setRegion/setStage 대신:
  const setRegion = (id: string) => onChangeFilters({ ...filters, region: id });
  const setStage = (id: string) => onChangeFilters({ ...filters, stage: id });

  // ✅ feasibilityDataMap -> 배열화 후 필터
  const filteredRoutes = useMemo(() => {
    const all = Object.entries(feasibilityDataMap) as Array<
      [string, FeasibilityData]
    >;

    return all.filter(([_, d]) => {
      // regionId/stageId가 없으면 안전하게 통과시키지 않음(데이터 정합성)
      if (!d.regionId || !d.stageId) return false;

      const regionOk = region === "all" || d.regionId === region;
      const stageOk = stage === "all" || d.stageId === stage;

      return regionOk && stageOk;
    });
  }, [region, stage]);

  return (
    <div className="w-full max-w-md bg-white">
      {/* ✅ pr-15 버그 제거: Tailwind 기본 스케일에 없음 */}
      <div className="px-6 py-10 space-y-8">
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

        {/* ✅ 필터 결과 리스트 */}
        <section className="space-y-3 pt-2">
          <div className="flex items-baseline justify-between">
            <h3 className="text-base font-bold text-neutral-900">노선 목록</h3>
            <span className="text-sm text-neutral-500">
              {filteredRoutes.length}개
            </span>
          </div>

          {filteredRoutes.length === 0 ? (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
              조건에 맞는 노선이 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredRoutes.map(([routeId, d]) => (
                <button
                  key={routeId}
                  type="button"
                  onClick={() => onSelectRouteId?.(routeId)}
                  className={[
                    "w-full rounded-xl border border-neutral-200 bg-white p-3 text-left",
                    "hover:bg-neutral-50 transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-main-light",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-extrabold text-neutral-900 truncate">
                        {d.title}
                      </div>
                      {d.subtitle && (
                        <div className="text-sm text-neutral-500 truncate">
                          {d.subtitle}
                        </div>
                      )}
                    </div>

                    <div className="text-sm font-bold text-neutral-800">
                      {d.score}
                      <span className="ml-1 text-xs text-neutral-500">점</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
