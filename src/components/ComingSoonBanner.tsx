// Sits at the top of any page/section not yet backed by a live API — the
// content below it stays fully visible (so the feature set is still
// demoable) rather than being replaced by an empty state.
export const ComingSoonBanner = ({
  label = 'Coming soon',
  message = "This section previews what we're building — nothing on it is live yet.",
}: {
  label?: string;
  message?: string;
}) => (
  // pt-32 matches the old pages' own fixed-navbar clearance (e.g.
  // CastingEcosystem's wrapper) — this banner renders as a sibling before
  // those pages, so it doesn't inherit their internal top padding and needs
  // its own to clear the fixed Navbar.
  <div className="sosrg-container pt-32">
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-cream-50 shadow-elevation-1 px-4 py-3">
      {/* Gold, not the design-system Badge's neutral "pending" color — this
          label is specifically the platform's "coming soon" signal, styled
          to match the brand gold rather than a generic status pill. */}
      <span className="inline-flex items-center rounded-full px-3 py-1 font-body text-sosrg-xs font-medium bg-gold-500 text-text-primary">
        {label}
      </span>
      <p className="text-sosrg-sm text-text-muted">{message}</p>
    </div>
  </div>
);
