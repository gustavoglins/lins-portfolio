import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyH2Props = ComponentPropsWithoutRef<'h2'>;

export const TypographyH2 = forwardRef<HTMLHeadingElement, TypographyH2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className || ''}`}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

TypographyH2.displayName = 'TypographyH2';
