import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const icon =
  'absolute transition-[opacity,transform] duration-[450ms] motion-reduce:transition-none';

// A pill with a sliding knob: moon on the left for dark, sun on the right for light (DESIGN.md §6.2).
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative h-[34px] w-[62px] shrink-0 cursor-pointer rounded-full border border-border-2 bg-surface-2 p-0"
    >
      <span
        className={`absolute top-[3px] left-[3px] flex size-[26px] items-center justify-center rounded-full bg-text text-bg transition-transform duration-[450ms] ease-[cubic-bezier(.6,-0.2,.3,1.3)] motion-reduce:transition-none ${
          isDark ? '' : 'translate-x-7'
        }`}
      >
        <Moon
          size={14}
          strokeWidth={2.2}
          aria-hidden="true"
          className={`${icon} ${isDark ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}
        />
        <Sun
          size={15}
          strokeWidth={2.2}
          aria-hidden="true"
          className={`${icon} ${isDark ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
        />
      </span>
    </button>
  );
}
