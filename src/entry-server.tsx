import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import App from './App';

// Build-time render of the home page to static HTML (see scripts/prerender.mjs). Waits for the
// lazily loaded sections, so the full page is in the HTML before any JavaScript runs.
export async function render(): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  return new Response(prelude).text();
}
