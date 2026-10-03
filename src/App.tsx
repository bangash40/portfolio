import { Analytics } from '@vercel/analytics/react';
import { lazy, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { Hero } from './components/sections/Hero';
import { useLenis } from './hooks/useLenis';

// Below-the-fold sections and the footer share one lazily loaded chunk.
const BelowFold = lazy(() => import('./components/sections/BelowFold'));
const Footer = lazy(() =>
  import('./components/layout/Footer').then((module) => ({ default: module.Footer })),
);

function App() {
  useLenis();

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Suspense fallback={null}>
          <BelowFold />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Analytics />
    </>
  );
}

export default App;
