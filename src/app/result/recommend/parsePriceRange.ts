export function parseMaxPrice(priceStr?: string): number {
  if (!priceStr) return Infinity;

  const rangeMatch = priceStr.match(/~\s*([\d.]+)/); // "3억 ~ 5억"
  if (rangeMatch) {
    return parseFloat(rangeMatch[1]); // 5억 → 5
  }

  const belowMatch = priceStr.match(/([\d.]+)\s*억\s*이하/); // "6억 이하"
  if (belowMatch) {
    return parseFloat(belowMatch[1]);
  }

  const onlyNum = priceStr.match(/([\d.]+)/); // "4억" 같은 경우
  if (onlyNum) {
    return parseFloat(onlyNum[1]);
  }

  return Infinity;
}
