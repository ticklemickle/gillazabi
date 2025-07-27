export const fieldLabels: Record<string, string> = {
  birthYear: "출생연도",
  childrenBirthYear: "자녀 출생년도",
  houseCount: "주택 수",
  married: "결혼 여부",
  children: "자녀 유무",
  income: "연소득",
  price: "희망 매매가",
  loan: "대출 필요 여부",
  purpose: "투자 목적",
  moveIn: "이사 예정일",
  region: "희망 지역",
  day: "상담 가능 요일",
  time: "상담 가능 시간",
  method: "상담 방법",
  contact: "연락처",
  extraMessage: "추가 문의 내용",
};

export const fieldOptions: Record<string, string[]> = {
  houseCount: ["무주택", "1주택", "2주택 이상"],
  married: ["기혼", "미혼"],
  children: ["있음", "없음"],
  purpose: ["실거주", "투자"],
  loan: ["예", "아니오"],
  moveIn: ["3개월 내", "6개월 내", "1년 내", "미정"],
  childrenBirthYear: ["없음", "2024년 이후", "2023년", "2022년 이전"],
  birthYear: ["1990년 이전", "1991~1995년", "1996~2000년", "2001년 이후"],
  income: [
    "4천만 원 이하",
    "4천 ~ 6천만 원",
    "6천 ~ 9천만 원",
    "9천 ~ 1.3억 원",
    "1.3억 원 이상",
  ],
  price: ["6억 이하", "6억 ~ 9억", "9억 ~ 12억", "12억 ~ 18억", "18억 이상"],
  region: ["서울", "경기 북부", "경기 남부", "인천", "지방 광역시"],
};

export const selectFields = {
  birthYear: {
    label: fieldLabels.birthYear,
    options: fieldOptions.birthYear,
  },
  childrenBirthYear: {
    label: fieldLabels.childrenBirthYear,
    options: fieldOptions.childrenBirthYear,
  },
  income: {
    label: fieldLabels.income,
    options: fieldOptions.income,
  },
  price: {
    label: fieldLabels.price,
    options: fieldOptions.price,
  },
  region: {
    label: fieldLabels.region,
    options: fieldOptions.region,
  },
};

export const conditionalFields: Record<
  string,
  { dependsOn: string; showIf: string[] }
> = {
  childrenBirthYear: { dependsOn: "children", showIf: ["있음"] },
  moveIn: { dependsOn: "purpose", showIf: ["실거주"] },
};

export const shouldShowField = (
  field: string,
  formData: Record<string, any>
) => {
  const condition = conditionalFields[field];
  if (!condition) return true;
  return condition.showIf.includes(formData[condition.dependsOn]);
};

export const validateFormData = (formData: Record<string, any>): string[] => {
  return Object.keys(formData).filter((key) => {
    const value = formData[key];

    if (conditionalFields[key]) {
      const { dependsOn, showIf } = conditionalFields[key];
      const controllingValue = formData[dependsOn];
      const shouldShow = showIf.includes(controllingValue);
      if (!shouldShow) return false;
    }
    return value === "" || (Array.isArray(value) && value.length === 0);
  });
};
