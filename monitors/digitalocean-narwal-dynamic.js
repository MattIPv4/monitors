import { strict as assert } from 'node:assert';
import { fetchHealth, fetchUncached } from '../utils/fetch.js';

export default () => Promise.all([
    fetchHealth('https://www.digitalocean.com/api/dynamic-content/health'),
    (async () => {
        // Fetch and check response code
        const res = await fetchUncached('https://www.digitalocean.com/api/dynamic-content/v1/tutorials/react-axios-react');
        assert.equal(res.status, 401);

        // Get the error data
        const data = await res.json();


        // Check we get the expected error message
        assert.equal(Object.keys(data).length, 4);
        assert.equal(data.statusCode, 401);
        assert.equal(data.code, 'HTTP_ERROR_UNAUTHORIZED');
        assert.equal(data.error, 'Unauthorized');
        assert.equal(data.message, 'Expected Authorization header');
    })(),
]);
