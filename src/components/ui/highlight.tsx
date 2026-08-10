import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

// Minimal stand-in for the "@/components/unlumen-ui/primitives/highlight"
// dependency the motion nav menu was built against (not available to copy
// faithfully) — tracks whichever descendant HighlightItem is hovered/focused
// and animates a single shared glow box to that item's position within the
// nearest Highlight container. Simpler than the original: one mode (a
// shared box that slides between items), no imperative registration API
// beyond what the nav menu actually calls.
interface HighlightContextValue {
  registerItem: (id: string, el: HTMLElement | null) => void;
  setActive: (id: string | null) => void;
  hover: boolean;
}

const HighlightContext = React.createContext<HighlightContextValue | null>(null);

interface HighlightRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface HighlightProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  /** Accepted for API compatibility with the source component; this stand-in only implements the "parent" (single shared, sliding) behavior. */
  mode?: 'parent' | 'children';
  /** Accepted for API compatibility; items always self-register here. */
  controlledItems?: boolean;
}

export function Highlight({ children, className, containerClassName, style, hover = false }: HighlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef(new Map<string, HTMLElement>());
  const [rect, setRect] = React.useState<HighlightRect | null>(null);
  const [visible, setVisible] = React.useState(false);

  const registerItem = React.useCallback((id: string, el: HTMLElement | null) => {
    if (el) itemsRef.current.set(id, el);
    else itemsRef.current.delete(id);
  }, []);

  const setActive = React.useCallback((id: string | null) => {
    const container = containerRef.current;
    const el = id ? itemsRef.current.get(id) : undefined;

    if (!container || !el) {
      setVisible(false);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setRect({
      x: elRect.left - containerRect.left,
      y: elRect.top - containerRect.top,
      width: elRect.width,
      height: elRect.height,
    });
    setVisible(true);
  }, []);

  const contextValue = React.useMemo(() => ({ registerItem, setActive, hover }), [registerItem, setActive, hover]);

  return (
    <HighlightContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn('relative', containerClassName)} onMouseLeave={() => hover && setActive(null)}>
        <motion.div
          aria-hidden="true"
          className={cn('absolute rounded-md', className)}
          style={style}
          initial={false}
          animate={{
            x: rect?.x ?? 0,
            y: rect?.y ?? 0,
            width: rect?.width ?? 0,
            height: rect?.height ?? 0,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 32, bounce: 0 }}
        />
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

export interface HighlightItemProps {
  children: React.ReactElement<any>;
  id?: string;
  /** Accepted for API compatibility with the source component; this stand-in always clones its single child, i.e. always behaves as asChild. */
  asChild?: boolean;
}

export function HighlightItem({ children, id }: HighlightItemProps) {
  const context = React.useContext(HighlightContext);
  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;

  if (!context) return children;

  const childProps = children.props as Record<string, unknown>;

  return React.cloneElement(children, {
    ref: (node: HTMLElement | null) => context.registerItem(resolvedId, node),
    onMouseEnter: (e: React.MouseEvent) => {
      (childProps.onMouseEnter as ((e: React.MouseEvent) => void) | undefined)?.(e);
      if (context.hover) context.setActive(resolvedId);
    },
    onFocus: (e: React.FocusEvent) => {
      (childProps.onFocus as ((e: React.FocusEvent) => void) | undefined)?.(e);
      context.setActive(resolvedId);
    },
  } as Partial<unknown>);
}
