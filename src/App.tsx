import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { ScreenReel } from './components/phone/ScreenReel';
import { content } from './data/content';
import { useLenis } from './hooks/useLenis';
import { reelItemsFromProjects } from './lib/reel';

const heroReel = reelItemsFromProjects(content.projects);

function App() {
  useLenis();

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">
        <section id="top" className="pt-[72px]">
          <Container className="flex flex-col gap-12 py-16 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-hero">{content.person.fullName}</h1>
            <ScreenReel items={heroReel} priority />
          </Container>
        </section>
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
