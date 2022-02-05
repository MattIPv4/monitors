import fetchUncached from './fetch-uncached';

export default async (url, resp = 'OK') => {
    const res = await fetchUncached(url);
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const text = (await res.text() || '').replace(/[\r\n]/g, '');
    if (text !== resp) throw new Error(`Unexpected health check response: ${text}`);
};
