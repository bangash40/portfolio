import { Analytics } from '@vercel/analytics/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { GitHubActivity } from './components/sections/GitHubActivity';
import { Hero } from './components/sections/Hero';
import { Journey } from './components/sections/Journey';
import { Projects } from './components/sections/Projects';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Journey />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
