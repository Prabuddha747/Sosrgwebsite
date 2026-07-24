"use client";
import Signup from "@/views/Signup";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent flex items-center justify-center text-white/50">Loading...</div>}>
      <Signup />
    </Suspense>
  );
}
