import axios from 'axios';

// Cache simple en mémoire — données conservées tant que l'onglet est ouvert
const store: Record<string, { data: any; ts: number }> = {};
const TTL = 5 * 60 * 1000; // 5 minutes

export async function cachedGet(url: string): Promise<any> {
  const now = Date.now();
  if (store[url] && now - store[url].ts < TTL) {
    return store[url].data;
  }
  const res = await axios.get(url);
  store[url] = { data: res.data, ts: now };
  return res.data;
}

export function invalidateCache(url: string) {
  delete store[url];
}
