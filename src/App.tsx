import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { About } from './components/sections/About';
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
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Journey />
        <GitHubActivity />
        <section id="contact" />
      </main>
      <Footer />
    </>
  );
}

export default App;
