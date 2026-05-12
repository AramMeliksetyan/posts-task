import { useState, useEffect, useRef } from 'react';

/**
 * Tracks sticky nav hide/show state.
 * - Nav becomes sticky after the header scrolls out of view.
 * - After 200px more of scrolling down → nav hides.
 * - Any scroll up → nav shows again.
 * - Back at top → nav resets to natural flow.
 */
export default function useStickyNav(headerRef) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const headerH = headerRef.current?.offsetHeight ?? 0;

      if (y < headerH) {
        setHidden(false);
      } else {
        const delta = y - lastScrollY.current;
        if (delta > 0 && y > headerH + 200) {
          setHidden(true);
        } else if (delta < 0) {
          setHidden(false);
        }
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [headerRef]);

  return hidden;
}
