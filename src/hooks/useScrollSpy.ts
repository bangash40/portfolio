import { useEffect, useState } from 'react';

// Returns the id of the section the visitor is reading: the last one whose top has passed
// a line 40% down the viewport. At the very bottom of the page the last section wins.
export function useScrollSpy(ids: string[], lineRatio = 0.4): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = ids.join(',');

  useEffect(() => {
    const sectionIds = idsKey.split(',');
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * lineRatio;
      let current: string | null = null;
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }

      const root = document.documentElement;
      const scrollable = root.scrollHeight > window.innerHeight;
      const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2;
      if (scrollable && atBottom) current = sectionIds[sectionIds.length - 1];

      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [idsKey, lineRatio]);

  return activeId;
}
