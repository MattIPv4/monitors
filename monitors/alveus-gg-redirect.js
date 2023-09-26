import { strict as assert } from 'node:assert';
import { fetchUncached } from '../utils/fetch';

export default async () => {
    const res = await fetchUncached('https://alveus.gg', { redirect: 'manual' });
    assert(res.status >= 300 && res.status < 400);
    assert.equal(res.headers.get('location'), 'https://www.alveussanctuary.org/');
};
