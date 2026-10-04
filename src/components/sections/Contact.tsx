import { content } from '../../data/content';
import { isFilled } from '../../lib/placeholders';
import { Container } from '../layout/Container';
import { ContactForm } from './ContactForm';

const { links, sections, githubUsername } = content;
const copy = sections.contact;

interface ContactRow {
  label: string;
  value: string;
  href: string;
}

// Only the ways to reach me that are set (DESIGN.md §6.10).
const rows: ContactRow[] = [
  isFilled(links.email) && { label: 'email', value: links.email, href: `mailto:${links.email}` },
  { label: 'github', value: githubUsername, href: links.github },
  isFilled(links.linkedin) && {
    label: 'linkedin',
    value: links.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
    href: links.linkedin,
  },
  isFilled(links.whatsapp) && { label: 'whatsapp', value: 'Message me', href: links.whatsapp },
].filter((row): row is ContactRow => !!row);

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-10 pb-20 lg:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-card border border-border bg-surface p-6 shadow-glow sm:p-10 min-[980px]:p-14">
          <div aria-hidden="true" className="bg-grid absolute inset-0" />
          <div className="relative grid items-start gap-12 min-[980px]:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[12.5px] text-muted">
                lib/<span className="font-medium text-primary">contact</span>.dart
              </span>
              <p className="mt-[22px] text-[22px] text-muted">{copy.eyebrow}</p>
              <h2
                id="contact-heading"
                className="mt-1 mb-[18px] text-[clamp(2.5rem,6vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
              >
                {copy.title}
              </h2>
              <p className="mb-[30px] max-w-[42ch] text-muted">{copy.lead}</p>
              <ul className="flex flex-col gap-1">
                {rows.map((row) => (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      className="group inline-flex min-h-11 items-center gap-3 break-all"
                    >
                      <span className="w-[76px] shrink-0 font-mono text-xs text-faint">
                        {row.label}
                      </span>
                      <span className="font-medium transition-colors duration-200 group-hover:text-primary">
                        {row.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
