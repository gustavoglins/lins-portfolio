import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyH3Props = ComponentPropsWithoutRef<'h3'>;

export const TypographyH3 = forwardRef<HTMLHeadingElement, TypographyH3Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className || ''}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

TypographyH3.displayName = 'TypographyH3';
