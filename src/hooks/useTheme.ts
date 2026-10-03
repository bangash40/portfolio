import { useCallback, useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const TRANSITION_MS = 250;

let transitionTimer: number | undefined;

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Colors transition for 250ms on a theme switch only, never on first paint (DESIGN.md §7.3).
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
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
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
  const theme = useSyncExternalStore(subscribe, getSnapshot, (): Theme => 'light');

  useEffect(() => {
    if (!document.documentElement.dataset.theme) {
      applyTheme(readStoredTheme() ?? getSystemTheme(), false);
    }

    // Follow the system setting until the visitor makes a choice.
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      if (!readStoredTheme()) applyTheme(getSystemTheme(), true);
    };
    media.addEventListener('change', onSystemChange);
    return () => media.removeEventListener('change', onSystemChange);
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
