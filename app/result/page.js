"use client";

import { Suspense } from "react";
import ResultContent from "./ResultContent"; // Move your content logic to a separate component

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
