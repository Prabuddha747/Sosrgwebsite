"use client";

/**
 * Compatibility layer: re-exports Next.js navigation primitives
 * under the same names that react-router-dom used.
 * This lets existing page components work with minimal changes.
 */

import NextLink from "next/link";
import { useRouter, useParams as useNextParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";

// Re-export Link with `href` mapped from `to`
export const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentProps<typeof NextLink>, "href"> & { to: string; className?: string; children?: React.ReactNode }
>(({ to, children, ...props }, ref) => {
  return (
    <NextLink ref={ref} href={to} {...props}>
      {children}
    </NextLink>
  );
});
Link.displayName = "Link";

// Re-export useNavigate as a wrapper around useRouter
export function useNavigate() {
  const router = useRouter();
  return (to: string | number) => {
    if (typeof to === "number") {
      if (to === -1) router.back();
      else router.forward();
    } else {
      router.push(to);
    }
  };
}

// Re-export useParams
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useNextParams() as T;
}

// Re-export useLocation
export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

// Re-export useSearchParams  
export { useSearchParams };
