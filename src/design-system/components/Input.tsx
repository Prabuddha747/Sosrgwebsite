import React, { useId } from 'react';
import { cn } from '../../lib/utils';

// Shared field chrome (label, error message, focus ring, 48px min height)
// across Input/Select/Textarea so the three stay visually and behaviorally
// identical apart from their native element.
const fieldClasses = (hasError: boolean, className?: string) =>
  cn(
    'sosrg-focus-ring w-full min-h-12 rounded-xl px-4 py-2 bg-cream-50',
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

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id?: string;
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <FieldWrapper id={fieldId} label={label} error={error}>
        {(describedBy) => (
          <input
            ref={ref}
            id={fieldId}
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
