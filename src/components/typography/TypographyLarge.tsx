interface TypographyLargeProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyLarge({ children, className }: TypographyLargeProps) {
  return <div className={`text-2xl my-5 ${className || ''}`}>{children}</div>;
}
