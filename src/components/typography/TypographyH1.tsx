import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type TypographyH1Props = ComponentPropsWithoutRef<'h1'>;

const TypographyH1 = forwardRef<HTMLHeadingElement, TypographyH1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={`scroll-m-20 text-4xl text-[110px] ${className || ''}`}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

TypographyH1.displayName = 'TypographyH1';

export default TypographyH1;
