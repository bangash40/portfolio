import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { content } from '../../data/content';
import {
  getGitHubSummary,
  timeAgo,
  type GitHubSummary,
  type LanguageShare,
} from '../../lib/github';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Skeleton } from '../ui/Skeleton';

type LoadState =
  { status: 'idle' | 'loading' | 'error' } | { status: 'ready'; data: GitHubSummary };

const profileUrl = content.links.github;
const profileLabel = profileUrl.replace(/^https?:\/\//, '');

// Language bar shades: Signal at 100%, 70%, 45% and 25% (DESIGN.md §6.8).
const shades = [1, 0.7, 0.45, 0.25];

// Up to three languages, then everything else as "Other", so there is a shade for each.
function barSegments(languages: LanguageShare[]): LanguageShare[] {
  if (languages.length <= shades.length) return languages;
  const top = languages.slice(0, shades.length - 1);
  const rest = languages.slice(shades.length - 1).reduce((sum, lang) => sum + lang.share, 0);
  return [...top, { name: 'Other', share: rest }];
}

const percent = (share: number) => `${Math.round(share * 100)}%`;

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
        <SectionHeading id="github-heading">What I'm pushing to GitHub</SectionHeading>
        {state.status === 'ready' ? (
          <GitHubPanel data={state.data} />
        ) : state.status === 'error' ? (
          <p className="max-w-[68ch] text-lead text-slate">
            GitHub isn't responding right now. See all my work on{' '}
            <a href={profileUrl} className="text-signal underline underline-offset-4">
              {profileLabel}
            </a>
            .
          </p>
        ) : (
          <GitHubSkeleton />
        )}
      </Container>
    </section>
  );
}

function GitHubPanel({ data }: { data: GitHubSummary }) {
  const segments = barSegments(data.languages);
  const stats = [
    { value: data.publicRepos, label: 'Public repos' },
    { value: data.followers, label: 'Followers' },
  ];

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <dl className="flex gap-12 lg:col-span-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-small text-slate">{stat.label}</dt>
              <dd className="font-display text-h3 font-semibold text-graphite tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {segments.length > 0 && (
          <div className="lg:col-span-7 lg:col-start-6">
            <div
              role="img"
              aria-label={`Languages: ${segments.map((s) => `${s.name} ${percent(s.share)}`).join(', ')}`}
              className="flex h-3 overflow-hidden rounded-full bg-line"
            >
              {segments.map((segment, index) => (
                <span
                  key={segment.name}
                  className="h-full bg-signal"
                  style={{ width: `${segment.share * 100}%`, opacity: shades[index] }}
                />
              ))}
            </div>
            <ul aria-hidden="true" className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-small">
              {segments.map((segment, index) => (
                <li key={segment.name} className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full bg-signal"
                    style={{ opacity: shades[index] }}
                  />
                  <span className="text-graphite">{segment.name}</span>
                  <span className="text-slate tabular-nums">{percent(segment.share)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.repos.map((repo) => (
          <li
            key={repo.name}
            className="relative flex flex-col rounded-panel border border-line p-6 transition-colors duration-150 hover:border-slate motion-reduce:transition-none"
          >
            <h3 className="font-body text-body font-semibold text-graphite">
              {/* The link covers the whole card; its name is just the repo name. */}
              <a
                href={repo.url}
                className="after:absolute after:inset-0 after:rounded-panel hover:text-signal"
              >
                {repo.name}
              </a>
            </h3>
            {repo.description && (
              <p className="mt-2 line-clamp-2 text-small text-slate">{repo.description}</p>
            )}
            <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-small text-slate">
              {repo.language && <span>{repo.language}</span>}
              <span className="flex items-center gap-1">
                <Star size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="tabular-nums">
                  {repo.stars}
                  <span className="sr-only"> stars</span>
                </span>
              </span>
              <span>Updated {timeAgo(repo.updatedAt)}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10">
        <a
          href={profileUrl}
          className="inline-flex min-h-11 items-center font-semibold text-signal underline-offset-4 hover:underline"
        >
          See everything on GitHub
        </a>
      </p>
    </>
  );
}

function GitHubSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="flex gap-12 lg:col-span-4">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-9 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="mt-4 h-4 w-2/3" />
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex h-40 flex-col gap-3 rounded-panel border border-line p-6">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
