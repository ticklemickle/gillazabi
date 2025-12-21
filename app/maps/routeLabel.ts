// src/lib/naver/routeLabel.ts
export function routeLabelHTML(name: string, color = "#111") {
  return `
    <div style="
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:8px 12px;
      border-radius:10px;
      background:#fff;
      border:2px solid ${color};
      box-shadow:0 6px 18px rgba(0,0,0,0.15);
      font-weight:700;
      font-size:14px;
      white-space:nowrap;
    ">
      <span style="width:10px;height:10px;border-radius:999px;background:${color};display:inline-block;"></span>
      ${name}
    </div>
  `;
}
