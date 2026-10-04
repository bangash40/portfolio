import type { CSSProperties } from 'react';
import { PhoneFrame } from '../phone/PhoneFrame';
import { TaskAppScreen } from '../phone/TaskAppScreen';

// The app plus the engineering around it (DESIGN.md §6.3): a Dart code card, an API card, a
// git card and a widget breadcrumb, joined to the phone by flowing dashed lines. The cards are
// decoration (aria-hidden) and hidden below 980px, where only the phone remains.
const card =
  'absolute rounded-panel border border-border bg-surface-2 shadow-float max-[979px]:hidden';

const codeLines = [
  <>
    <span className="text-code-keyword">class</span> <span className="text-cyan">TaskTile</span>{' '}
    <span className="text-code-keyword">extends</span>
  </>,
  <>
    {'    '}
    <span className="text-cyan">StatelessWidget</span> {'{'}
  </>,
  <>
    {'  '}
    <span className="text-cyan">Widget</span> build(ctx) =&gt;
  </>,
  <>
    {'    '}
    <span className="text-cyan">ListTile</span>(
  </>,
  <>
    {'      '}title: <span className="text-cyan">Text</span>(task.title),
  </>,
  <>
    {'    '}); <span className="caret" />
  </>,
];

export function HeroVisual() {
  return (
    <div className="relative flex justify-center min-[980px]:block min-[980px]:h-[640px]">
      <svg
        aria-hidden="true"
        viewBox="0 0 560 640"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible max-[979px]:hidden"
      >
        <path
          className="hero-dash"
          d="M150 330 C 200 330, 215 300, 250 290"
          fill="none"
          stroke="var(--color-primary-line)"
          strokeWidth="1.5"
        />
        <path
          className="hero-dash"
          d="M440 110 C 400 110, 390 150, 362 160"
          fill="none"
          stroke="var(--color-primary-line)"
          strokeWidth="1.5"
        />
        <path
          className="hero-dash"
          d="M140 500 C 200 500, 210 470, 250 455"
          fill="none"
          stroke="var(--color-primary-line)"
          strokeWidth="1.5"
        />
        <circle cx="250" cy="290" r="3.5" fill="var(--color-primary)" />
        <circle cx="362" cy="160" r="3.5" fill="var(--color-primary)" />
        <circle cx="250" cy="455" r="3.5" fill="var(--color-primary)" />
      </svg>

      <div className="hero-float-a relative min-[980px]:absolute min-[980px]:top-[18px] min-[980px]:left-1/2 min-[980px]:ml-[20px] min-[980px]:-translate-x-1/2">
        <PhoneFrame label="Phone showing a Flutter app: an intern task dashboard with weekly progress and a task list">
          <TaskAppScreen />
        </PhoneFrame>
      </div>

      {/* Dart code card */}
      <div
        aria-hidden="true"
        className={`${card} hero-float-b top-[250px] -left-7 w-[268px] overflow-hidden`}
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-2 font-mono text-[11px] text-muted">
          <span className="size-2 rounded-full bg-cyan" />
          task_tile.dart
        </div>
        <pre className="m-0 px-3.5 py-3 font-mono text-[11.5px] leading-[1.7] text-text">
          {codeLines.map((line, index) => (
            <span
              key={index}
              data-code-line
              className="block"
              style={{ '--line-delay': `${900 + index * 200}ms` } as CSSProperties}
            >
              {line}
            </span>
          ))}
        </pre>
      </div>

      {/* API card */}
      <div
        aria-hidden="true"
        className={`${card} hero-float-c top-[60px] -right-6 w-[212px] px-3.5 py-3`}
      >
        <div className="flex items-center justify-between font-mono text-[11px]">
          <span>
            <span className="text-cyan">GET</span> /tasks
          </span>
          <span className="inline-flex items-center gap-1.5 text-ok">
            <span className="hero-ping relative size-1.5 rounded-full bg-ok" />
            200
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-1.5">
          <span className="h-[5px] w-[90%] rounded-full bg-border-2" />
          <span className="h-[5px] w-[70%] rounded-full bg-border-2" />
        </div>
        <p className="mt-2.5 font-mono text-[10.5px] text-muted">firestore · realtime stream</p>
      </div>

      {/* Git card */}
      <div
        aria-hidden="true"
        className={`${card} hero-float-b bottom-[74px] -left-2.5 w-[220px] px-3.5 py-3`}
      >
        <div className="flex items-center gap-2.5">
          <svg width="54" height="40" viewBox="0 0 54 40" fill="none">
            <path d="M6 32H48" stroke="var(--color-border-2)" strokeWidth="2" />
            <path
              d="M14 32 C 14 14, 22 10, 30 10 L 40 10 C 44 10, 46 20, 46 32"
              stroke="var(--color-primary)"
              strokeWidth="2"
            />
            <circle
              cx="6"
              cy="32"
              r="4"
              fill="var(--color-surface-2)"
              stroke="var(--color-border-2)"
              strokeWidth="2"
            />
            <circle cx="30" cy="10" r="4" fill="var(--color-primary)" />
            <circle cx="46" cy="32" r="4" fill="var(--color-primary)" />
          </svg>
          <p className="font-mono text-[10.5px] leading-normal">
            <span className="text-primary">feature/admin</span>
            <br />
            <span className="text-muted">merged into main</span>
          </p>
        </div>
      </div>

      {/* Widget breadcrumb */}
      <div
        aria-hidden="true"
        className={`${card} hero-float-a right-1.5 bottom-[30px] px-3 py-2 [animation-delay:-3s]`}
      >
        <span className="font-mono text-[11px] text-muted">
          Scaffold <span className="text-faint">›</span> Column{' '}
          <span className="text-faint">›</span> <span className="text-primary">TaskList</span>
        </span>
      </div>
    </div>
  );
}
