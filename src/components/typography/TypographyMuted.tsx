import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyMutedProps = ComponentPropsWithoutRef<'p'>;

export const TypographyMuted = forwardRef<HTMLParagraphElement, TypographyMutedProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-muted-foreground text-sm ${className || ''}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

TypographyMuted.displayName = 'TypographyMuted';
