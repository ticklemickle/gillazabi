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
    link: "https://www.myhome.go.kr/hws/portal/cont/selectBabySpecialCaseStepStoneLoneView.do",
    tags: ["무주택", "자녀", "대출"],
  },
  {
    id: "plan-report",
    title: "자금조달계획서 제출 의무",
    description: "수도권 6억 초과 매매 시 자금조달계획서 제출 필수.",
    link: "https://nexttala.com/2025%EB%85%84-%EB%B6%80%EB%8F%99%EC%82%B0-%EC%9E%90%EA%B8%88%EC%A1%B0%EB%8B%AC%EA%B3%84%ED%9A%8D%EC%84%9C-%EC%A0%9C%EC%B6%9C%EA%B3%BC-%EC%9E%90%EA%B8%88-%EC%B6%9C%EC%B2%98-%EC%86%8C%EB%AA%85-%EA%B0%80/",
    tags: ["수도권", "6억초과", "대출"],
  },
  {
    id: "ltv-change",
    title: "생애최초 LTV 축소",
    description: "LTV 80% → 70% 축소, 디딤돌·버팀목도 대상 포함.",
    link: "https://www.fsc.go.kr/no010101/84824",
    tags: ["생애최초", "대출", "LTV"],
  },
  {
    id: "june27",
    title: "6.27 대책 - 전입의무 강화",
    description: "주담대 이용 시 6개월 내 전입 의무.",
    link: "https://www.korea.kr/news/policyNewsView.do?newsId=148945077",
    tags: ["전입", "실거주", "대출"],
  },
  {
    id: "policy-010",
    title: "내집마련 디딤돌 대출",
    description:
      "신혼부부·다자녀·생애최초 구매자 대상 주택구입 자금 대출 프로그램",
    link: "https://www.hf.go.kr/ko/sub01/sub01_02_01.do",
    tags: ["구입", "대출", "신혼부부"],
  },
  {
    id: "policy-011",
    title: "생애최초 주택구입자 취득세 감면",
    description:
      "생애최초 주택 구입자에 대해 취득세 최대 200만 원 감면. 주택 가격 1.5억~3억 이하 대상.",
    link: "https://www.korea.kr/news/policyNewsView.do?newsId=148898057", // 정책 브리핑 참고
    tags: ["생애최초", "구입", "취득세"],
  },
  {
    id: "policy-012",
    title: "실수요자 양도소득세 비과세",
    description:
      "1가구 1주택 실수요자가 보유 2년 이상, 거주 2년 이상 시 양도세 비과세 혜택.",
    link: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=1863&cntntsId=7995",
    tags: ["1가구1주택", "양도세", "비과세"],
  },
  {
    id: "policy-013",
    title: "청년 생애최초 주택 구입 지원",
    description:
      "청년층(만 34세 이하) 생애최초 주택 구입 시 최대 1억 원 저리 대출(연 1.5% 고정).",
    link: "https://www.molit.go.kr/USR/BORD0201/m_69/DTL.jsp?id=95080365",
    tags: ["청년", "생애최초", "구입", "대출"],
  },
];
