import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface NavChildItem {
  label: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  id: string;
  label: string;
  children: NavChildItem[];
}

export interface BottomTabItem {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface NavbarProps {
  logo: React.ReactNode;
  groups: NavGroup[];
  /** Only rendered when provided — real role-gating is wired in Phase 2, this is a visual/structural placeholder. */
  adminHref?: string;
  activeHref?: string;
  /** 4 highest-frequency destinations shown in the mobile bottom tab bar (redesign.md §7). */
  bottomTabItems: BottomTabItem[];
}

/*
 * Desktop (1025px+): persistent mega-menu triggers.
 * Tablet (481-1024px): collapses to a single hamburger drawer with
 * expandable grouped sections.
 * Mobile (320-480px): hamburger drawer + a persistent bottom tab bar.
 *
 * Built in Phase 1 as an isolated, showcase-only component with plain <a>
 * tags; wired into the real app with actual React Router <Link>s in Phase 2
 * (redesign.md §7, implementation.md Phase 2). Requires a Router ancestor —
 * the dev showcase wraps it in a MemoryRouter for that reason.
 */
export const Navbar = ({ logo, groups, adminHref, activeHref, bottomTabItems }: NavbarProps) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedDrawerGroup, setExpandedDrawerGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenGroup(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-40 bg-cream-50 shadow-elevation-1">
        <div className="sosrg-container flex items-center justify-between h-20">
          <div className="shrink-0">{logo}</div>

          {/* Desktop mega-menu (1025px+) */}
          <ul className="hidden desktop:flex items-center gap-1">
            {groups.map((group) => (
              <li key={group.id} className="relative">
                <button
                  type="button"
                  className={cn(
                    'sosrg-focus-ring min-h-12 px-4 rounded-lg inline-flex items-center gap-1',
                    'font-body text-sosrg-sm font-medium text-text-primary hover:bg-cream-200',
                  )}
                  aria-haspopup="true"
                  aria-expanded={openGroup === group.id}
                  onClick={() => setOpenGroup((current) => (current === group.id ? null : group.id))}
                >
                  {group.label}
                  <ChevronDown className={cn('w-4 h-4 transition-transform', openGroup === group.id && 'rotate-180')} />
                </button>
                {openGroup === group.id && (
                  <ul
                    role="menu"
                    aria-label={group.label}
                    className="absolute left-0 top-full mt-2 min-w-56 bg-cream-50 shadow-elevation-3 rounded-xl p-2"
                  >
                    {group.children.map((child) => (
                      <li key={child.href} role="none">
                        <Link
                          role="menuitem"
                          to={child.href}
                          className={cn(
                            'sosrg-focus-ring flex items-center gap-2 min-h-12 px-3 rounded-lg',
                            'font-body text-sosrg-sm text-text-primary hover:bg-cream-200',
                            activeHref === child.href && 'text-gold-500',
                          )}
                          onClick={() => setOpenGroup(null)}
                        >
                          {child.icon && <child.icon className="w-4 h-4 shrink-0" />}
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden desktop:flex items-center gap-3">
            {adminHref && (
              <Link
                to={adminHref}
                className="sosrg-focus-ring min-h-12 px-4 rounded-lg inline-flex items-center gap-2 font-body text-sosrg-sm text-text-muted hover:text-text-primary"
              >
                <Lock className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Tablet + mobile hamburger trigger */}
          <button
            type="button"
            className="sosrg-focus-ring desktop:hidden min-h-12 min-w-12 flex items-center justify-center rounded-lg text-text-primary"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Tablet/mobile drawer */}
      {drawerOpen && (
        <div className="desktop:hidden fixed inset-0 z-30 bg-scrim" onClick={() => setDrawerOpen(false)}>
          <div
            className="absolute top-20 right-0 bottom-0 w-full max-w-sm bg-cream-50 shadow-elevation-3 overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {groups.map((group) => (
              <div key={group.id} className="border-b border-cream-200 last:border-0">
                <button
                  type="button"
                  className="sosrg-focus-ring w-full min-h-12 flex items-center justify-between px-2 font-body text-sosrg-base text-text-primary"
                  aria-expanded={expandedDrawerGroup === group.id}
                  onClick={() => setExpandedDrawerGroup((current) => (current === group.id ? null : group.id))}
                >
                  {group.label}
                  <ChevronDown className={cn('w-4 h-4 transition-transform', expandedDrawerGroup === group.id && 'rotate-180')} />
                </button>
                {expandedDrawerGroup === group.id && (
                  <ul className="pb-2">
                    {group.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          className="sosrg-focus-ring flex items-center gap-2 min-h-12 px-4 rounded-lg font-body text-sosrg-sm text-text-muted hover:text-text-primary"
                          onClick={() => setDrawerOpen(false)}
                        >
                          {child.icon && <child.icon className="w-4 h-4 shrink-0" />}
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {adminHref && (
              <Link
                to={adminHref}
                className="sosrg-focus-ring flex items-center gap-2 min-h-12 px-2 font-body text-sosrg-base text-text-muted"
                onClick={() => setDrawerOpen(false)}
              >
                <Lock className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Mobile-only persistent bottom tab bar — thumb-zone-safe per redesign.md §7 */}
      <nav
        aria-label="Primary"
        className="tablet:hidden fixed bottom-0 inset-x-0 z-40 bg-cream-50 shadow-elevation-2 flex"
      >
        {bottomTabItems.map((item) => {
          const active = activeHref === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'sosrg-focus-ring flex-1 min-h-12 py-2 flex flex-col items-center justify-center gap-1',
                'font-body text-sosrg-xs',
                active ? 'text-gold-500' : 'text-text-muted',
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
};
