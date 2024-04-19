import { strict as assert } from 'node:assert';
import { fetchUncached } from '../utils/fetch.js';

export default async () => Promise.all([
    '1.1.1.1',
    '1.0.0.1',
    '1.1.1.2',
    '1.0.0.2',
    '1.1.1.3',
    '1.0.0.3',
    'one.one.one.one',
    'cloudflare-dns.com',
    'security.cloudflare-dns.com',
    'family.cloudflare-dns.com',
].map(async host => {
    try {
        const res = await fetchUncached(`https://${host}/dns-query?name=google.com&type=A`, { headers: { 'accept': 'application/dns-json' } });
        assert.equal(res.status, 200);
        const json = await res.json();
        assert.equal(json.Status, 0);
        assert(json.Answer.length > 0);
    } catch (err) {
        err.message = `Error resolving google.com with ${host}: ${err.message}`;
        throw err;
    }
}));
