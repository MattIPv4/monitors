const isPortReachable = require('is-port-reachable');

module.exports = () => isPortReachable(443, { host: 'kasper.servers.unreal-designs.co.uk' });
