import { strict as assert } from 'node:assert';
import { fetchUncached } from '../utils/fetch.js';

export default async () => {
    const res = await fetchUncached('https://hacktoberfest.digitalocean.com', { redirect: 'manual' });
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('location'), 'https://hacktoberfest.com/');
};
