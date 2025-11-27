import { useEffect, useState } from 'react';

const DEFAULT_BREAKPOINT = 768;

export function useMobile(breakpoint: number = DEFAULT_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}
