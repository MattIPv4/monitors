const fetchUncached = require('./fetch-uncached');

module.exports = async url => {
    const res = await fetchUncached(url);
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    if (data === null || typeof data !== 'object')
        throw new Error(`Unexpected endpoint response: ${JSON.stringify(data)}`);
};
