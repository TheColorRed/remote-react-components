import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RemoteWidget } from '../components/widget';
import { get } from '../utilities/endpoint-manager';

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }
}

export type DefaultModule = { [key: string]: RemoteWidget };

/**
 * Loads a module from a remote source using a URL.\
 * **Note:** It is recommended to use the [Endpoint Manager]{@link file://./../utilities/endpoint-manager.ts} and then use a name instead of a URL.
 * @param endpoint The endpoint to load the module from.
 * @example
 * import { useDynamicLoader } from '@ecp/rtc/dynamic-loader';
 * import { Widget } from '@ecp/rtc/widget';
 *
 * export default () => {
 *   const { Example } = useDynamicLoader('http://localhost:3000/example.mjs');
 *   return <Widget widget={Example} />;
 * }
 */
export function useRemoteLoader(endpoint: `http${string}`): DefaultModule;
/**
 * Loads a module from a defined list of endpoints.
 * @param name The name of the endpoint to load the module from.
 * @example
 * import { useDynamicLoader } from '@ecp/rtc/dynamic-loader';
 * import { Widget } from '@ecp/rtc/widget';
 * import { set } from '@ecp/rtc/endpoint-manager';
 *
 * // It's best to place this in a common file that will always be loaded
 * set('my-module', 'http://localhost:3000/example.mjs');
 *
 * export default () => {
 *   const { Example } = useDynamicLoader('my-module');
 *   return <Widget widget={Example} />;
 * }
 */
export function useRemoteLoader(name: string): DefaultModule;
export function useRemoteLoader(endpoint: string): DefaultModule {
  const [module, setModule] = useState<DefaultModule>({});

  useEffect(() => {
    if (!endpoint) return;
    // If the endpoint is not a URL, get the URL from the endpoint manager
    if (!endpoint.match(/^https?:/)) endpoint = get(endpoint) ?? '';
    // If the endpoint is empty, return
    if (endpoint.trim().length === 0) return;
    // Load the module from the endpoint
    import(endpoint).then(m => {
      console.log(m);
      setModule(m);
    });
    // import(endpoint).then(setModule);
  }, []);

  return module;
}
