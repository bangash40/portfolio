import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App.tsx';
import { NotFound } from './pages/NotFound.tsx';

// One page plus a 404, no router (TRD.md §6). The hash is not part of pathname.
const isHome = window.location.pathname === '/';
const container = document.getElementById('root')!;

if (isHome && container.hasChildNodes()) {
  // Production: the home page was prerendered at build time (scripts/prerender.mjs).
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  // Development, or any other path. Vercel serves the prerendered home HTML for unknown paths,
  // which index.html keeps hidden (.not-found) until the 404 page replaces it here.
  container.replaceChildren();
  document.documentElement.classList.remove('not-found');
  createRoot(container).render(<StrictMode>{isHome ? <App /> : <NotFound />}</StrictMode>);
}
