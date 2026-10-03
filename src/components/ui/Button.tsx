import type { ComponentPropsWithRef } from 'react';

type Variant = 'primary' | 'secondary';

type LinkButtonProps = ComponentPropsWithRef<'a'> & { href: string; variant?: Variant };
type NativeButtonProps = ComponentPropsWithRef<'button'> & { href?: undefined; variant?: Variant };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60';

// Primary darkens 8% on hover; secondary fills with Graphite (DESIGN.md §6.4).
const variants: Record<Variant, string> = {
  primary: 'bg-signal text-on-signal hover:bg-[color-mix(in_srgb,var(--color-signal),black_8%)]',
  secondary: 'border-[1.5px] border-graphite text-graphite hover:bg-graphite hover:text-fog',
};

// Renders an <a> when given an href, otherwise a <button>.
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = 'primary', className = '', ...rest } = props;
    return <a className={`${base} ${variants[variant]} ${className}`} {...rest} />;
  }

  const { variant = 'primary', className = '', type = 'button', ...rest } = props;
  return <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}
