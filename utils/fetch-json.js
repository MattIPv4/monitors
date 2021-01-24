const gunzip = require('gunzip-maybe');
const fetchUncached = require('./fetch-uncached');

// We're always fetching JSON, but sometimes it's gzipped
const gunzipBody = (body) => new Promise((resolve, reject) => {
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

module.exports = async url => {
    const res = await fetchUncached(url);
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const body = await gunzipBody(res.body);
    let data;
    try {
        data = JSON.parse(body);
    } catch (_) {}
    if (data === null || data === undefined || typeof data !== 'object')
        throw new Error(`Unexpected endpoint response: ${JSON.stringify(data)}`);
};
