"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function ToastMessage({
  message,
  onClose,
  duration = 2000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
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
        z-50
      "
    >
      {message}
    </div>
  );
}
