"use client";

import { Region } from "./lists/houseType";
import { RECOMMENDED_LISTINGS } from "./recommendedListings";

interface Props {
  maxPrice: number;
  realUseOnly: boolean;
  region: Region;
}

export default function RecommendedHomes({
  maxPrice,
  realUseOnly,
  region,
}: Props) {
  const filtered = RECOMMENDED_LISTINGS.filter((item) => {
    const underPrice = item.price <= maxPrice;
    const matchesPurpose = !realUseOnly || item.isForRealUse;
    const matchesRegion = Array.isArray(region)
      ? region.includes(item.region)
      : item.region === region;

    console.log("📦 매물 검사:", item.title);
    console.log(" - 가격:", item.price, " / 조건:", maxPrice, "→", underPrice);
    console.log(
      " - 실거주:",
      item.isForRealUse,
      " / 조건:",
      realUseOnly,
      "→",
      matchesPurpose
    );
    console.log(
      " - 지역:",
      item.region,
      " / 조건:",
      region,
      "→",
      matchesRegion
    );
    console.log(
      "✅ 최종 포함 여부:",
      underPrice && matchesPurpose && matchesRegion
    );
    console.log("----------");

    return underPrice && matchesPurpose && matchesRegion;
  });

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">
        🏘️ 추천 매물 TOP 3
      </h2>
      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">
          조건에 맞는 매물을 찾을 수 없습니다.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.slice(0, 3).map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              className="block border p-3 rounded-lg shadow-sm hover:bg-blue-50 transition"
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.summary}</p>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
