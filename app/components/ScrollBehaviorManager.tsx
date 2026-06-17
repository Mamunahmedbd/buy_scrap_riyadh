'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function ScrollBehaviorManager() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;

      // Skip scrolling to top if the URL has a hash (let browser/Next.js scroll to targeted element)
      if (window.location.hash) {
        return;
      }

      const html = document.documentElement;

      // Temporarily remove scroll-smooth to make the transition scroll instant
      const hasSmooth = html.classList.contains('scroll-smooth');
      if (hasSmooth) {
        html.classList.remove('scroll-smooth');
      }

      // Immediately scroll to the top of the window
      window.scrollTo(0, 0);

      // Re-enable smooth scroll in a short timeout (after router navigation is complete)
      // so same-page anchor links still slide smoothly when clicked.
      const timer = setTimeout(() => {
        if (hasSmooth) {
          html.classList.add('scroll-smooth');
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
