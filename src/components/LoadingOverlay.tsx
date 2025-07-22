"use client";

import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* 원형 스피너 */}
      <div className="w-10 h-10 border-4 border-main-dark border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
