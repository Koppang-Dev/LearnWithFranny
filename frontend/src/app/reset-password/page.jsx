import React, { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
