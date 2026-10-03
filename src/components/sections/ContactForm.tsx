import { useId, useState, type FormEvent } from 'react';
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
  'w-full rounded-field border bg-paper px-4 text-graphite transition-colors duration-150 focus:border-signal motion-reduce:transition-none';

// The way to reach the owner when the form can't be used: email if set, otherwise GitHub.
function DirectContact() {
  return email ? (
    <a href={`mailto:${email}`} className="text-signal underline underline-offset-4">
      {email}
    </a>
  ) : (
    <a href={content.links.github} className="text-signal underline underline-offset-4">
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
      <div className="rounded-panel border border-line bg-paper p-6 md:p-8">
        <p className="text-lead text-slate">
          The contact form isn't connected yet. Reach me {email ? 'by email at' : 'on GitHub at'}{' '}
          <DirectContact />.
        </p>
      </div>
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
      className: `${fieldClass} ${error ? 'border-error' : 'border-line'}`,
    };

    return (
      <div>
        <label htmlFor={id} className="mb-2 block font-medium text-graphite">
          {label}
        </label>
        {input === 'input' ? (
          <input
            {...shared}
            type={name === 'email' ? 'email' : 'text'}
            autoComplete={name === 'email' ? 'email' : 'name'}
            className={`${shared.className} h-12`}
          />
        ) : (
          <textarea {...shared} rows={6} className={`${shared.className} min-h-40 py-3`} />
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
    <form
      noValidate
      onSubmit={submit}
      aria-label="Contact form"
      className="flex flex-col gap-6 rounded-panel border border-line bg-paper p-6 md:p-8"
    >
      {field('name', 'Name', 'input')}
      {field('email', 'Email', 'input')}
      {field('message', 'Message', 'textarea')}

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
        </Button>
        <p role="status" aria-live="polite" className="text-small">
          {status === 'sent' && (
            <span className="text-graphite">Message sent. I'll reply within two days.</span>
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
  );
}
