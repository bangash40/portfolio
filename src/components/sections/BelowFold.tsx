import { useEffect } from 'react';
import { scrollToSection } from '../../hooks/useLenis';
import { About } from './About';
import { Contact } from './Contact';
import { Experience } from './Experience';
import { GitHubActivity } from './GitHubActivity';
import { Projects } from './Projects';
import { Skills } from './Skills';

// Everything after the hero. Loaded as its own chunk once the hero has rendered, so the first
// paint only waits for the navbar and hero (TRD.md §10).
export default function BelowFold() {
  // These sections mount after the browser's own hash jump, so honor deep links like /#projects.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && id !== 'home' && document.getElementById(id)) {
      requestAnimationFrame(() => scrollToSection(id));
    }
  }, []);

  return (
    <>
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GitHubActivity />
      <Contact />
    </>
  );
}
