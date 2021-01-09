const fetchUncached = require('./fetch-uncached');

module.exports = async url => {
    const res = await fetchUncached(url);
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const text = await res.text();
    if (text !== 'OK') throw new Error(`Unexpected health check response: ${text}`);
};
