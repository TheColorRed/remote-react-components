import { useEffect, useState } from 'react';

declare global {
  interface GlobalEventHandlersEventMap {
    locationChange: CustomEvent<string>;
  }
  interface Window {
    /**
     * The runtime component loader mutation observer.
     */
    rtcl: () => void;
  }
}

if (!(window.rtcl instanceof MutationObserver)) {
  window.rtcl = () => {
    const { pushState, replaceState } = window.history;

    window.history.pushState = function (...args: [any, string, string]) {
      pushState.apply(this, args);
      window.dispatchEvent(new CustomEvent('locationChange', { detail: window.location.pathname }));
    };

    window.history.replaceState = function (...args: [any, string, string]) {
      replaceState.apply(this, args);
      window.dispatchEvent(new CustomEvent('locationChange', { detail: window.location.pathname }));
    };
  };

  window.addEventListener('load', window.rtcl);
}

export const useLocation = () => {
  const [url, setURL] = useState(() => new URL(window.location.href));

  const locationChange = (e: CustomEvent) => setURL(new URL(e.detail, window.location.origin));

  useEffect(() => {
    window.addEventListener('locationChange', locationChange);
    return () => window.removeEventListener('locationChange', locationChange);
  }, []);

  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    origin: url.origin,
  };
};
