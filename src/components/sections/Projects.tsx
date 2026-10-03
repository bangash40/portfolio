import { useRef, useState } from 'react';
import { content } from '../../data/content';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { reelItemsFromProjects } from '../../lib/reel';
import { Container } from '../layout/Container';
import { ScreenReel } from '../phone/ScreenReel';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectBlock } from './ProjectBlock';

const { projects } = content;
const reelItems = reelItemsFromProjects(projects);
// Index of each project's first screen in the shared reel.
const firstScreenIndex = projects.map((project) =>
  reelItems.findIndex((item) => item.key.startsWith(`${project.slug}-`)),
);

const PIN_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

export function Projects() {
  const pinned = useMediaQuery(PIN_QUERY);
  const gridRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Desktop: the phone column pins while the case studies scroll; the project crossing the
  // middle of the viewport takes over the screen (DESIGN.md §7.2).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        if (!gridRef.current || !phoneRef.current) return;

        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top top+=60',
          end: 'bottom bottom',
          pin: phoneRef.current,
          pinSpacing: false,
        });

        gsap.utils.toArray<HTMLElement>('[data-project-block]').forEach((block, index) => {
          ScrollTrigger.create({
            trigger: block,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          });
        });

        // Web fonts change text heights after load; re-measure once they are in.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      });
      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [pinned], revertOnUpdate: true },
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeading id="projects-heading">Things I've built</SectionHeading>

        {pinned ? (
          <div ref={gridRef} className="grid grid-cols-12 gap-6">
            <div className="col-span-6 flex flex-col gap-32 py-[20vh]">
              {projects.map((project) => (
                <div key={project.slug} data-project-block>
                  <ProjectBlock project={project} showPhone={false} />
                </div>
              ))}
            </div>

            <div className="col-span-5 col-start-8">
              <div
                ref={phoneRef}
                className="flex h-[calc(100svh-60px)] items-center justify-center gap-6"
              >
                <ScreenReel items={reelItems} activeIndex={firstScreenIndex[active]} />
                <ol aria-hidden="true" className="flex flex-col gap-2">
                  {projects.map((project, index) => (
                    <li
                      key={project.slug}
                      className={`h-8 w-[3px] rounded-full transition-colors duration-300 ${
                        index === active ? 'bg-signal' : 'bg-line'
                      }`}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-24 lg:gap-32">
            {projects.map((project) => (
              <ProjectBlock key={project.slug} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
