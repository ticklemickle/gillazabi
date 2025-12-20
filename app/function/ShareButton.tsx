"use client";

import { useState } from "react";

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
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error("URL 복사 실패:", error);
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

      {/* Toast */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="
            fixed
            bottom-6
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-toast-shadow
            px-4
            py-2
            text-sm
            text-white
            shadow-toast
            animate-fade-in
          "
        >
          링크가 복사되었습니다
        </div>
      )}
    </>
  );
}
