import * as React from 'react';

import { cn } from '../lib/utils/cn';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
