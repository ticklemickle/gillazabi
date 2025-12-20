"use client";

import { useState } from "react";
import ToastMessage from "./ToastMessage";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

type PdfDownloadButtonProps = {
  /** public/pdf 폴더에 있는 파일명 (없을 수 있음) */
  filename?: string;
};

export default function PdfDownloadButton({
  filename,
}: PdfDownloadButtonProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownload = () => {
    // ✅ 방어 로직
    if (!filename) {
      setToastMessage("등록된 파일이 없습니다.");
      return;
    }

    const link = document.createElement("a");
    link.href = `/pdf/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        className="
          inline-flex items-center gap-1 rounded-lg
          px-2 py-1 text-sm text-neutral-600
          hover:bg-neutral-50
          cursor-pointer select-none
          transition active:scale-[0.97]
        "
        aria-label={filename ? `${filename} 다운로드` : "파일 없음"}
      >
        <DownloadIcon />
        <span>예비타당성조사보고서</span>
      </button>

      {toastMessage && (
        <ToastMessage
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
}
