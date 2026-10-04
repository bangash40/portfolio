import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { content } from '../../data/content';
import { isFilled } from '../../lib/placeholders';
import type { Project, ProjectStatus, Screen } from '../../types/content';
import { Container } from '../layout/Container';
import { PhoneFrame } from '../phone/PhoneFrame';
import { PlaceholderScreen } from '../phone/PlaceholderScreen';
import { Chip } from '../ui/Chip';
import { SectionHeader } from '../ui/SectionHeader';

const { projects, sections } = content;
const featured = projects.filter((project) => project.featured);
const supporting = projects.filter((project) => !project.featured);

const statuses: Record<ProjectStatus, { label: string; dot: string }> = {
  live: { label: 'Live', dot: 'bg-ok' },
  completed: { label: 'Completed', dot: 'bg-ok' },
  'in-progress': { label: 'In development', dot: 'bg-cyan' },
  planned: { label: 'Planned', dot: 'bg-border-2' },
};

// Cards lift their border on hover; phones tilt (≤ 8°) and screenshots scale (DESIGN.md §6.7).
const card =
  'group/card overflow-hidden rounded-card border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-border-2 hover:shadow-float';
const tilt =
  'transition-transform duration-600 ease-out-soft motion-safe:group-hover/card:-translate-y-2 motion-safe:group-hover/card:rotate-x-4';

function Status({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-[7px] font-mono text-xs text-muted">
      <span aria-hidden="true" className={`size-[7px] rounded-full ${statuses[status].dot}`} />
      {statuses[status].label}
    </span>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex min-h-11 items-center gap-1.5 text-[14.5px] font-semibold text-primary"
    >
      {children}
      <ArrowUpRight
        size={15}
        strokeWidth={2.2}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
      />
    </a>
  );
}

