import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const TRANSITION_MS = 450;

let transitionTimer: number | undefined;

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

// Dark is the primary experience: it is the default until the visitor picks light (DESIGN.md §6.2).
const DEFAULT_THEME: Theme = 'dark';

// Colors cross-fade for 450ms on a theme switch only, never on first paint (DESIGN.md §7).
function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (animate && !reducedMotion) {
    root.classList.add('theme-transition');
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(
      () => root.classList.remove('theme-transition'),
      TRANSITION_MS + 50,
    );
  }
  root.dataset.theme = theme;
}

// The data-theme attribute on <html> is the single source of truth, so every hook
// instance stays in sync with the inline script in index.html and with each other.
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, (): Theme => DEFAULT_THEME);

  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      applyTheme(readStoredTheme() ?? DEFAULT_THEME, false);
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); the choice still applies for this page view.
    }
    applyTheme(next, true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getSnapshot() === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
