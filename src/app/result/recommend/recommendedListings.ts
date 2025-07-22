export interface Listing {
  id: string;
  title: string;
  region: string;
  link: string;
  price: number; // 단위: 억
  area: string;
  summary: string;
  isForRealUse: boolean;
}

export const RECOMMENDED_LISTINGS: Listing[] = [
  {
    id: "magok14",
    title: "📍 [서울 강서구] 마곡 엠밸리 14단지",
    region: "서울",
    link: "https://new.land.naver.com/complexes/107504?tab=detail&rf=Y",
    price: 6.8,
    area: "59㎡",
    summary: "전용 59㎡, 실거래가 약 6.8억 / 실거주 적합",
    isForRealUse: true,
  },
  {
    id: "wirye",
    title: "📍 [경기 하남시] 위례 자연앤센트럴",
    region: "경기",
    link: "https://new.land.naver.com/complexes/109266?tab=detail&rf=Y",
    price: 7.1,
    area: "74㎡",
    summary: "전용 74㎡, 최근 거래가 7.1억 / 대출 가능",
    isForRealUse: true,
  },
  {
    id: "songdo",
    title: "📍 [인천 송도] 더샵 센트럴시티",
    region: "인천",
    link: "https://new.land.naver.com/complexes/110656?tab=detail&rf=Y",
    price: 6.9,
    area: "84㎡",
    summary: "전용 84㎡, 약 6.9억 / 전입조건 충족 단지",
    isForRealUse: true,
  },
];
