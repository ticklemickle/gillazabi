import { FeasibilityData } from "@/app/data/feasibility";
import StatusDot from "./Function";

type Props = {
  steps?: FeasibilityData["scheduleSteps"];
};

export default function ScheduleSection({ steps }: Props) {
  if (!steps?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">사업일정</h2>

      <div className="relative">
        <div className="absolute left-0 right-0 top-[10px] h-[2px] bg-neutral-200" />

        <div className="grid grid-cols-6 gap-2">
          {steps.map((s) => (
            <div key={s.label} className="relative flex flex-col items-center">
              <StatusDot status={s.status} />
              <div className="mt-2 text-xs font-medium text-neutral-700">
                {s.label}
              </div>
              <div className="text-[11px] text-neutral-400">{s.period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
