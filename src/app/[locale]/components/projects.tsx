import SectionTitle from '@/components/section-title';
import TypographyH1 from '@/components/typography/TypographyH1';
import { TypographyP } from '@/components/typography/TypographyP';

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-foreground px-20 pt-32"
    >
      <SectionTitle>Projects</SectionTitle>
      <div className="flex items-baseline gap-5">
        <TypographyH1 className="text-8xl font-semibold text-background leading-none">
          Projects
        </TypographyH1>
        {/* <TypographyH1 className="font-serif font-semibold italic text-8xl text-[#ff1744] -translate-y-[-0.0em]">
          {'<me/>'}
        </TypographyH1> */}
      </div>
      <TypographyP className="text-background">
        Software Engineering student with experience in Full Stack development.
        I&apos;m interested in opportunities where I can apply my knowledge,
        learn continuously, and contribute solutions that add value to the
        company.
      </TypographyP>
    </section>
  );
}
