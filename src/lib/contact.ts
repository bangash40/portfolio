// Contact form delivery through Web3Forms (TRD.md §8). Free tier, no backend of our own.

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

const ENDPOINT = 'https://api.web3forms.com/submit';
const TIMEOUT_MS = 10000;
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY?.trim() ?? '';

/** False until the owner adds VITE_WEB3FORMS_KEY; the UI then offers direct contact instead. */
export const contactFormEnabled = accessKey.length > 0;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(field: ContactField, rawValue: string): string | undefined {
  const value = rawValue.trim();
  switch (field) {
    case 'name':
      return value.length >= 2 && value.length <= 80
        ? undefined
        : 'Enter your name, between 2 and 80 characters.';
    case 'email':
      return EMAIL_PATTERN.test(value)
        ? undefined
        : 'Enter a valid email address, like name@example.com.';
    case 'message':
      return value.length >= 10 && value.length <= 2000
        ? undefined
        : 'Write a message between 10 and 2,000 characters.';
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of ['name', 'email', 'message'] as const) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

/** Sends the message. Returns true on success and never throws. */
export async function sendContactMessage(values: ContactValues, botcheck: boolean) {
  // Honeypot ticked: almost certainly a bot. Pretend it worked and send nothing.
  if (botcheck) return true;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        subject: 'New message from portfolio',
        botcheck: false,
      }),
      signal: controller.signal,
    });
    const result = (await response.json()) as { success?: boolean };
    return response.ok && result.success === true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeout);
  }
}
