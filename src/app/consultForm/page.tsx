// app/consultForm/page.tsx

import { Suspense } from "react";
import ConsultFormClient from "./ConsultFormClient";

export default function ConsultFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsultFormClient />
    </Suspense>
  );
}
