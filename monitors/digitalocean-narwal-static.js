import { strict as assert } from 'node:assert';
import { fetchHealth, fetchJson } from '../utils/fetch.js';

export default () => Promise.all([
    fetchHealth('https://www.digitalocean.com/api/static-content/health'),
    (async () => {
        const data = await fetchJson('https://www.digitalocean.com/api/static-content/v1/tutorials/react-axios-react');
        assert('id' in data);
        assert('title' in data);
        assert('content' in data);
    })(),
    (async () => {
        const data = await fetchJson('https://www.digitalocean.com/api/static-content/v1/questions/ubuntu-16-04-creating-new-user-and-adding-ssh-keys');
        assert('id' in data);
        assert('title' in data);
        assert('content' in data);
    })(),
]);
