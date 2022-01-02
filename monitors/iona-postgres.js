const isPortReachable = require('is-port-reachable');
const pg = require('pg');

module.exports = () => Promise.all([
    isPortReachable(5432, { host: 'iona.s.mattcowley.co.uk' }),
    (async () => {
        const connection = new pg.Client({ host: 'iona.s.mattcowley.co.uk' });
        await connection.connect().catch(err => {
            // Don't throw if access denied, we didn't give a username/password
            if (err && err.code !== '28000') throw err;
        });
    })(),
]);
