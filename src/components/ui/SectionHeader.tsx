import type { SectionCopy } from '../../types/content';
import { FileLabel } from './FileLabel';

interface SectionHeaderProps {
  /** File name in the label, e.g. 'about' for `lib/about.dart`. */
  file: string;
  /** id for the h2, so the section can point aria-labelledby at it. */
  id: string;
  copy: SectionCopy;
}

// File-tab label, h2 and a one-line lead (DESIGN.md §6.4).
export function SectionHeader({ file, id, copy }: SectionHeaderProps) {
  return (
    <div>
      <FileLabel name={file} />
      <h2 id={id} className="mt-5 mb-3.5 text-h2 font-semibold">
        {copy.title}
      </h2>
      <p className="max-w-[60ch] text-lead text-muted">{copy.lead}</p>
    </div>
  );
}
