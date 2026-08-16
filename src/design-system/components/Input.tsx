import React, { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

// Shared field chrome (label, error message, focus ring, 48px min height)
// across Input/Select/Textarea so the three stay visually and behaviorally
// identical apart from their native element.
const fieldClasses = (hasError: boolean, className?: string) =>
  cn(
    'sosrg-focus-ring w-full min-h-12 rounded-xl px-[1em] py-[0.5em] bg-cream-50',
    'font-body text-sosrg-base text-text-primary placeholder:text-text-muted',
    'border transition-colors',
    hasError ? 'border-danger' : 'border-cream-200 focus:border-gold-500',
    'disabled:opacity-45 disabled:cursor-not-allowed',
    className,
  );

interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  children: (describedBy: string | undefined) => React.ReactNode;
}

const FieldWrapper = ({ id, label, error, children }: FieldWrapperProps) => {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-body text-sosrg-sm text-text-muted">
        {label}
      </label>
      {children(errorId)}
      {error && (
        <p id={errorId} role="alert" className="font-body text-sosrg-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'prefix'> {
  id?: string;
  label: string;
  error?: string;
  /** Fixed text/icon rendered inside the field's left edge, e.g. "@" on a username input. */
  prefix?: React.ReactNode;
  /** Rendered inside the field's right edge, e.g. an inline availability-check status. */
  suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, type, prefix, suffix, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const isPassword = type === 'password';
    const [visible, setVisible] = useState(false);
    return (
      <FieldWrapper id={fieldId} label={label} error={error}>
        {(describedBy) => (
          <div className="relative">
            {prefix && (
              <span className="absolute left-[1em] top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                {prefix}
              </span>
            )}
            <input
              ref={ref}
              id={fieldId}
              type={isPassword ? (visible ? 'text' : 'password') : type}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              className={fieldClasses(!!error, cn(prefix && 'pl-6', (isPassword || suffix) && 'pr-11', className))}
              {...props}
            />
            {suffix && !isPassword && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</span>
            )}
            {isPassword && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        )}
      </FieldWrapper>
    );
  },
);
Input.displayName = 'Input';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id?: string;
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <FieldWrapper id={fieldId} label={label} error={error}>
        {(describedBy) => (
          <textarea
            ref={ref}
            id={fieldId}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={fieldClasses(!!error, className)}
            {...props}
          />
        )}
      </FieldWrapper>
    );
  },
);
Textarea.displayName = 'Textarea';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id?: string;
  label: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <FieldWrapper id={fieldId} label={label} error={error}>
        {(describedBy) => (
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={fieldClasses(!!error, className)}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </FieldWrapper>
    );
  },
);
Select.displayName = 'Select';
