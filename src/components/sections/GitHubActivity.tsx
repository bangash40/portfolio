import { useEffect, useRef, useState } from 'react';
import { content } from '../../data/content';
import {
  getGitHubSummary,
  timeAgo,
  type GitHubSummary,
  type LanguageShare,
} from '../../lib/github';
import { Container } from '../layout/Container';
import { GitHubIcon } from '../ui/icons';
import { SectionHeader } from '../ui/SectionHeader';
import { Skeleton } from '../ui/Skeleton';

type LoadState =
  { status: 'idle' | 'loading' | 'error' } | { status: 'ready'; data: GitHubSummary };

const { links, sections } = content;
const profileUrl = links.github;
const profileLabel = profileUrl.replace(/^https?:\/\//, '');

// Language bar colours, largest first (DESIGN.md §6.9).
const colors = ['bg-primary', 'bg-cyan', 'bg-faint', 'bg-border-2'];

// Up to three languages, then everything else as "Other", so there is a colour for each.
function barSegments(languages: LanguageShare[]): LanguageShare[] {
  if (languages.length <= colors.length) return languages;
  const top = languages.slice(0, colors.length - 1);
  const rest = languages.slice(colors.length - 1).reduce((sum, lang) => sum + lang.share, 0);
  return [...top, { name: 'Other', share: rest }];
}

const percent = (share: number) => `${Math.round(share * 100)}%`;

const cardClass =
  'flex flex-col gap-[22px] rounded-card border border-border bg-surface p-6 sm:p-7';
const gridClass = 'grid gap-6 min-[980px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]';

export function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<LoadState>({ status: 'idle' });

  // Fetch only when the section is within 400px of the viewport (TRD.md §7).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setState({ status: 'loading' });
        getGitHubSummary(content.githubUsername).then((data) => {
          if (cancelled) return;
          setState(data ? { status: 'ready', data } : { status: 'error' });
        });
      },
      { rootMargin: '400px' },
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="github"
      aria-labelledby="github-heading"
      aria-busy={state.status === 'loading'}
      className="py-20 lg:py-32"
    >
      <Container>
        <SectionHeader file="activity" id="github-heading" copy={sections.github} />
        <div className="scroll-rise mt-11">
          {state.status === 'ready' ? (
            <GitHubPanel data={state.data} />
          ) : state.status === 'error' ? (
            <p className="max-w-[60ch] text-lead text-muted">
              GitHub isn't responding right now. See all my work on{' '}
              <a href={profileUrl} className="text-primary underline underline-offset-4">
                {profileLabel}
              </a>
              .
            </p>
          ) : (
            <GitHubSkeleton />
          )}
        </div>
      </Container>
    </section>
  );
}

// Profile card (repos, followers, languages) and recent repositories (DESIGN.md §6.9).
function GitHubPanel({ data }: { data: GitHubSummary }) {
  const segments = barSegments(data.languages);
  const stats = [
    { value: data.publicRepos, label: 'public repos', accent: true },
    { value: data.followers, label: 'followers', accent: false },
  ];

  return (
    <div className={gridClass}>
      <div className={cardClass}>
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-panel border border-border bg-surface-2"
          >
            <GitHubIcon size={22} />
          </span>
          <div>
            <a href={profileUrl} className="font-semibold hover:text-primary">
              {profileLabel}
            </a>
            <p className="font-mono text-xs text-muted">live · cached for 30 min</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse rounded-panel border border-border bg-surface-2 p-4"
            >
              <dt className="font-mono text-[11.5px] text-muted">{stat.label}</dt>
              <dd
                className={`text-[34px] leading-tight font-semibold tracking-[-0.03em] tabular-nums ${
                  stat.accent ? 'text-primary' : ''
                }`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {segments.length > 0 && (
          <div>
            <div
              role="img"
              aria-label={`Languages: ${segments.map((s) => `${s.name} ${percent(s.share)}`).join(', ')}`}
              className="flex h-2.5 gap-[3px]"
            >
              {segments.map((segment, index) => (
                <span
                  key={segment.name}
                  className={`h-full rounded-full ${colors[index]}`}
                  style={{ width: `${segment.share * 100}%` }}
                />
              ))}
            </div>
            <ul
              aria-hidden="true"
              className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted"
            >
              {segments.map((segment, index) => (
                <li key={segment.name} className="flex items-center gap-1.5">
                  <span className={`size-[7px] rounded-full ${colors[index]}`} />
                  {segment.name} {percent(segment.share)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={cardClass}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">Recent repositories</h3>
          <a
            href={profileUrl}
            className="inline-flex min-h-11 items-center font-mono text-xs text-primary hover:underline"
          >
            See all on GitHub
          </a>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {data.repos.map((repo) => (
            <li
              key={repo.name}
              className="relative flex flex-col gap-1.5 rounded-panel border border-border bg-surface-2 px-4 py-3.5 transition-colors duration-200 hover:border-primary-line motion-reduce:transition-none"
            >
              {/* The link covers the whole tile; its name is just the repo name. */}
              <a
                href={repo.url}
                className="truncate font-mono text-[13px] font-medium after:absolute after:inset-0 after:rounded-panel"
              >
                {repo.name}
              </a>
              {repo.description && (
                <p className="line-clamp-1 text-[13px] text-muted">{repo.description}</p>
              )}
              <p className="flex flex-wrap items-center gap-x-3 font-mono text-[11.5px] text-muted">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="size-[7px] rounded-full bg-primary" />
                    {repo.language}
                  </span>
                )}
                <span>
                  <span aria-hidden="true">★ </span>
                  {repo.stars}
                  <span className="sr-only"> stars</span>
                </span>
                <span>Updated {timeAgo(repo.updatedAt)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GitHubSkeleton() {
  return (
    <div aria-hidden="true" className={gridClass}>
      <div className={cardClass}>
        <div className="flex items-center gap-3.5">
          <Skeleton className="size-12" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-[86px]" />
          <Skeleton className="h-[86px]" />
        </div>
        <Skeleton className="h-2.5 w-full rounded-full" />
      </div>
      <div className={cardClass}>
        <Skeleton className="h-5 w-44" />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-[86px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
