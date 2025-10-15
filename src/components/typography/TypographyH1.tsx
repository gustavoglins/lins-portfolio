interface TypographyH1Props {
  children: React.ReactNode;
  className?: string;
}

export default function TypographyH1({
  children,
  className,
}: TypographyH1Props) {
  return (
    <h1
      // className={`scroll-m-20 text-4xl font-semibold tracking-tight text-balance ${
      className={`scroll-m-20 text-4xl ${className || ''}`}
    >
      {children}
    </h1>
  );
}
