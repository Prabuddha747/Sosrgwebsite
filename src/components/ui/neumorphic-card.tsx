import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// The one dark-neumorphism card language for this homepage (docs3/design3.md
// §4) — reused across every section's cards rather than re-implemented per
// section. Distinct from `@/components/ui/card` (shadcn, used by the
// app's dashboards/forms) which stays untouched.
// box-shadow lives in the className (not inline style) on purpose: inline
// styles beat every class regardless of :hover, so a consumer's
// `hover:shadow-[...]` override would never win against an inline shadow.
export const NeumorphicCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-card-black shadow-[8px_8px_20px_rgba(0,0,0,0.6),-6px_-6px_16px_rgba(201,162,39,0.05)]",
        className
      )}
      {...props}
    />
  )
);
NeumorphicCard.displayName = "NeumorphicCard";
