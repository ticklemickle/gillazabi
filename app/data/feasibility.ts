// data/feasibility.ts

import { getThumbnailByUrl } from "../function/getThumbnailByUrl";

export type ScheduleStatus = "done" | "current" | "todo";

export interface FeasibilityData {
  /* =========================
   * Hero / Header 영역
   * ========================= */
  title: string; // 서부선
  subtitle?: string; // 경전철
  expectedCompletion?: string;

  heroLinks?: Array<{
    url: string;
    title: string;
    thumbnail?: string;
  }>;

  /* =========================
   * AI 점수 영역
   * ========================= */
  scoreLabel: string; // AI 성공 예측
  score: number; // 48

  chips: string[]; // 총 사업비, B/C, NPV 요약

  /* =========================
   * 사업 일정
   * ========================= */
  scheduleSteps: Array<{
    label: string;
    period?: string;
    status: ScheduleStatus;
  }>;

  /* =========================
   * 상세 정보 테이블
   * ========================= */
  details: Array<{
    k: string;
    v: string;
  }>;

  /* =========================
   * 보고서 AI 요약
   * ========================= */
  aiSummary?: string;
  benefits?: string[];

  /* =========================
   * 주요 호재 단지
   * ========================= */
  complexes?: Array<{
    name: string;
    price?: string;
    type?: string;
    meta?: string;
    badge?: string;
    badgeDate?: string;
    imageUrl?: string;
  }>;
}

/* =========================
 * 실제 하드코딩 데이터
 * ========================= */

