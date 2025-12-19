import { feasibilityData } from "../data/feasibility";

export default function Summary() {
  const d = feasibilityData;

  if (!d.aiSummary && (!d.benefits || d.benefits.length === 0)) return null;

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
