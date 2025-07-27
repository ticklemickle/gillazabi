"use client";

import { useRef } from "react";

export function usePdfAndShare() {
  const printRef = useRef<HTMLDivElement>(null);

  const handleSavePdf = async () => {
    if (printRef.current) {
      const html2pdf = (await import("html2pdf.js")).default;

      html2pdf()
        .set({
          margin: 0.5,
          filename: "report_gillazabi.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(printRef.current)
        .save();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      alert("클립보드 복사 실패");
    }
  };

  return {
    printRef,
    handleSavePdf,
    handleCopyLink,
  };
}
