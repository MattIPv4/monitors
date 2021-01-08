const isPortReachable = require('is-port-reachable');
const mysql = require('mysql');

module.exports = () => Promise.all([
    isPortReachable(3306, { host: 'kasper.servers.unreal-designs.co.uk' }),
    new Promise(resolve => {
        const connection = mysql.createConnection({ host: 'kasper.servers.unreal-designs.co.uk' });
        connection.connect(err => {
            // Don't throw if access denied, we didn't give a username/password
            if (err && err.code !== 'ER_ACCESS_DENIED_ERROR') throw err;
            resolve();
        });
    }),
]);
