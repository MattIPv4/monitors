const assert = require('assert').strict;
const fetchHealth = require('../utils/fetch-health');
const fetchUncached = require('../utils/fetch-uncached');

module.exports = () => Promise.all([
    fetchHealth('https://www.digitalocean.com/api/regeneration/health'),
    (async () => {
        // Fetch and check response code
        const res = await fetchUncached('https://www.digitalocean.com/api/regeneration/v1/nextjs', { method: 'POST' });
        assert.equal(res.status, 401);

        // Get the error data
        const data = await res.json();

        // Check we get the expected error keys
        assert.equal(Object.keys(data).length, 2);
        assert('code' in data);
        assert('message' in data);

        // Check we get the expected error message
        assert.equal(data.code, 'InvalidCredentials');
        assert.equal(data.message, 'Expected Authorization header');
    })(),
]);