function ScreenContent({ screen, title }: { screen: Screen; title: string }) {
  return (
    <div className="absolute inset-0 transition-transform duration-600 ease-out-soft motion-safe:group-hover/card:scale-[1.03]">
      {screen.kind === 'image' ? (
        <img
          src={screen.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : screen.variant === 'miniplayer' || screen.variant === 'portfolio' ? null : (
        <PlaceholderScreen variant={screen.variant} title={title} />
      )}
    </div>
  );
}

// Interns and Admin for the IMS; the app's name for single-screen projects.
const screenTitle = (screen: Screen, project: Project) =>
  screen.kind === 'placeholder' && screen.variant === 'ims'
    ? 'Interns'
    : screen.kind === 'placeholder' && screen.variant === 'ims-admin'
      ? 'Admin'
      : project.name;

function FeaturedProject({ project, flip }: { project: Project; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const detailsId = `${project.slug}-details`;
  const screens = project.screens.slice(0, 2);

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={`${card} grid min-[980px]:min-h-[520px] min-[980px]:grid-cols-2`}
    >
      <div
        className={`relative flex items-center justify-center gap-[22px] overflow-hidden border-border bg-bg-2 px-6 py-11 perspective-[1200px] max-[979px]:border-b ${
          flip ? 'min-[980px]:order-2 min-[980px]:border-l' : 'min-[980px]:border-r'
        }`}
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        {screens.map((screen, index) => (
          <div
            key={index}
            className={`relative ${tilt} ${
              index === 1
                ? 'mt-12 max-sm:hidden motion-safe:group-hover/card:-translate-y-3 motion-safe:group-hover/card:rotate-y-8'
                : 'motion-safe:group-hover/card:-rotate-y-8'
            }`}
          >
            <PhoneFrame size="sm" label={screen.alt}>
              <ScreenContent screen={screen} title={screenTitle(screen, project)} />
            </PhoneFrame>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[18px] p-6 sm:p-9 min-[980px]:p-11 min-[980px]:pb-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <Chip hot>
            {project.stack[0]} · {project.kind}
          </Chip>
          <Status status={project.status} />
        </div>
        <h3 id={`${project.slug}-title`} className="text-h3 font-semibold">
          {project.name}
        </h3>
        <p className="text-[17px] text-muted">{project.summary}</p>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-panel border border-border bg-surface-2 px-4 py-3.5">
            <dt className="font-mono text-[11px] text-faint">problem solved</dt>
            <dd className="mt-1.5 text-[14.5px]">{project.problem}</dd>
          </div>
          <div className="rounded-panel border border-border bg-surface-2 px-4 py-3.5">
            <dt className="font-mono text-[11px] text-faint">key feature</dt>
            <dd className="mt-1.5 text-[14.5px]">{project.keyFeature}</dd>
          </div>
        </dl>
        {project.architecture.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-muted">
            <span className="text-faint">architecture</span>
            <ol className="contents">
              {project.architecture.map((layer, index) => (
                <li key={layer} className="inline-flex items-center gap-2">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-faint">
                      →
                    </span>
                  )}
                  <Chip>{layer}</Chip>
                </li>
              ))}
            </ol>
          </div>
        )}
        <div
          id={detailsId}
          hidden={!open}
          className="rounded-panel border border-border bg-surface-2 px-[18px] py-4 text-[14.5px] text-muted"
        >
          <p className="mb-1.5">
            <span className="font-mono text-[11px] text-faint">role</span> — {project.role}
          </p>
          <p>
            <span className="font-mono text-[11px] text-faint">what I built</span> — {project.built}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-[18px] gap-y-2 border-t border-border pt-[18px]">
          {isFilled(project.links.github) && (
            <TextLink href={project.links.github}>GitHub repo</TextLink>
          )}
          {isFilled(project.links.demo) && <TextLink href={project.links.demo}>Live demo</TextLink>}
          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((value) => !value)}
            className="ml-auto inline-flex h-11 cursor-pointer items-center gap-2 rounded-[10px] border border-border bg-transparent px-3.5 text-sm font-medium text-text transition-colors duration-200 hover:border-border-2"
          >
            {open ? 'Hide details' : 'Details'}
            <ChevronDown
              size={15}
              strokeWidth={2.2}
              aria-hidden="true"
              className={`transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

// A small browser window; the mini player gets a floating player, the portfolio a hero block.
function BrowserThumb({ project, accent }: { project: Project; accent: string }) {
  const screen = project.screens[0];
  return (
    <div
      role="img"
      aria-label={screen?.alt ?? project.name}
      className={`h-[110px] w-[166px] overflow-hidden rounded-[9px] border border-border bg-surface shadow-float ${tilt} motion-safe:group-hover/card:-rotate-y-8`}
    >
      <div className="flex gap-1 border-b border-border bg-surface-2 px-2 py-1.5">
        <span className="size-[5px] rounded-full bg-border-2" />
        <span className="size-[5px] rounded-full bg-border-2" />
        <span className="size-[5px] rounded-full bg-border-2" />
      </div>
      {screen?.kind === 'image' ? (
        <img src={screen.src} alt="" loading="lazy" className="size-full object-cover" />
      ) : (
        <div className="relative flex flex-col gap-[5px] p-[9px]">
          <span className="h-1.5 w-[60%] rounded-[3px] bg-text opacity-70" />
          <span className="h-1 w-[85%] rounded-[3px] bg-border-2" />
          <span className="h-1 w-[70%] rounded-[3px] bg-border-2" />
          <span className={`absolute right-2 -bottom-10 h-10 w-16 rounded-md ${accent}`} />
        </div>
      )}
    </div>
  );
}

function SupportingProject({ project, accent }: { project: Project; accent: string }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={`${card} grid sm:grid-cols-[210px_minmax(0,1fr)]`}
    >
      <div className="flex items-center justify-center border-border bg-bg-2 p-[22px] perspective-[1000px] max-sm:border-b sm:border-r">
        <BrowserThumb project={project} accent={accent} />
      </div>
      <div className="flex flex-col gap-2.5 px-[26px] py-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <Chip>{project.kind}</Chip>
          <Status status={project.status} />
        </div>
        <h3 id={`${project.slug}-title`} className="text-xl font-semibold tracking-[-0.02em]">
          {project.name}
        </h3>
        <p className="text-[14.5px] text-muted">{project.summary}</p>
        <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-x-[18px]">
          {isFilled(project.links.github) && (
            <TextLink href={project.links.github}>GitHub repo</TextLink>
          )}
          {isFilled(project.links.demo) && <TextLink href={project.links.demo}>Live site</TextLink>}
        </div>
      </div>
    </article>
  );
}

const accents = ['bg-cyan', 'bg-primary'];

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeader file="projects" id="projects-heading" copy={sections.projects} />

        <div className="mt-12 flex flex-col gap-7">
          {featured.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} flip={index % 2 === 1} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 min-[980px]:grid-cols-2">
          {supporting.map((project, index) => (
            <SupportingProject
              key={project.slug}
              project={project}
              accent={accents[index % accents.length]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
