import { CodeXml, Globe } from 'lucide-react';
import { reelItemsFromProjects } from '../../lib/reel';
import type { Project, ProjectStatus } from '../../types/content';
import { ScreenReel } from '../phone/ScreenReel';
import { Tag } from '../ui/Tag';

const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  completed: 'Completed',
  'in-progress': 'In progress',
  planned: 'Planned',
};

interface ProjectBlockProps {
  project: Project;
  /** Off when the shared pinned phone shows this project instead (desktop). */
  showPhone?: boolean;
  className?: string;
}

// One case study. Below 1024px each project carries its own small phone.
export function ProjectBlock({ project, showPhone = true, className = '' }: ProjectBlockProps) {
  const headingId = `project-${project.slug}`;
  const details = [
    { term: 'Problem', value: project.problem },
    { term: 'What I built', value: project.built },
    { term: 'Role', value: project.role },
  ];
  const { github, demo } = project.links;

  return (
    <article
      aria-labelledby={headingId}
      className={`flex flex-col gap-10 md:flex-row md:items-start md:gap-12 ${className}`}
    >
      {showPhone && (
        <ScreenReel items={reelItemsFromProjects([project])} size="sm" className="shrink-0" />
      )}

      <div className="max-w-[68ch]">
        <p className="flex items-center gap-2 text-small text-slate">
          {project.status === 'live' && (
            <span aria-hidden="true" className="size-2 rounded-full bg-saffron" />
          )}
          {statusLabels[project.status]}
        </p>
        <h3 id={headingId} className="mt-2 font-display text-h3 font-extrabold text-graphite">
          {project.name}
        </h3>
        <p className="mt-3 text-lead text-slate">{project.summary}</p>

        <dl className="mt-8 flex flex-col gap-5">
          {details.map(({ term, value }) => (
            <div key={term}>
              <dt className="text-small font-semibold text-slate">{term}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>

        <ul aria-label="Tech stack" className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        {(github || demo) && (
          <ul className="mt-6 flex flex-wrap gap-x-6">
            {github && (
              <li>
                <a href={github} className={linkClass}>
                  <CodeXml size={20} strokeWidth={1.75} aria-hidden="true" />
                  GitHub
                </a>
              </li>
            )}
            {demo && (
              <li>
                <a href={demo} className={linkClass}>
                  <Globe size={20} strokeWidth={1.75} aria-hidden="true" />
                  Live demo
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  );
}

const linkClass =
  'inline-flex min-h-11 items-center gap-2 font-semibold text-signal underline-offset-4 hover:underline';
