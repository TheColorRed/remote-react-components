const endpoints = new Map<string, string>();

export type Endpoint = {
  /**
   * The name of the endpoint. This is used to reference the endpoint instead of the URL.
   */
  name: string;
  /**
   * The URL for the remote library.
   */
  url: string;
};

export function set(name: string, url: string): void;
/**
 * Sets one or more endpoints that can be used to load remote libraries by name instead of URL.
 * @param args The endpoints to set.
 */
export function set(...args: Endpoint[]): void;
export function set(...args: Endpoint[] | [string, string]) {
  if (typeof args[0] === 'string') {
    const [name, url] = args as [string, string];
    checkIfNameExists(name);
    checkIfUrlExists(url);
    endpoints.set(name, url);
  } else {
    const e = args as Endpoint[];
    e.forEach(({ name, url }) => {
      checkIfNameExists(name);
      checkIfUrlExists(url);
      endpoints.set(name, url);
    });
  }
}
/**
 * Gets an endpoint by name.
 * @param name The name of the endpoint to get.
 */
export function get(name: string) {
  return endpoints.get(name);
}
/**
 * Removes an endpoint by name or URL.
 * @param nameOrUrl The name or URL of the endpoint to remove.
 */
export function remove(nameOrUrl: string) {
  if (nameOrUrl.match(/^https?:/)) {
    const entries = Array.from(endpoints.entries());
    const getEntry = entries.find(([, u]) => u === nameOrUrl);
    if (getEntry) {
      endpoints.delete(getEntry[0]);
    }
  } else {
    endpoints.delete(nameOrUrl);
  }
}
/**
 * Checks if an endpoint exists by name.
 * @param name The name of the endpoint to check the existence of.
 * @throws An error if the endpoint already exists.
 */
function checkIfNameExists(name: string) {
  const entries = Array.from(endpoints.entries());
  const getEntry = entries.find(([n]) => n === name);
  if (getEntry && endpoints.has(name)) {
    throw new Error(`The name "${name}" has already been added to the endpoint manager with the URL "${getEntry[1]}".`);
  }
}
/**
 * Checks if a URL exists in the endpoint manager.
 * @param url The URL to check the existence of.
 * @throws An error if the URL already exists.
 */
function checkIfUrlExists(url: string) {
  const entries = Array.from(endpoints.entries());
  const getEntry = entries.find(([, u]) => u === url);
  if (getEntry) {
    throw new Error(`The URL "${url}" has already been added to the endpoint manager with the name "${getEntry[0]}".`);
  }
}
