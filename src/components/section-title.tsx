export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="text-lg font-semibold uppercase tracking-widest text-[#ff1744]">
      {children}
    </h2>
  );
}
