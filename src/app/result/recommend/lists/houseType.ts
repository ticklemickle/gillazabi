export type Region =
  | "서울"
  | "경기 북부"
  | "경기 남부"
  | "인천"
  | "지방 광역시";

export interface Listing {
  id: string;
  title: string;
  summary: string;
  price: number; // 단위: 억
  isForRealUse: boolean;
  link: string;
  region: Region;
}
