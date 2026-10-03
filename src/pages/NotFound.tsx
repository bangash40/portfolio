import { useEffect } from 'react';
import { content } from '../data/content';
import { PhoneFrame } from '../components/phone/PhoneFrame';
import { Button } from '../components/ui/Button';

// Shown for any path other than "/" (TRD.md §6). The only centered page (DESIGN.md §4).
export function NotFound() {
  useEffect(() => {
    document.title = `Page not found — ${content.person.fullName}`;
    // Vercel serves this through the SPA rewrite with a 200, so keep it out of search results.
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center gap-12 px-6 py-16 text-center"
    >
      <PhoneFrame size="sm" label="Phone showing a screen not found message">
        <div className="@container absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] bg-[#f6f7f9] text-[#1d2330]">
          <span className="font-display text-[22cqw] leading-none font-extrabold tracking-[-0.03em]">
            404
          </span>
          <span className="text-[5cqw] font-semibold text-[#5b6475]">Screen not found</span>
          <span className="absolute bottom-[2.2cqw] left-1/2 h-[1.4cqw] w-[34cqw] -translate-x-1/2 rounded-full bg-[#1d2330]" />
        </div>
      </PhoneFrame>

      <div className="flex flex-col items-center gap-8">
        <h1 className="font-display text-h2 font-extrabold text-graphite">
          This screen doesn't exist
        </h1>
        <Button href="/">Go to the home page</Button>
      </div>
    </main>
  );
}
