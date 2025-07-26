// lib/userStorage.ts
export const getOrCreateUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

export const saveFormData = (data: Record<string, any>) => {
  localStorage.setItem("formData", JSON.stringify(data));
};

export const loadFormData = (): Record<string, any> | null => {
  const raw = localStorage.getItem("formData");
  return raw ? JSON.parse(raw) : null;
};

export const clearUserStorage = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("formData");
  localStorage.removeItem("lastReportKey"); // 추가로 사용하는 키 있다면 포함
};
