import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectBlock } from './ProjectBlock';

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeading id="projects-heading">Things I've built</SectionHeading>
        <div className="flex flex-col gap-24 lg:gap-32">
          {content.projects.map((project) => (
            <ProjectBlock key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
