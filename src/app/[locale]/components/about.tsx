import SectionTitle from '@/components/section-title';
import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyP } from '@/components/typography/TypographyP';

export default function About() {
  return (
    <section className="h-screen w-full bg-foreground">
      <SectionTitle>About</SectionTitle>
      <TypographyH1 className="text-8xl font-semibold text-background">
        More about me
      </TypographyH1>
      <TypographyP className="text-background">
        Software Engineering student with experience in Full Stack development.
        I&apos;m interested in opportunities where I can apply my knowledge,
        learn continuously, and contribute solutions that add value to the
        company.
      </TypographyP>
    </section>
  );
}
