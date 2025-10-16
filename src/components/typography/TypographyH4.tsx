import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyH4Props = ComponentPropsWithoutRef<'h4'>;

export const TypographyH4 = forwardRef<HTMLHeadingElement, TypographyH4Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={`scroll-m-20 text-xl font-semibold tracking-tight ${className || ''}`}
        {...props}
      >
        {children}
      </h4>
    );
  }
);

TypographyH4.displayName = 'TypographyH4';
