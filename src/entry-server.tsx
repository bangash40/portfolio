import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import App from './App';

const app = () => (
  <StrictMode>
    <App />
  </StrictMode>
);

// Build-time render of the home page to static HTML (see scripts/prerender.mjs).
// Every section must be inline in the HTML. A suspended or large Suspense boundary is instead
// shipped in a hidden <div> that an inline script reveals on requestAnimationFrame — which
// never runs in a background tab, so a tab restored by the browser stayed blank below the hero.
// So: a first pass loads the lazily imported sections (resolved, they no longer suspend), and
// an unlimited progressiveChunkSize stops React outlining large boundaries.
export async function render(): Promise<string> {
  const options = { progressiveChunkSize: Number.POSITIVE_INFINITY };
  await prerender(app(), options);
  const { prelude } = await prerender(app(), options);
  return new Response(prelude).text();
}
