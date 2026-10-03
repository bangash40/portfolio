// Public GitHub data for the live section (TRD.md §7). Unauthenticated: 60 requests per hour
// per visitor IP, so results are cached for the browser session. Never throws.

export interface LanguageShare {
  name: string;
  /** Fraction of non-fork repos using this as their main language, 0–1. */
  share: number;
}

export interface RepoItem {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  /** ISO date of the last push. */
  updatedAt: string;
  url: string;
}

export interface GitHubSummary {
  publicRepos: number;
  followers: number;
  languages: LanguageShare[];
  repos: RepoItem[];
}

interface ApiUser {
  public_repos: number;
  followers: number;
}

interface ApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
  fork: boolean;
}

const API = 'https://api.github.com';
const CACHE_TTL_MS = 30 * 60 * 1000;
const TIMEOUT_MS = 8000;
const REPO_COUNT = 6;

const cacheKey = (username: string) => `gh:${username}`;

function readCache(username: string): GitHubSummary | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw) as { savedAt: number; data: GitHubSummary };
    return Date.now() - savedAt < CACHE_TTL_MS ? data : null;
  } catch {
    return null;
  }
}

function writeCache(username: string, data: GitHubSummary) {
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Storage full or unavailable; the next visit simply fetches again.
  }
}

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
  return (await response.json()) as T;
}

function summarize(user: ApiUser, apiRepos: ApiRepo[]): GitHubSummary {
  const own = apiRepos.filter((repo) => !repo.fork);

  const counts = new Map<string, number>();
  for (const repo of own) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const counted = [...counts.values()].reduce((sum, count) => sum + count, 0);
  const languages = [...counts.entries()]
    .map(([name, count]) => ({ name, share: count / counted }))
    .sort((a, b) => b.share - a.share);

  const repos = [...own]
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, REPO_COUNT)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
      url: repo.html_url,
    }));

  return { publicRepos: user.public_repos, followers: user.followers, languages, repos };
}

/** Returns the summary, or null on any failure (network, rate limit, timeout). */
export async function getGitHubSummary(username: string): Promise<GitHubSummary | null> {
  const cached = readCache(username);
  if (cached) return cached;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const user = encodeURIComponent(username);
    const [profile, repos] = await Promise.all([
      getJson<ApiUser>(`${API}/users/${user}`, controller.signal),
      getJson<ApiRepo[]>(`${API}/users/${user}/repos?sort=updated&per_page=30`, controller.signal),
    ]);
    const data = summarize(profile, repos);
    writeCache(username, data);
    return data;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

const relativeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60 * 1000],
  ['month', 30 * 24 * 60 * 60 * 1000],
  ['week', 7 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
];

/** "3 days ago", "yesterday", "last month". */
export function timeAgo(iso: string, now = Date.now()): string {
  const diff = Date.parse(iso) - now;
  for (const [unit, ms] of units) {
    if (Math.abs(diff) >= ms) return relativeFormat.format(Math.round(diff / ms), unit);
  }
  return 'just now';
}
