import { content } from '../../data/content';
import { handleAnchorClick } from '../../hooks/useLenis';
import { Container } from './Container';

const sourceCodeUrl =
  content.projects.find((project) => project.slug === 'portfolio')?.links.github ??
  content.links.github;

const linkClass =
  'inline-flex min-h-11 items-center text-graphite underline-offset-4 transition-colors duration-150 hover:text-signal hover:underline motion-reduce:transition-none';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-12 text-small text-slate md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {content.person.fullName}. Built with React and deployed on Vercel.
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={sourceCodeUrl} className={linkClass}>
              Source code
            </a>
          </li>
          <li>
            <a
              href="#top"
              onClick={(event) => handleAnchorClick(event, 'top')}
              className={linkClass}
            >
              Back to top
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
