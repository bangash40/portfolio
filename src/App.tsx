import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { About } from './components/sections/About';
import { Hero } from './components/sections/Hero';
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
        <section id="journey" />
        <section id="github" />
        <section id="contact" />
      </main>
      <Footer />
    </>
  );
}

export default App;
