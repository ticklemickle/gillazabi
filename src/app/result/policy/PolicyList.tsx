"use client";

import { Policy, POLICIES } from "./policyLists";

interface Props {
  tags: string[];
}

export default function PolicyList({ tags }: Props) {
  const filtered = POLICIES.filter((p) =>
    p.tags.some((tag) => tags.includes(tag))
  );

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">
        ✅ 이런 정책을 참고하세요
      </h2>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">조건에 맞는 정책이 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((policy) => (
            <a
              key={policy.id}
              href={policy.link}
              target="_blank"
              className="block border p-3 rounded-lg shadow-sm hover:bg-blue-50 transition"
            >
              <h3 className="text-blue-600 font-semibold text-base">
                {policy.title}
              </h3>
              <p className="text-sm whitespace-pre-line text-gray-700">
                {policy.description}
              </p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
