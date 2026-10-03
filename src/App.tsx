import { Container } from './components/layout/Container';
import { SkipLink } from './components/layout/SkipLink';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { content } from './data/content';

function App() {
  return (
    <>
      <SkipLink />
      <main id="main">
        <Container>
          <ThemeToggle />
          <h1 className="text-hero">{content.person.fullName}</h1>
        </Container>
      </main>
    </>
  );
}

export default App;
