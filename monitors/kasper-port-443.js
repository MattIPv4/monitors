import isPortReachable from 'is-port-reachable';

export default () => isPortReachable(443, { host: 'kasper.servers.unreal-designs.co.uk' });
