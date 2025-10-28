import { strict as assert } from 'node:assert';
import { fetchUncached } from '../utils/fetch.js';

export default async () => {
    const res = await fetchUncached('https://discord.gg/nodejs');
    assert.equal(res.status, 200);
    const text = await res.text();
    const title = text.match(/<title>([^<]+)<\/title>/i);
    assert.equal(title[1], 'Node.js');
};