export const feasibilityDataMap: Record<string, FeasibilityData> = {
  /* =========================
   * 서부선
   * ========================= */
  "seobu-line": {
    title: "서부선",
    subtitle: "경전철",
    expectedCompletion: "2028년 4월 준공예정",

    heroLinks: [
      {
        url: "https://namu.wiki/w/%EC%84%9C%EC%9A%B8%20%EA%B2%BD%EC%A0%84%EC%B2%A0%20%EC%84%9C%EB%B6%80%EC%84%A0",
        title: "사업 개요 페이지",
        thumbnail:
          "https://i.namu.wiki/i/l-1wfxPknXxTfzM-SCJ81DoJE9wXCXiU1tnGnB92VkJ4EVBOrcpX4lks-J-ip5B3KjOHh0RFtNXuw7eAqQiNI3tK6ZNudiTY6z88xmomy9dgnQkJMlc4X95BGv5sz5HWWaj0qbC9O32aQyZCR-MJqQ.webp",
      },
      {
        url: "https://www.youtube.com/watch?v=RWyTHNVH5dg",
        title: "홍보 영상",
      },
    ].map((link) => ({
      ...link,
      thumbnail: link.thumbnail ?? getThumbnailByUrl(link.url),
    })),

    scoreLabel: "AI 성공 예측",
    score: 48,

    chips: ["총 사업비 3조 2,131억원", "B/C 1.21", "NPV +1,232억 원"],

    scheduleSteps: [
      { label: "기획", period: "2019~2020", status: "done" },
      { label: "예타", period: "2021~2023", status: "current" },
      { label: "기본설계", period: "예정", status: "todo" },
      { label: "실시설계", period: "예정", status: "todo" },
      { label: "착공", period: "예정", status: "todo" },
      { label: "개통", period: "예정", status: "todo" },
    ],

    details: [
      {
        k: "구성노선",
        v: "고양은평선 / 서울 경전철 서부선(본선) / 서부선 남부연장",
      },
      { k: "착공일", v: "2026년 (예정)" },
      { k: "개업일", v: "2032년 (예정)" },
      { k: "운영자", v: "서부도시철도주식회사(가칭)" },
      { k: "B/C", v: "1.12" },
      { k: "NPV", v: "+ 4,324억 원" },
      { k: "IRR", v: "4.5%" },
      { k: "분석기간", v: "30년" },
      {
        k: "편익 비중",
        v: "시간절감 58%, 혼잡비 24%, 기타 18%",
      },
    ],

    aiSummary:
      "예비타당성조사는 교통수요예측, 비용·편익 분석, 정책성 평가를 종합하여 사업의 추진 필요성과 경제성을 검토하였으며, 기준 할인율 4.5% 적용 시 B/C 1.14, NPV +7,820억 원으로 경제성이 있는 것으로 분석되었습니다.",

    benefits: [
      "교통수요: 개통 5년 후 일일 약 38만 명 이용 예상",
      "주요 편익: 통행시간 절감, 운행비 절감, 환경비용 절감",
      "민감도 분석: 수요 20% 감소 시 B/C 0.96까지 하락",
    ],

    complexes: [
      {
        name: "판교밸리제일풍경채",
        price: "분양가 12억 3,400 ~ 12억 5,400",
        type: "아파트 · 543세대",
        meta: "민간분양(총 543세대)",
        badge: "분양중",
        badgeDate: "2024.07.01",
        imageUrl: "/images/complex-1.jpg",
      },
    ],
  },

  /* =========================
   * GTX-A
   * ========================= */
  "gtx-a": {
    title: "GTX-A",
    subtitle: "광역급행철도",
    expectedCompletion: "2028년 전 구간 개통 예정",

    heroLinks: [
      {
        url: "https://namu.wiki/w/GTX-A",
        title: "GTX-A 노선 개요",
      },
      {
        url: "https://www.youtube.com/watch?v=8W2aYQZp5n8",
        title: "GTX-A 소개 영상",
        thumbnail: "",
      },
    ].map((link) => ({
      ...link,
      thumbnail: link.thumbnail ?? getThumbnailByUrl(link.url),
    })),

    scoreLabel: "AI 성공 예측",
    score: 82,

    chips: ["총 사업비 약 6조 1천억 원", "B/C 1.33", "NPV +3.1조 원"],

    scheduleSteps: [
      { label: "기획", period: "2010~2012", status: "done" },
      { label: "예타", period: "2013~2014", status: "done" },
      { label: "기본설계", period: "2015~2016", status: "done" },
      { label: "실시설계", period: "2016~2017", status: "done" },
      { label: "착공", period: "2018", status: "done" },
      { label: "개통", period: "2024~2028", status: "current" },
    ],

    details: [
      { k: "구간", v: "운정 ↔ 서울역 ↔ 수서 ↔ 동탄" },
      { k: "총 연장", v: "약 83.1km" },
      { k: "착공일", v: "2018년" },
      { k: "개업일", v: "2024~2028년 단계적 개통" },
      { k: "운영자", v: "에스지레일(주)" },
      { k: "B/C", v: "1.33" },
      { k: "NPV", v: "+ 약 3.1조 원" },
      { k: "IRR", v: "6% 내외" },
      { k: "분석기간", v: "30년" },
      {
        k: "편익 비중",
        v: "시간절감 70%, 운영비 절감 15%, 기타 15%",
      },
    ],

    aiSummary:
      "GTX-A 노선은 수도권 남북을 초고속으로 연결하는 핵심 광역교통 인프라로, 통행시간 대폭 단축에 따른 사회적 편익이 매우 크며 예비타당성조사 결과에서도 높은 경제성이 확인되었습니다.",

    benefits: [
      "서울–동탄 약 20분대 이동 가능",
      "수도권 남북 출퇴근 시간 대폭 단축",
      "기존 철도·도로 혼잡 완화 효과 큼",
    ],

    complexes: [
      {
        name: "운정신도시 힐스테이트",
        price: "분양가 8억 ~ 10억",
        type: "아파트 · 1,200세대",
        meta: "GTX-A 운정역 인접",
        badge: "입주중",
        badgeDate: "2024.03.01",
        imageUrl: "/images/complex-gtx-a-1.jpg",
      },
    ],
  },
};
