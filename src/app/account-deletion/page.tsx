import type { Metadata } from "next";
import AccountDeletion from "@/views/AccountDeletion";

export const metadata: Metadata = {
  title: "Delete Account — SosrG Talent Platform",
  description: "Request permanent deletion of your SosrG Talent Platform account and data.",
};

export default function AccountDeletionPage() {
  return <AccountDeletion />;
}
