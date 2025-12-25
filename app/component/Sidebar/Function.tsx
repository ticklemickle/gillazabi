import { ScheduleStatus } from "@/app/data/feasibility";

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

export default function StatusDot({ status }: { status: ScheduleStatus }) {
  if (status === "done") {
    return (
      <span className="h-5 w-5 rounded-full bg-main ring-4 ring-main-light" />
    );
  }
  if (status === "current") {
    return (
      <span className="relative h-5 w-5 rounded-full border-2 border-main-light bg-white">
        <span className="absolute inset-1 rounded-full bg-main-light" />
      </span>
    );
  }
  return (
    <span className="h-5 w-5 rounded-full border-2 border-neutral-200 bg-white" />
  );
}
