import gunzip from 'gunzip-maybe';
import fetch from 'node-fetch';

export const fetchUncached = (url, opts = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort()
    }, 30000);

    return fetch(url, {
        ...opts,
        signal: controller.signal,
        headers: {
            ...(opts || {}).headers,
            'Pragma': 'no-cache',
            'Cache': 'no-cache',
            'Cache-Control': 'no-cache',
        },
    }).then(res => {
        clearTimeout(timeout);
        return res;
    });
};

export const fetchHealth = async (url, opts = {}, resp = 'OK') => {
    const res = await fetchUncached(url);
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const text = (await res.text() || '').replace(/[\r\n]/g, '');
    if (text !== resp) throw new Error(`Unexpected health check response: ${text}`);
};

const gunzipBody = body => new Promise((resolve, reject) => {
    const gunzipHandler = gunzip();
    body.pipe(gunzipHandler);
    let string = '';
    gunzipHandler.on('data', (data) => {
        string += data.toString();
    }).on('end', () => {
        resolve(string);
    }).on('error', (err) => {
        reject(err);
    });
});

export const fetchBody = async (url, opts = {}) => {
    const res = await fetchUncached(url, opts);
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);
    return gunzipBody(res.body);
};

export const fetchJson = async (url, opts = {})  => {
    const body = await fetchBody(url, opts);
    let data;
    try {
        data = JSON.parse(body);
    } catch (_) {}
    if (data === null || data === undefined || typeof data !== 'object')
        throw new Error(`Unexpected endpoint response: ${JSON.stringify(data)}`);
    return data;
};
