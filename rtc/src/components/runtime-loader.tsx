import { createElement, useEffect, useState } from 'react';
import { load, Source } from '../utilities/load';

declare global {
  interface GlobalEventHandlersEventMap {
    pathnameChange: CustomEvent<string>;
  }
  interface Window {
    /**
     * The runtime component loader mutation observer.
     */
    rtcl: () => void;
  }
}

export interface RuntimeLoaderProps {
  runtime: string;
  version?: string;
  config?: any;
  activateOn?: string | RegExp;
}

if (!(window.rtcl instanceof MutationObserver)) {
  window.rtcl = () => {
    const { pushState, replaceState } = window.history;

    window.history.pushState = function (...args: [any, string, string]) {
      pushState.apply(this, args);
      window.dispatchEvent(new CustomEvent('pathnameChange', { detail: window.location.pathname }));
    };

    window.history.replaceState = function (...args: [any, string, string]) {
      replaceState.apply(this, args);
      window.dispatchEvent(new CustomEvent('pathnameChange', { detail: window.location.pathname }));
    };
  };

  window.addEventListener('load', window.rtcl);
}

export const AppLoader = (props: RuntimeLoaderProps) => {
  const [source, setSource] = useState<Source | null>(null);
  const [location, setLocation] = useState(() => window.location.pathname);
  const [component, setComponent] = useState<any>(null);
  const [isActivated, setIsActivated] = useState(true);

  const windowPathnameChange = (e: CustomEvent) => setLocation(e.detail);
  /**
   * Load the component from the source, and set it as the component state.
   */
  const loadComponent = () => {
    if (!source) return;
    import(/* @vite-ignore */ source.endpoint).then(module =>
      setComponent(createElement(module.default, props.config))
    );
  };

  useEffect(() => {
    load(props.runtime, props.version).then(v => {
      setSource(v);
    });
  }, [props.runtime, props.version]);

  // Update the activation state when the location changes
  useEffect(() => {
    // If the activateOn prop is a string, do an exact match on the location
    (typeof props.activateOn === 'string' && location === props.activateOn) ||
    // If the activateOn prop is a RegExp, do a regex match on the location
    (props.activateOn instanceof RegExp && location.match(props.activateOn)) ||
    // If the activateOn prop is not set, we always activate
    typeof props.activateOn === 'undefined'
      ? setIsActivated(true)
      : setIsActivated(false);
  }, [location]);

  // When the source changes, load the new component
  useEffect(() => loadComponent(), [source]);
  // Setup the event listener when the component is mounted
  useEffect(() => {
    // Attach the event listener handler when the component is mounted
    window.addEventListener('pathnameChange', windowPathnameChange);
    // Remove the event listener handler when the component is unmounted
    return () => window.removeEventListener('pathnameChange', windowPathnameChange);
  }, []);

  return <>{isActivated && component}</>;
};
