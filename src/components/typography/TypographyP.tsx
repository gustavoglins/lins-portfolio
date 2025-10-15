interface TypographyPProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyP({ children, className }: TypographyPProps) {
  return (
    <p
      className={`text-xl leading-7 [&:not(:first-child)]:mt-5 ${
        className || ''
      }`}
    >
      {children}
    </p>
  );
}
