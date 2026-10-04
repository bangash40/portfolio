import { useState, type CSSProperties } from 'react';
import { content } from '../../data/content';
import type { Skill } from '../../types/content';
import { Container } from '../layout/Container';
import { Chip } from '../ui/Chip';
import { SectionHeader } from '../ui/SectionHeader';

const { sections, skillTree } = content;
const { root } = skillTree;
const primary = skillTree.children.filter((skill) => skill.tier === 'primary');
const secondary = skillTree.children.filter((skill) => skill.tier === 'secondary');
const allSkills = [root, ...primary, ...secondary];

// Orbit geometry on a 560px square (DESIGN.md §6.6), as percentages so it shrinks with the column:
// primary skills on the inner ring (radius 170), secondary on the dashed outer ring (radius 250).
const ORBIT = 560;
const INNER = { radius: 170, start: -90, width: 118, height: 42 };
const OUTER = { radius: 250, start: -90, width: 112, height: 34 };

function place(skills: Skill[], ring: typeof INNER) {
  return skills.map((skill, index) => {
    const deg = ring.start + (360 / skills.length) * index;
    const rad = (deg * Math.PI) / 180;
    const x = 50 + ((ring.radius * Math.cos(rad)) / ORBIT) * 100;
    const y = 50 + ((ring.radius * Math.sin(rad)) / ORBIT) * 100;
    return {
      skill,
      deg,
      style: {
        '--x': `calc(${x.toFixed(2)}% - ${ring.width / 2}px)`,
        '--y': `calc(${y.toFixed(2)}% - ${ring.height / 2}px)`,
      } as CSSProperties,
    };
  });
}

const innerNodes = place(primary, INNER);
const outerNodes = place(secondary, OUTER);

const weight = (skill: Skill) =>
  skill === root ? '★★★ core' : skill.tier === 'primary' ? '★★ primary' : '★ supporting';

// Below 980px every node is a plain button in a wrapping grid; from 980px it takes its orbit slot.
const nodeBase =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-button border px-3.5 transition-[border-color,box-shadow,translate,background-color,color] duration-250 ease-out-soft hover:-translate-y-[3px] hover:border-primary-line motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[980px]:absolute min-[980px]:top-(--y) min-[980px]:left-(--x) min-[980px]:min-h-0 min-[980px]:px-0';

export function Skills() {
  const [selectedId, setSelectedId] = useState(root.id);
  const selected = allSkills.find((skill) => skill.id === selectedId) ?? root;

  const handlers = (skill: Skill) => {
    const pick = () => setSelectedId(skill.id);
    return { onClick: pick, onMouseEnter: pick, onFocus: pick, 'aria-pressed': skill === selected };
  };

  const node = (skill: Skill, minor: boolean) => {
    const isSelected = skill === selected;
    return `${nodeBase} ${
      isSelected
        ? 'border-primary bg-surface text-text shadow-glow'
        : minor
          ? 'border-dashed border-border bg-surface text-muted'
          : 'border-border bg-surface text-text'
    } ${
      minor
        ? 'text-[12.5px] font-medium min-[980px]:h-[34px] min-[980px]:w-[112px]'
        : 'text-[14.5px] font-semibold min-[980px]:h-[42px] min-[980px]:w-[118px]'
    }`;
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-y border-border bg-bg-2 py-20 lg:py-32"
    >
      <Container>
        <SectionHeader file="skills" id="skills-heading" copy={sections.skills} />

        <div className="scroll-rise mt-10 grid items-center gap-10 min-[980px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="relative min-[980px]:mx-auto min-[980px]:aspect-square min-[980px]:w-full min-[980px]:max-w-[560px]">
            {/* Rings and spokes (desktop only) */}
            <div aria-hidden="true" className="max-[979px]:hidden">
              <span className="absolute inset-[19.64%] rounded-full border border-border-2" />
              <span className="absolute inset-[5.36%] rounded-full border border-dashed border-border" />
              {innerNodes.map(({ skill, deg }) => (
                <span
                  key={skill.id}
                  className="absolute top-1/2 left-1/2 h-px w-[30.36%] origin-left bg-linear-to-r from-primary-line to-transparent"
                  style={{ rotate: `${deg}deg` }}
                />
              ))}
            </div>

            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              <li>
                <button
                  type="button"
                  {...handlers(root)}
                  style={{ '--x': 'calc(50% - 70px)', '--y': 'calc(50% - 40px)' } as CSSProperties}
                  className={`${nodeBase} border-primary bg-primary text-primary-ink min-[980px]:h-20 min-[980px]:w-[140px] min-[980px]:flex-col min-[980px]:gap-0.5 min-[980px]:rounded-[22px] ${
                    root === selected ? 'shadow-glow' : ''
                  }`}
                >
                  <span className="text-[15px] font-bold tracking-[-0.02em] min-[980px]:text-xl">
                    {root.name}
                  </span>
                  <span className="font-mono text-[10.5px] opacity-80 max-[979px]:hidden">
                    primary stack
                  </span>
                </button>
              </li>
              {innerNodes.map(({ skill, style }) => (
                <li key={skill.id}>
                  <button
                    type="button"
                    {...handlers(skill)}
                    style={style}
                    className={node(skill, false)}
                  >
                    <span aria-hidden="true" className="size-[7px] rounded-[2px] bg-primary" />
                    {skill.name}
                  </button>
                </li>
              ))}
              {outerNodes.map(({ skill, style }) => (
                <li key={skill.id}>
                  <button
                    type="button"
                    {...handlers(skill)}
                    style={style}
                    className={node(skill, true)}
                  >
                    <span aria-hidden="true" className="size-[7px] rounded-[2px] bg-cyan" />
                    {skill.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-live="polite"
            className="rounded-card border border-border bg-surface p-6 shadow-glow sm:p-7"
          >
            <div className="flex items-center justify-between gap-3">
              <Chip hot={selected.tier === 'primary'}>{selected.tier}</Chip>
              <span className="font-mono text-[11px] text-faint">skill.inspect()</span>
            </div>
            <h3 className="mt-[18px] mb-1.5 text-[32px] leading-tight font-semibold tracking-[-0.03em]">
              {selected.name}
            </h3>
            <p className="mb-[22px] text-muted">{selected.use}</p>
            <dl className="rounded-panel border border-border bg-surface-2 px-4 py-3.5 font-mono text-[12.5px] leading-[1.9]">
              <div className="flex justify-between gap-3">
                <dt className="text-faint">level</dt>
                <dd>{selected.level}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-faint">used in</dt>
                <dd className="text-right">{selected.usedIn}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-faint">weight</dt>
                <dd className="text-primary">{weight(selected)}</dd>
              </div>
            </dl>
            <p className="mt-[18px] font-mono text-[11.5px] text-faint">
              Primary: {[root, ...primary].map((skill) => skill.name).join(', ')} · Secondary:{' '}
              {secondary.map((skill) => skill.name).join(', ')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
