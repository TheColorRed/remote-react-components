import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [url, setURL] = useState(() => new URL(window.location.href));

  const locationChange = (e: CustomEvent) => setURL(new URL(e.detail, window.location.origin));

  useEffect(() => {
    window.addEventListener('pathnameChange', locationChange);
    return () => window.removeEventListener('pathnameChange', locationChange);
  }, []);

  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    origin: url.origin,
  };
};
