import type { Screen } from '../../types/content';

type Variant = Extract<Screen, { kind: 'placeholder' }>['variant'];
/** Phone screens; the web variants are drawn as browser thumbnails in the project cards. */
export type PhoneVariant = Exclude<Variant, 'miniplayer' | 'portfolio'>;

interface PlaceholderScreenProps {
  variant: PhoneVariant;
  /** Title shown at the top of the app. */
  title: string;
}

// Designed stand-in app screens used until real screenshots exist (DESIGN.md §6.7). They use the
// theme tokens, so they follow dark and light mode. Sized in container query units: the units
// resolve against the outer wrapper, so padding and gaps sit on the inner column.
export function PlaceholderScreen({ variant, title }: PlaceholderScreenProps) {
  return (
    <div aria-hidden="true" className="@container absolute inset-0 bg-bg-2 text-text">
      <div className="flex h-full flex-col gap-[4.8cqw] px-[6.5cqw] pt-[18.3cqw] pb-[6.5cqw]">
        <p className="text-[7.5cqw] leading-tight font-bold tracking-[-0.02em]">{title}</p>
        {variant === 'kheench' ? (
          <KheenchBody />
        ) : variant === 'grocery' ? (
          <GroceryBody />
        ) : (
          <ImsBody admin={variant === 'ims-admin'} />
        )}
      </div>
    </div>
  );
}

function Row({ width, icon }: { width: string; icon: string }) {
  return (
    <div className="flex items-center gap-[4.8cqw] rounded-[5.9cqw] border border-border bg-surface p-[4.3cqw]">
      <span className={`size-[12.9cqw] shrink-0 rounded-[4.3cqw] ${icon}`} />
      <div className="flex flex-1 flex-col gap-[2.15cqw]">
        <span className="h-[3.2cqw] rounded-full bg-text opacity-70" style={{ width }} />
        <span className="h-[2.15cqw] w-[40%] rounded-full bg-muted opacity-45" />
      </div>
    </div>
  );
}

// Intern Management System: intern/admin switch over a list. Both sides share one layout.
function ImsBody({ admin }: { admin: boolean }) {
  const on = 'flex-1 rounded-full bg-primary py-[2.7cqw] text-center text-primary-ink';
  const off = 'flex-1 py-[2.7cqw] text-center text-muted';
  const widths = admin ? ['62%', '74%', '50%', '66%', '45%'] : ['70%', '55%', '64%', '48%', '58%'];
  return (
    <>
      <div className="flex rounded-full border border-border bg-surface p-[1.6cqw] text-[5.4cqw] font-semibold">
        <span className={admin ? off : on}>Intern</span>
        <span className={admin ? on : off}>Admin</span>
      </div>
      {widths.map((width, index) => (
        <Row
          key={width}
          width={width}
          icon={admin && index % 2 === 0 ? 'bg-cyan/25' : 'bg-primary-soft'}
        />
      ))}
    </>
  );
}

// Kheench: link field, fetch button, preview and format chips.
function KheenchBody() {
  return (
    <>
      <div className="flex h-[18.3cqw] items-center rounded-[5.4cqw] border border-border bg-surface px-[5.4cqw] font-mono text-[5.1cqw] text-muted">
        https://…/watch?v=
      </div>
      <div className="flex h-[17.2cqw] items-center justify-center rounded-[5.4cqw] bg-primary text-[5.9cqw] font-semibold text-primary-ink">
        Fetch formats
      </div>
      <div className="h-[49.5cqw] rounded-[6.5cqw] border border-border bg-surface" />
      <div className="flex flex-wrap gap-[2.7cqw] font-mono text-[5.1cqw]">
        {['1080p', '720p', '480p', 'audio'].map((label, index) => (
          <span
            key={label}
            className={`rounded-[3.2cqw] px-[3.8cqw] py-[2.15cqw] ${
              index === 0 ? 'bg-primary text-primary-ink' : 'border border-border'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <Row width="64%" icon="bg-primary-soft" />
      <Row width="50%" icon="bg-primary-soft" />
    </>
  );
}

// Grocery app: search, categories and a grid of products with prices.
function GroceryBody() {
  return (
    <>
      <div className="flex h-[16cqw] items-center rounded-[5.4cqw] border border-border bg-surface px-[5.4cqw] text-[5.1cqw] text-muted">
        Search groceries
      </div>
      <div className="flex gap-[2.7cqw] text-[5.1cqw] font-semibold">
        <span className="rounded-full bg-primary px-[4cqw] py-[2.2cqw] text-primary-ink">
          Fruit
        </span>
        <span className="rounded-full border border-border px-[4cqw] py-[2.2cqw] text-muted">
          Dairy
        </span>
        <span className="rounded-full border border-border px-[4cqw] py-[2.2cqw] text-muted">
          Bakery
        </span>
      </div>
      <div className="grid grid-cols-2 gap-[3.8cqw]">
        {['bg-primary-soft', 'bg-cyan/25', 'bg-cyan/25', 'bg-primary-soft'].map((tone, index) => (
          <div key={index} className="rounded-[5.4cqw] border border-border bg-surface p-[3.2cqw]">
            <span className={`block aspect-square rounded-[4cqw] ${tone}`} />
            <span className="mt-[3cqw] block h-[3cqw] w-[70%] rounded-full bg-text opacity-70" />
            <span className="mt-[2.4cqw] flex items-center justify-between">
              <span className="h-[2.6cqw] w-[38%] rounded-full bg-primary" />
              <span className="size-[7cqw] rounded-[2.4cqw] bg-primary" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex h-[16cqw] items-center justify-center rounded-[5.4cqw] bg-primary text-[5.6cqw] font-semibold text-primary-ink">
        View cart
      </div>
    </>
  );
}
