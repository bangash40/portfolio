import type { ComponentPropsWithRef } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'sm';

interface Options {
  variant?: Variant;
  size?: Size;
}

type LinkButtonProps = ComponentPropsWithRef<'a'> & Options & { href: string };
type NativeButtonProps = ComponentPropsWithRef<'button'> & Options & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

// `group` lets an icon inside nudge on hover (e.g. `group-hover:translate-x-[3px]`).
const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-button font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

// DESIGN.md §6.12: primary lifts and glows; secondary lifts and tints its border.
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-ink hover:shadow-glow',
  secondary: 'border border-border-2 bg-surface text-text hover:border-primary-line',
};

const sizes: Record<Size, string> = {
  md: 'h-12 px-[22px] text-[15.5px]',
  sm: 'h-[38px] px-3.5 text-sm',
};

// Renders an <a> when given an href, otherwise a <button>.
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = 'primary', size = 'md', className = '', ...rest } = props;
    return <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest} />;
  }

  const { variant = 'primary', size = 'md', className = '', type = 'button', ...rest } = props;
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
}
