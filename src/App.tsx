import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SkipLink } from './components/layout/SkipLink';
import { PhoneFrame } from './components/phone/PhoneFrame';
import { content } from './data/content';
import { useLenis } from './hooks/useLenis';

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
            <PhoneFrame label="Phone with a blank screen" />
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
