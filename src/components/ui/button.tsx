import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Styled against this codebase's existing dark gold/cinematic-black idiom
// (see src/index.css), not shadcn's default bg-primary/bg-muted tokens —
// those utility classes aren't defined here and would render invisibly,
// and the .light-mode overrides in index.css only know about white/*,
// black, and gold, not shadcn's token names.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gold text-black hover:scale-105',
        outline: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
        ghost: 'text-white/70 hover:bg-white/10 hover:text-white',
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-8 px-3 text-xs',
        icon: 'h-9 w-9 shrink-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
