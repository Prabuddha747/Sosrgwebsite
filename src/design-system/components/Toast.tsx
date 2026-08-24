import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastVariant = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DURATION_MS = 4000;

const variantIcon: Record<ToastVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

// danger/success/tier-blue as icon color on the cream-50 toast surface:
// 5.75:1 / 5.02:1 / 5.47:1 — all pass AA (redesign.md §1 methodology).
const variantColorVar: Record<ToastVariant, string> = {
  success: 'var(--color-success)',
  error: 'var(--color-danger)',
  info: 'var(--color-tier-blue)',
};

// One shared instance manager, not a per-screen component — this is the
// specific, named fix for the old build's duplicated toast timing/position
// logic (redesign.md §5, design.md A4).
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = nextId.current++;
      setToasts((current) => [...current, { id, message, variant }]);
      setTimeout(() => dismiss(id), DURATION_MS);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-3 items-center"
          role="region"
          aria-live="polite"
        >
          <AnimatePresence>
            {toasts.map((toast) => {
              const Icon = variantIcon[toast.variant];
              const color = variantColorVar[toast.variant];
              return (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="SosrG-focus-ring flex items-center gap-3 bg-cream-50 shadow-elevation-2 rounded-xl px-4 py-3 min-w-[280px] max-w-sm"
                  role="status"
                >
                  <Icon className="shrink-0 w-5 h-5" style={{ color }} />
                  <p className="text-text-primary text-SosrG-sm flex-1">{toast.message}</p>
                  <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={() => dismiss(toast.id)}
                    className={cn('SosrG-focus-ring shrink-0 min-h-8 min-w-8 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};
