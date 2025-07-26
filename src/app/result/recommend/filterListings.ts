// lib/recommendation/filterListings.ts

import { Listing, Region } from "./lists/houseType";

interface FilterOptions {
  maxPrice: number;
  realUseOnly: boolean;
  region: Region;
}

export function filterRecommendedListings(
  listings: Listing[],
  options: FilterOptions
): Listing[] {
  const { maxPrice, realUseOnly, region } = options;

  return listings.filter((item) => {
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
}
