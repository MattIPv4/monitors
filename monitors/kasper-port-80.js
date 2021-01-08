const isPortReachable = require('is-port-reachable');

module.exports = () => isPortReachable(80, { host: 'kasper.servers.unreal-designs.co.uk' });
