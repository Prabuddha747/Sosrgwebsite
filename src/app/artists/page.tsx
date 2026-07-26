import { redirect } from "next/navigation";

// Discover Artists is now a tab of /explore (docs/PLATFORM_EVOLUTION_PLAN.md
// §11 Phase 4) — redirected, not removed, so old links/bookmarks still resolve.
export default function ArtistsPage() {
  redirect("/explore?tab=artists");
}
