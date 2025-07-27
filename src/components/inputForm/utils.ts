export const fieldLabels: Record<string, string> = {
  birthYear: "출생연도",
  childrenBirthYear: "자녀 출생년도",
  houseCount: "주택 수",
  married: "결혼 여부",
  children: "자녀 유무",
  income: "연소득",
  price: "희망 매매가",
  loan: "대출 계획 여부",
  liveIn: "실거주 여부",
  moveIn: "전입 예정 시기",
  region: "희망 지역",
  day: "상담 가능 요일",
  time: "상담 가능 시간",
  method: "상담 방법",
  contact: "연락처",
  extraMessage: "추가 문의 내용",
};

export const conditionalFields: Record<
  string,
  { dependsOn: string; showIf: string[] }
> = {
  childrenBirthYear: { dependsOn: "children", showIf: ["있음"] },
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
      if (!shouldShow) return false; // 조건 미충족 → 검사 제외
    }
    return value === "" || (Array.isArray(value) && value.length === 0);
  });
};

export const selectFields = {
  birthYear: {
    label: "출생연도",
    options: ["1990년 이전", "1991~1995년", "1996~2000년", "2001년 이후"],
  },
  childrenBirthYear: {
    label: "자녀 출생년도",
    options: ["없음", "2024년 이후", "2023년", "2022년 이전"],
  },
  income: {
    label: "연소득",
    options: [
      "4천만 원 이하",
      "4천 ~ 6천만 원",
      "6천 ~ 9천만 원",
      "9천 ~ 1.3억 원",
      "1.3억 원 이상",
    ],
  },
  price: {
    label: "희망 매매가",
    options: [
      "6억 이하",
      "6억 ~ 9억",
      "9억 ~ 12억",
      "12억 ~ 18억",
      "18억 이상",
    ],
  },
  region: {
    label: "희망 지역",
    options: ["서울", "경기 북부", "경기 남부", "인천", "지방 광역시"],
  },
};
