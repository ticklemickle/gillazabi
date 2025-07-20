import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<p>로딩 중입니다...</p>}>
      <ResultClient />
    </Suspense>
  );
}
