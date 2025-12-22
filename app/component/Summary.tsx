import { feasibilityDataMap } from "../data/feasibility";
import type { FeasibilityData } from "../data/feasibility";

type Props = {
  feasibilityKey: string;
};

export default function Summary({ feasibilityKey }: Props) {
  const d: FeasibilityData | undefined = feasibilityDataMap[feasibilityKey];

  // key가 없거나, 요약/편익이 없으면 렌더링 안 함
  if (!d || (!d.aiSummary && (!d.benefits || d.benefits.length === 0))) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">보고서 AI 요약</h2>
      </div>

      {d.aiSummary && (
        <p className="text-sm leading-6 text-neutral-700">{d.aiSummary}</p>
      )}

      {!!d.benefits?.length && (
        <ul className="list-disc pl-5 text-sm space-y-1 text-neutral-800">
          {d.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
