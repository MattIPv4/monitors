import { strict as assert } from 'assert';
import fetchHealth from '../utils/fetch-health';
import fetchUncached from '../utils/fetch-uncached';

export default () => Promise.all([
    fetchHealth('https://www.digitalocean.com/api/dynamic-content/health'),
    (async () => {
        // Fetch and check response code
        const res = await fetchUncached('https://www.digitalocean.com/api/dynamic-content/v1/tutorials/react-axios-react');
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
