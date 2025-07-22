export interface Policy {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export const POLICIES: Policy[] = [
  {
    id: "baby-loan",
    title: "신생아 특례대출",
    description:
      "2023년 이후 출산한 무주택 가구 대상.\n최대 5억 원, 고정금리 1.6~2.7% (5년)",
    link: "https://www.hankyung.com/realestate/article/2024010200001",
    tags: ["무주택", "자녀", "대출"],
  },
  {
    id: "plan-report",
    title: "자금조달계획서 제출 의무",
    description: "수도권 6억 초과 매매 시 자금조달계획서 제출 필수.",
    link: "https://www.mk.co.kr/news/realestate/10836484",
    tags: ["수도권", "6억초과", "대출"],
  },
  {
    id: "ltv-change",
    title: "생애최초 LTV 축소",
    description: "LTV 80% → 70% 축소, 디딤돌·버팀목도 대상 포함.",
    link: "https://biz.chosun.com/real_estate/2023/06/27/IQ5HGGRMWJDOPCLOLYVM3HCFDA/",
    tags: ["생애최초", "대출", "LTV"],
  },
  {
    id: "june27",
    title: "6.27 대책 – 전입의무 강화",
    description: "주담대 이용 시 6개월 내 전입 의무.",
    link: "https://www.koreatimes.co.kr/www/nation/2023/06/488_353481.html",
    tags: ["전입", "실거주", "대출"],
  },
];
