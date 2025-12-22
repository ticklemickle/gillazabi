import React from "react";
import { feasibilityDataMap } from "../data/feasibility";
import PdfDownloadButton from "../function/PdfDownloadButton";
import ShareButton from "../function/ShareButton";
import Summary from "./Summary";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

type Props = {
  selectedRouteId: string | null;
  /** 하단에서 Summary까지 보여줄지 옵션 */
  showSummary?: boolean;
  /** 필요하면 외부에서 높이 조절 */
  maxHeightClassName?: string; // e.g. "max-h-[42vh]"
};

export default function MobileBottomDock({
  selectedRouteId,
  showSummary = false,
  maxHeightClassName = "max-h-[44vh]",
}: Props) {
  const d = selectedRouteId ? feasibilityDataMap[selectedRouteId] : undefined;

  // 선택 전: 하단 안내 바
  if (!d) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto w-full max-w-md rounded-t-2xl border border-neutral-200 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div className="px-4 py-3 text-sm text-neutral-600">
            노선을 선택하면 요약이 하단에 표시됩니다.
          </div>
        </div>
        {/* iPhone 홈바 여백 */}
        <div className="h-[env(safe-area-inset-bottom)] bg-transparent" />
      </div>
    );
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto w-full max-w-md rounded-t-2xl border border-neutral-200 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.10)] overflow-hidden">
        {/* grab handle 느낌 */}
        <div className="flex justify-center pt-2">
          <div className="h-1.5 w-10 rounded-full bg-neutral-200" />
        </div>

        {/* 본문 */}
        <div className={`px-4 pb-3 pt-2 overflow-auto ${maxHeightClassName}`}>
          {/* Title + Share */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <div className="text-lg font-extrabold tracking-tight text-neutral-900 truncate">
                  {d.title}
                </div>
                {d.subtitle ? (
                  <div className="text-sm font-medium text-neutral-500 truncate">
                    {d.subtitle}
                  </div>
                ) : null}
              </div>

              {d.expectedCompletion ? (
                <div className="mt-1 text-xs text-neutral-600">
                  {d.expectedCompletion}
                </div>
              ) : null}
            </div>

            <div className="shrink-0">
              <ShareButton />
            </div>
          </div>

          {/* Score */}
          <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-800">
                {d.scoreLabel}
              </div>
              <div className="text-xl font-extrabold text-neutral-900">
                {d.score}
                <span className="ml-1 text-sm font-bold">점</span>
              </div>
            </div>

            {!!d.chips?.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {d.chips.slice(0, 6).map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex-1">
              <PdfDownloadButton filename="21948_2.제안공고(전문).pdf" />
            </div>

            {/* 필요하면 여기 버튼을 하나 더 두고, showSummary=true로 Summary를 펼치도록 UI 확장 */}
            <button
              type="button"
              className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 active:scale-[0.99]"
              onClick={() => {
                const el = document.getElementById("mobile-summary-anchor");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              요약 보기
            </button>
          </div>

          {/* Optional: Summary (핵심만 넣되, 모바일에서 너무 길면 showSummary 끄는 걸 권장) */}
          {showSummary && (
            <div className="mt-4" id="mobile-summary-anchor">
              <Summary feasibilityKey={selectedRouteId ?? ""} />
            </div>
          )}
        </div>
      </div>

      {/* iPhone 홈바 여백 */}
      <div className="h-[env(safe-area-inset-bottom)] bg-transparent" />
    </div>
  );
}
