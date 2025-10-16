import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyPProps = ComponentPropsWithoutRef<'p'>;

export const TypographyP = forwardRef<HTMLParagraphElement, TypographyPProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-xl leading-7 [&:not(:first-child)]:mt-5 ${className || ''}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

TypographyP.displayName = 'TypographyP';
