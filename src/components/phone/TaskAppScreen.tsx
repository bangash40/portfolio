// The hero phone's app: an intern task dashboard drawn in CSS (DESIGN.md §6.3). Sized in
// container query units so it scales with the phone; the units resolve against the outer
// wrapper, so padding and gaps sit on the inner column.
const tasks = [
  { width: '72%', done: true, tag: 'bg-cyan' },
  { width: '58%', done: true, tag: 'bg-primary' },
  { width: '66%', done: false, tag: 'bg-cyan' },
  { width: '50%', done: false, tag: 'bg-border-2' },
];

const weekly = ['40%', '70%', '55%', '100%', '75%'];

export function TaskAppScreen() {
  return (
    <div aria-hidden="true" className="@container absolute inset-0 bg-bg-2 text-text">
      <div className="flex h-full flex-col gap-[4.4cqw] px-[6cqw] pt-[17cqw] pb-[5cqw]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[4.2cqw] text-muted">Good morning</p>
            <p className="text-[7cqw] leading-tight font-bold tracking-[-0.02em]">Your tasks</p>
          </div>
          <span className="size-[13cqw] rounded-[4.5cqw] border border-primary-line bg-primary-soft" />
        </div>

        <div className="flex items-center gap-[5cqw] rounded-[7cqw] bg-primary p-[5.2cqw] text-primary-ink">
          <span className="relative size-[19cqw] shrink-0 rounded-full border-[1.9cqw] border-primary-ink/25">
            <span className="absolute -inset-[1.9cqw] rotate-[20deg] rounded-full border-[1.9cqw] border-transparent border-t-primary-ink border-r-primary-ink" />
          </span>
          <div className="flex-1">
            <p className="text-[4.5cqw] opacity-80">Weekly progress</p>
            <div className="mt-[3cqw] flex h-[10.5cqw] items-end gap-[1.5cqw]">
              {weekly.map((height, index) => (
                <span
                  key={index}
                  className={`flex-1 rounded-[1cqw] bg-current ${index === 3 ? '' : 'opacity-45'}`}
                  style={{ height }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-[2.3cqw] text-[4.1cqw]">
          <span className="rounded-full bg-text px-[4.2cqw] py-[2.2cqw] font-semibold text-bg">
            Today
          </span>
          <span className="rounded-full border border-border px-[4.2cqw] py-[2.2cqw] text-muted">
            Upcoming
          </span>
          <span className="rounded-full border border-border px-[4.2cqw] py-[2.2cqw] text-muted">
            Done
          </span>
        </div>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex items-center gap-[4.2cqw] rounded-[5.4cqw] border border-border bg-surface p-[4.2cqw]"
          >
            <span
              className={`size-[7.6cqw] shrink-0 rounded-[2.6cqw] border-[0.8cqw] ${
                task.done ? 'border-primary bg-primary' : 'border-border-2'
              }`}
            />
            <div className="flex flex-1 flex-col gap-[1.9cqw]">
              <span
                className="h-[2.7cqw] rounded-full bg-text opacity-75"
                style={{ width: task.width }}
              />
              <span className="h-[1.9cqw] w-[38%] rounded-full bg-muted opacity-45" />
            </div>
            <span className={`size-[2.7cqw] rounded-full ${task.tag}`} />
          </div>
        ))}

        <div className="mt-auto flex justify-around border-t border-border pt-[3.8cqw]">
          <span className="size-[7cqw] rounded-[2.3cqw] bg-primary" />
          <span className="size-[7cqw] rounded-[2.3cqw] bg-border-2" />
          <span className="size-[7cqw] rounded-[2.3cqw] bg-border-2" />
          <span className="size-[7cqw] rounded-[2.3cqw] bg-border-2" />
        </div>
      </div>
    </div>
  );
}
