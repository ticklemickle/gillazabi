"use client";

import { Listing, RECOMMENDED_LISTINGS } from "./recommendedListings";

interface Props {
  maxPrice: number; // 사용자가 선택한 희망 매매가 (ex: 7.0)
  realUseOnly: boolean; // 실거주 여부
}

export default function RecommendedHomes({ maxPrice, realUseOnly }: Props) {
  const filtered = RECOMMENDED_LISTINGS.filter((item) => {
    const underPrice = item.price <= maxPrice;
    const matchesPurpose = !realUseOnly || item.isForRealUse;
    return underPrice && matchesPurpose;
  });

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">🏘️ 추천 매물</h2>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">
          조건에 맞는 매물을 찾을 수 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              className="block border p-3 rounded-lg shadow-sm hover:bg-blue-50 transition"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.summary}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
