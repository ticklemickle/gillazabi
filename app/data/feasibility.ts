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
        url: "https://namu.wiki/w/%EC%88%98%EB%8F%84%EA%B6%8C%20%EA%B4%91%EC%97%AD%EA%B8%89%ED%96%89%EC%B2%A0%EB%8F%84%20A%EC%84%A0",
        title: "수도권 광역급행철도 A선",
        thumbnail:
          "data:image/jpeg;base64,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",
      },
      {
        url: "https://www.youtube.com/watch?v=Py8gFf5cYbk&pp=ygUFZ3R4LWE%3D",
        title: "GTX-A 소개 영상",
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
