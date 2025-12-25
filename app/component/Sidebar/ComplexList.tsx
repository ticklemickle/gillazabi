type Complex = {
  name: string;
  imageUrl?: string;
  price?: string;
  badge?: string;
  badgeDate?: string;
  type?: string;
  meta?: string;
};

export default function ComplexList({ complexes }: { complexes?: Complex[] }) {
  if (!complexes?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">주요 호재 단지</h2>

      <div className="space-y-3">
        {complexes.map((c) => (
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
  );
}
