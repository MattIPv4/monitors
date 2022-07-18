import { strict as assert } from 'assert';
import fetchUncached from '../utils/fetch-uncached.js';

export default async () => {
    const res = await fetchUncached('https://hacktoberfest.com', { redirect: 'manual' });
    assert.equal(res.status, 302);
    assert.equal(res.headers.get('location'), 'https://hacktoberfest.digitalocean.com/');
};
