import { Suspense } from "react";
import ResultClient from "./ResultClient";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <ResultClient />
    </Suspense>
  );
}
