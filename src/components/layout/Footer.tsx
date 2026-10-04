import { ArrowUp } from 'lucide-react';
import { content } from '../../data/content';
import { handleAnchorClick } from '../../hooks/useLenis';
import { isFilled } from '../../lib/placeholders';
import { GitHubIcon, LinkedInIcon } from '../ui/icons';
import { IconLink } from '../ui/IconLink';
import { Container } from './Container';

const { footer, links, person } = content;

// Name and role, the tagline and copyright; GitHub, LinkedIn and back to top (DESIGN.md §6.11).
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-wrap items-center justify-between gap-5 py-8">
        <div>
          <p className="font-semibold">
            {person.fullName} <span className="font-normal text-muted">— {footer.role}</span>
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            {footer.tagline} © {year}
          </p>
        </div>
        <div className="flex gap-0.5">
          <IconLink href={links.github} label="GitHub profile">
            <GitHubIcon size={17} />
          </IconLink>
          {isFilled(links.linkedin) && (
            <IconLink href={links.linkedin} label="LinkedIn profile">
              <LinkedInIcon size={17} />
            </IconLink>
          )}
          <IconLink
            href="#home"
            label="Back to top"
            onClick={(event) => handleAnchorClick(event, 'home')}
          >
            <ArrowUp size={17} strokeWidth={1.8} aria-hidden="true" />
          </IconLink>
        </div>
      </Container>
    </footer>
  );
}
