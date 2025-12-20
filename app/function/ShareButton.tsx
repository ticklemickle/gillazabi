"use client";

import { useState } from "react";
import ToastMessage from "./ToastMessage";

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}

export default function ShareButton() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToastMessage("링크가 복사되었습니다");
    } catch (error) {
      console.error("URL 복사 실패:", error);
      setToastMessage("링크 복사에 실패했습니다");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="
          mt-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm
          text-neutral-500 hover:bg-neutral-50
          cursor-pointer select-none
          transition active:scale-[0.98] active:bg-neutral-100
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2
        "
        aria-label="공유"
      >
        <ShareIcon />
        <span className="hidden sm:inline">공유</span>
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
