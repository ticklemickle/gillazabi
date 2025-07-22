// lib/time.ts

/**
 * 현재 시간을 KST(Asia/Seoul) 기준으로 yyyymmddHHMMSS 문자열로 반환합니다.
 * 예: 20250722153045
 */
export function getKSTTimestamp(): string {
  const now = new Date();

  // 한국 시간 (KST)으로 변환된 Date 객체 생성
  const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));

  const y = kst.getFullYear();
  const m = String(kst.getMonth() + 1).padStart(2, "0");
  const d = String(kst.getDate()).padStart(2, "0");
  const hh = String(kst.getHours()).padStart(2, "0");
  const mm = String(kst.getMinutes()).padStart(2, "0");
  const ss = String(kst.getSeconds()).padStart(2, "0");

  return `${y}${m}${d}${hh}${mm}${ss}`;
}
