import { strict as assert } from 'assert';
import { fetchUncached } from '../utils/fetch';

export default async () => {
    const res = await fetchUncached('https://alligator.io', { redirect: 'manual' });
    assert.equal(res.status, 301);
    assert.equal(res.headers.get('location'), 'https://www.digitalocean.com/community/');
};
