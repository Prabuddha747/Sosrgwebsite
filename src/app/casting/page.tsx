import { redirect } from "next/navigation";

// Casting Calls is now a tab of /explore (docs/PLATFORM_EVOLUTION_PLAN.md §11
// Phase 4) — redirected, not removed, so old links/bookmarks still resolve.
export default function CastingPage() {
  redirect("/explore?tab=casting");
}
