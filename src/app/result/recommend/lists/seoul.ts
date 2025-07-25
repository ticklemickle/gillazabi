import { Listing } from "./houseType";

export const SEOUL_LISTINGS: Listing[] = [
  {
    id: "seoul-001",
    title: "[서울 송파구] 잠실 리센츠",
    summary: "잠실역 도보 3분, 올수리, 남향",
    price: 7.5,
    isForRealUse: true,
    link: "https://example.com/seoul-001",
    region: "서울",
  },
  {
    id: "seoul-002",
    title: "[서울 강서구] 마곡 엠밸리 14단지",
    region: "서울",
    link: "https://new.land.naver.com/complexes/107504?tab=detail&rf=Y",
    price: 6.8,
    summary: "전용 59㎡, 실거래가 약 6.8억 / 실거주 적합",
    isForRealUse: true,
  },
];
