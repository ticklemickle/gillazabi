import { feasibilityData } from "../data/feasibility";
import Summary from "./Summary";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function StatusDot({ status }: { status: "done" | "current" | "todo" }) {
  if (status === "done") {
    return (
      <span className="h-5 w-5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
    );
  }
  if (status === "current") {
    return (
      <span className="relative h-5 w-5 rounded-full border-2 border-emerald-500 bg-white">
        <span className="absolute inset-1 rounded-full bg-emerald-500" />
      </span>
    );
  }
  return (
    <span className="h-5 w-5 rounded-full border-2 border-neutral-200 bg-white" />
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export default function Sidebar() {
  const d = feasibilityData;

  return (
    <div className="w-full max-w-md bg-white">
      {/* Hero images */}
      {(d.heroLeftImageUrl || d.heroRightImageUrl) && (
        <div className="grid grid-cols-2 gap-2 p-3">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            {d.heroLeftImageUrl ? (
              <img
                src={d.heroLeftImageUrl}
                alt="hero-left"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
            {d.heroRightImageUrl ? (
              <img
                src={d.heroRightImageUrl}
                alt="hero-right"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>
        </div>
      )}

      <div className="px-5 pb-8 space-y-6">
        {/* Title row */}
        <header className="pt-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
                  {d.title}
                </h1>
                {d.subtitle && (
                  <span className="text-lg font-medium text-neutral-500">
                    {d.subtitle}
                  </span>
                )}
              </div>
              {d.expectedCompletion && (
                <p className="mt-2 text-base text-neutral-700">
                  {d.expectedCompletion}
                </p>
              )}
            </div>

            <button
              type="button"
              className="mt-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-50"
              aria-label="공유"
            >
              <ShareIcon />
              <span className="hidden sm:inline">공유</span>
            </button>
          </div>
        </header>

        {/* AI score */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-emerald-600">
              {d.scoreLabel}
            </span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-xs text-neutral-500">
              ?
            </span>
          </div>

          <div className="text-5xl font-extrabold text-emerald-600 leading-none">
            {d.score}
            <span className="ml-1 text-2xl font-bold">점</span>
          </div>

          {!!d.chips?.length && (
            <div className="flex flex-wrap gap-2 pt-1">
              {d.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          )}
        </section>

        {/* Schedule */}
        {!!d.scheduleSteps?.length && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold">사업일정</h2>

            <div className="relative">
              {/* line */}
              <div className="absolute left-0 right-0 top-[10px] h-[2px] bg-neutral-200" />

              <div className="grid grid-cols-6 gap-2">
                {d.scheduleSteps.map((s) => (
                  <div
                    key={s.label}
                    className="relative flex flex-col items-center"
                  >
                    <StatusDot status={s.status} />
                    <div className="mt-2 text-xs font-medium text-neutral-700">
                      {s.label}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {s.period}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Details */}
        {!!d.details?.length && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">상세정보</h2>

              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-50"
                aria-label="예비타당성조사보고서 다운로드"
              >
                <DownloadIcon />
                <span>예비타당성조사보고서</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <table className="w-full text-sm">
                <tbody>
                  {d.details.map((row) => (
                    <tr key={row.k} className="border-t first:border-t-0">
                      <td className="w-28 bg-neutral-50 px-3 py-2 text-neutral-600">
                        {row.k}
                      </td>
                      <td className="px-3 py-2 text-neutral-900">{row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* AI summary */}
        <Summary />

        {/* Complexes */}
        {!!d.complexes?.length && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold">주요 호재 단지</h2>

            <div className="space-y-3">
              {d.complexes.map((c) => (
                <div
                  key={c.name}
                  className="flex gap-3 rounded-2xl border border-neutral-200 p-3"
                >
                  <div className="h-20 w-20 flex-none overflow-hidden rounded-xl bg-neutral-100">
                    {c.imageUrl ? (
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-900 truncate">
                          {c.name}
                        </div>
                        {c.price && (
                          <div className="mt-1 text-sm font-semibold text-sky-600">
                            {c.price}
                          </div>
                        )}
                      </div>

                      {c.badge && (
                        <div className="flex flex-col items-end gap-1">
                          <span className="inline-flex rounded-md bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
                            {c.badge}
                          </span>
                          {c.badgeDate && (
                            <span className="text-[11px] text-neutral-400">
                              {c.badgeDate}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-neutral-600 space-y-0.5">
                      {c.type && <div>{c.type}</div>}
                      {c.meta && <div>{c.meta}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
