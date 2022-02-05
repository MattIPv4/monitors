import isPortReachable from 'is-port-reachable';

export default () => isPortReachable(80, { host: 'kasper.servers.unreal-designs.co.uk' });
