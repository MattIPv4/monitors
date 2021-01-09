const fetchUncached = require('../utils/fetch-uncached');

module.exports = async () => {
    const res = await fetchUncached('https://dns-over-discord.v4.wtf/health');
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const text = await res.text();
    if (text !== 'OK') throw new Error(`Unexpected health check response: ${text}`);
};
