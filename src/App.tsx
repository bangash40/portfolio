import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { Hero } from './components/sections/Hero';
import { useLenis } from './hooks/useLenis';

function App() {
  useLenis();

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <Hero />
        <section id="about" />
        <section id="projects" />
        <section id="journey" />
        <section id="github" />
        <section id="contact" />
      </main>
      <Footer />
    </>
  );
}

export default App;
