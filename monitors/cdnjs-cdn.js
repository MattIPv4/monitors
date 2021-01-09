const crypto = require('crypto');
const assert = require('assert').strict;
const fetchUncached = require('../utils/fetch-uncached');

module.exports = async () => {
    const res = await fetchUncached('https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.5/vue.cjs.js');
    if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

    const content = await res.text();
    const hash = 'sha512-' + crypto.createHash('sha512').update(content).digest('base64');
    assert.equal(hash, 'sha512-tbfpVZegVjOUS9H3X526XZJxi/dPnhiGRM8Z83AY8kbFBrZLuug/mU57PJJsdXn38dlXjrUxtaEOl11Y1uoaRQ==');
};
