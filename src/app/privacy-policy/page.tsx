import type { Metadata } from "next";
import PrivacyPolicy from "@/views/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy — SosrG Talent Platform",
  description: "How SosrG Talent Platform collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
