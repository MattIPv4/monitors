import { strict as assert } from 'node:assert';
import dnsTls from 'dns-over-tls';

export default async () => Promise.all([
    [ '1.1.1.1', 'cloudflare-dns.com' ],
    [ '1.1.1.1', 'one.one.one.one' ],
    [ '1.0.0.1', 'cloudflare-dns.com' ],
    [ '1.0.0.1', 'one.one.one.one' ],
    [ '1.1.1.2', 'security.cloudflare-dns.com' ],
    [ '1.0.0.2', 'security.cloudflare-dns.com' ],
    [ '1.1.1.3', 'family.cloudflare-dns.com' ],
    [ '1.0.0.3', 'family.cloudflare-dns.com' ],
    // [ 'cloudflare-dns.com', 'cloudflare-dns.com' ],
    [ 'one.one.one.one', 'one.one.one.one' ],
    [ 'security.cloudflare-dns.com', 'security.cloudflare-dns.com' ],
    [ 'family.cloudflare-dns.com', 'family.cloudflare-dns.com' ],
].map(async ([ host, servername ]) => {
    try {
        const res = await dnsTls.query({
            name: 'google.com',
            type: 'A',
            host,
            servername,
        });
        assert.equal(res.rcode, 'NOERROR');
        assert(res.answers.length > 0);
    } catch (err) {
        err.message = `Error resolving google.com with ${host} (${servername}): ${err.message}`;
        throw err;
    }
}));
