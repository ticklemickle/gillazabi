// components/formSchema.ts
export const selectFields = {
  birthYear: {
    label: "출생연도",
    options: ["2000년 이후", "1990년대", "1980년대", "1970년대"],
  },
  income: {
    label: "연소득 (세전)",
    options: ["5,000만원 미만", "1억원 미만", "1억원 이상"],
  },
  price: {
    label: "희망 매매가",
    options: ["6억 미만", "6억 ~ 9억", "9억 초과"],
  },
  loanPurpose: {
    label: "대출의 주요 목적",
    options: ["주택 구입", "전세 보증금", "생활자금", "기타"],
  },
} as const;
