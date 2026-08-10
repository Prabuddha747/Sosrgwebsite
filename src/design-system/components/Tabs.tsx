import React, { useRef } from 'react';
import { cn } from '../../lib/utils';

export type TabsVariant = 'underline' | 'pill';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;
  label: string;
  className?: string;
}

// Follows the WAI-ARIA tabs pattern: roving tabindex, arrow keys move both
// focus and selection, Home/End jump to the first/last tab.
export const Tabs = ({ items, value, onChange, variant = 'underline', label, className }: TabsProps) => {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const focusAndSelect = (id: string) => {
    onChange(id);
    tabRefs.current[id]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    if (e.key === 'Home') return focusAndSelect(items[0].id);
    if (e.key === 'End') return focusAndSelect(items[items.length - 1].id);
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const next = (index + delta + items.length) % items.length;
    focusAndSelect(items[next].id);
  };

  return (
    <div role="tablist" aria-label={label} className={cn('flex gap-1', variant === 'underline' && 'border-b border-cream-200', className)}>
      {items.map((item, index) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => { tabRefs.current[item.id] = el; }}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className={cn(
              'sosrg-focus-ring min-h-12 px-4 font-body text-sosrg-sm font-medium whitespace-nowrap transition-colors',
              variant === 'underline' && [
                'border-b-2 -mb-px',
                selected ? 'border-gold-500 text-text-primary' : 'border-transparent text-text-muted hover:text-text-primary',
              ],
              variant === 'pill' && [
                'rounded-full',
                selected ? 'bg-gold-500 text-text-primary' : 'text-text-muted hover:bg-cream-200',
              ],
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
