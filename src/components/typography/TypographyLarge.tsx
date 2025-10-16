import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyLargeProps = ComponentPropsWithoutRef<'div'>;

export const TypographyLarge = forwardRef<HTMLDivElement, TypographyLargeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`text-2xl my-5 ${className || ''}`} {...props}>
        {children}
      </div>
    );
  }
);

TypographyLarge.displayName = 'TypographyLarge';
