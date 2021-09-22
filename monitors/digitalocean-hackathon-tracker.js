const assert = require('assert').strict;
const fetchUncached = require('../utils/fetch-uncached');

module.exports = () => Promise.all([
    (async () => {
        // Fetch and check response code
        const res = await fetchUncached('https://hackathon-tracker.digitalocean.com/');
        assert.equal(res.status, 404);

        // Get the error data
        const data = await res.json();

        // Check we get the expected error keys
        assert.equal(Object.keys(data).length, 2);
        assert('code' in data);
        assert('message' in data);

        // Check we get the expected error message
        assert.equal(data.code, 'ResourceNotFound');
        assert.equal(data.message, '/ does not exist');
    })(),
    (async () => {
        // Fetch and check response code
        const res = await fetchUncached('https://hackathon-tracker.digitalocean.com/events');
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
