export interface Source {
  name: string;
  endpoint: string;
  version: string;
}

const loaded: Source[] = [];

export async function load(name: string, version?: string) {
  const p = Object.entries({ name, version }).filter(([_, v]) => typeof v !== 'undefined');
  // convert [['name', 'value'], ['version', 'value']] to { name: 'value', version: 'value' } removing any empty values
  const entries = Object.fromEntries(p) as { name: string; version: string };
  const params = new URLSearchParams(entries).toString();

  const source = await (await fetch(`http://localhost:3000/find?${params}`)).json();
  if (!source) throw new Error(`Source not found: ${name}@${version}`);

  const isLoaded = loaded.find(s => s.endpoint === source.endpoint);

  if (isLoaded) return isLoaded;

  loaded.push(source);
  return source as Source;
}
