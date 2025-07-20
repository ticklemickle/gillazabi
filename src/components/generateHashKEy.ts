import { v4 as uuidv4 } from "uuid";
import { createHash } from "crypto";

/**
 * yyyymmddHHMMSS 형식의 타임스탬프 생성
 */
function getTimestamp(): string {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, "0");

  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const HH = pad(now.getHours());
  const MM = pad(now.getMinutes());
  const SS = pad(now.getSeconds());

  return `${yyyy}${mm}${dd}${HH}${MM}${SS}`;
}

/**
 * UUID를 해싱하여 고정된 16자리 해시값과 시간 정보를 결합한 키 생성
 */
export function generateHashedKey(): string {
  const uuid = uuidv4(); // ex) a3f9b9ce-234f-4560-b2d0-4ab76a09e1a2

  const hash = createHash("sha256").update(uuid).digest("hex").slice(0, 16);
  const timestamp = getTimestamp();

  return `${hash}${timestamp}`; // 예: 9c4f93e8ab27a1dc20250721110539
}
