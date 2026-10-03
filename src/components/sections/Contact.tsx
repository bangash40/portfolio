import { Briefcase, CodeXml, Mail, MessageCircle, type LucideIcon } from 'lucide-react';
import { content } from '../../data/content';
import { isFilled } from '../../lib/placeholders';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from './ContactForm';

const { links, person } = content;

interface DirectLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

const directLinks: DirectLink[] = [
  isFilled(links.email) && { label: 'Email', href: `mailto:${links.email}`, icon: Mail },
  { label: 'GitHub', href: links.github, icon: CodeXml },
  isFilled(links.linkedin) && { label: 'LinkedIn', href: links.linkedin, icon: Briefcase },
  isFilled(links.whatsapp) && { label: 'WhatsApp', href: links.whatsapp, icon: MessageCircle },
].filter((link): link is DirectLink => !!link);

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeading
          id="contact-heading"
          intro="Have an app idea, an internship opening, or a question? Send a message and I'll get back to you."
        >
          Let's build something
        </SectionHeading>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <ul className="flex flex-col gap-1">
              {directLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex min-h-11 items-center gap-3 font-medium text-graphite underline-offset-4 transition-colors duration-150 hover:text-signal hover:underline motion-reduce:transition-none"
                  >
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <Button variant="secondary" href={person.resumeUrl} download className="mt-8">
              Download résumé
            </Button>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
