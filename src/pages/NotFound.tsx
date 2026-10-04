import { useEffect } from 'react';
import { content } from '../data/content';
import { PhoneFrame } from '../components/phone/PhoneFrame';
import { Button } from '../components/ui/Button';
import { FileLabel } from '../components/ui/FileLabel';

// Shown for any path other than "/" (TRD.md §6). The only centered page (DESIGN.md §4, §6.13).
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
      tabIndex={-1}
      className="relative flex min-h-svh flex-col items-center justify-center gap-12 overflow-hidden px-6 py-16 text-center"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />

      <PhoneFrame size="sm" label="Phone showing a screen not found message" className="relative">
        <div className="@container absolute inset-0 bg-bg-2">
          <div className="flex h-full flex-col items-center justify-center gap-[3cqw]">
            <span className="text-[24cqw] leading-none font-semibold tracking-[-0.04em] text-primary">
              404
            </span>
            <span className="font-mono text-[5.4cqw] text-muted">Screen not found</span>
          </div>
        </div>
      </PhoneFrame>

      <div className="relative flex flex-col items-center">
        <FileLabel name="404" />
        <h1 className="mt-5 mb-8 text-h2 font-semibold">This screen doesn't exist</h1>
        <Button href="/">Go to the home page</Button>
      </div>
    </main>
  );
}
