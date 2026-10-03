import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App.tsx';
import { NotFound } from './pages/NotFound.tsx';

// One page plus a 404, no router (TRD.md §6). The hash is not part of pathname.
const isHome = window.location.pathname === '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isHome ? <App /> : <NotFound />}</StrictMode>,
);
