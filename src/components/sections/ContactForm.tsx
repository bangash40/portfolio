import { ArrowRight } from 'lucide-react';
import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { content } from '../../data/content';
import {
  contactFormEnabled,
  sendContactMessage,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '../../lib/contact';
import { isFilled } from '../../lib/placeholders';
import { Button } from '../ui/Button';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const empty: ContactValues = { name: '', email: '', message: '' };
const email = isFilled(content.links.email) ? content.links.email : null;
const githubLabel = content.links.github.replace(/^https?:\/\//, '');

const fieldClass =
  'w-full rounded-field border bg-bg px-3.5 text-[15px] text-text outline-none transition-[border-color,box-shadow] duration-200 focus:border-primary focus:shadow-[0_0_0_4px_var(--color-primary-soft)] focus-visible:outline-none motion-reduce:transition-none';

// The request line and its state, like an API client (DESIGN.md §6.10).
const statusLine: Record<Status, { label: string; dot: string }> = {
  idle: { label: 'ready', dot: 'ping bg-ok' },
  sending: { label: 'sending…', dot: 'bg-cyan' },
  sent: { label: '200 sent', dot: 'bg-ok' },
  error: { label: 'failed', dot: 'bg-error' },
};

function Panel({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-panel border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-xs text-muted">
        <span>POST /message</span>
        <span className="inline-flex items-center gap-[7px]">
          <span
            aria-hidden="true"
            className={`relative size-1.5 rounded-full ${statusLine[status].dot}`}
          />
          {statusLine[status].label}
        </span>
      </div>
      {children}
    </div>
  );
}

// The way to reach the owner when the form can't be used: email if set, otherwise GitHub.
function DirectContact() {
  return email ? (
    <a href={`mailto:${email}`} className="text-primary underline underline-offset-4">
      {email}
    </a>
  ) : (
    <a href={content.links.github} className="text-primary underline underline-offset-4">
      {githubLabel}
    </a>
  );
}

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactValues>(empty);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [errors, setErrors] = useState<ContactErrors>({});
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  if (!contactFormEnabled) {
    return (
      <Panel status="idle">
        <p className="p-6 text-muted">
          The contact form isn't connected yet. Reach me {email ? 'by email at' : 'on GitHub at'}{' '}
          <DirectContact />.
        </p>
      </Panel>
    );
  }

  const update = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Once a field has been left, re-check it as the visitor types so errors clear promptly.
    if (touched[field])
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const blur = (field: ContactField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (['name', 'email', 'message'] as const).find((f) => nextErrors[f]);
    if (firstInvalid) {
      document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('sending');
    const sent = await sendContactMessage(values, botcheck);
    setStatus(sent ? 'sent' : 'error');
    if (sent) {
      setValues(empty);
      setTouched({});
    }
  };

  const field = (name: ContactField, label: string, input: 'input' | 'textarea') => {
    const id = `${formId}-${name}`;
    const errorId = `${id}-error`;
    const error = touched[name] ? errors[name] : undefined;
    const shared = {
      id,
      name,
      required: true,
      value: values[name],
      onChange: (event: { target: { value: string } }) => update(name, event.target.value),
      onBlur: () => blur(name),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
      className: `${fieldClass} ${error ? 'border-error' : 'border-border'}`,
    };

    return (
      <div>
        <label htmlFor={id} className="mb-[7px] block font-mono text-xs text-muted">
          {label}
        </label>
        {input === 'input' ? (
          <input
            {...shared}
            type={name === 'email' ? 'email' : 'text'}
            autoComplete={name === 'email' ? 'email' : 'name'}
            className={`${shared.className} h-[46px]`}
          />
        ) : (
          <textarea
            {...shared}
            rows={5}
            className={`${shared.className} block h-[120px] resize-none py-3`}
          />
        )}
        {error && (
          <p id={errorId} className="mt-2 text-small text-error">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <Panel status={status}>
      <form
        noValidate
        onSubmit={submit}
        aria-label="Contact form"
        className="flex flex-col gap-4 p-6"
      >
        {field('name', 'name', 'input')}
        {field('email', 'email', 'input')}
        {field('message', 'message', 'textarea')}

        {/* Honeypot for spam bots (Web3Forms botcheck). Hidden from people and assistive tech. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          checked={botcheck}
          onChange={(event) => setBotcheck(event.target.checked)}
          className="hidden"
        />

        <div className="flex flex-col items-start gap-4">
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
            <ArrowRight
              size={16}
              strokeWidth={2.2}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
            />
          </Button>
          <p role="status" aria-live="polite" className="text-small">
            {status === 'sent' && (
              <span className="text-text">Message sent. I'll reply within two days.</span>
            )}
            {status === 'error' && (
              <span className="text-error">
                Couldn't send your message. Check your connection and try again, or{' '}
                {email ? 'email me directly at' : 'reach me on GitHub at'} <DirectContact />.
              </span>
            )}
          </p>
        </div>
      </form>
    </Panel>
  );
}
