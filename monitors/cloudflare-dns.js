import { strict as assert } from 'node:assert';
import { Resolver } from 'node:dns/promises';

export default async () => Promise.all([
    '1.1.1.1',
    '1.0.0.1',
    '1.1.1.2',
    '1.0.0.2',
    '1.1.1.3',
    '1.0.0.3',
].map(async ip => {
    try {
        const resolver = new Resolver();
        resolver.setServers([ip]);
        const res = await resolver.resolve('google.com', 'A');
        assert(res.length > 0);
    } catch (err) {
        err.message = `Error resolving google.com with ${ip}: ${err.message}`;
        throw err;
    }
}));
