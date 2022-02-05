import isPortReachable from 'is-port-reachable';
import ssh from 'ssh2';

export default () => Promise.all([
    isPortReachable(22, { host: 'iona.s.mattcowley.co.uk' }),
    new Promise(resolve => {
        const connection = new ssh.Client();
        try {
            connection.connect({ host: 'iona.s.mattcowley.co.uk' });
        } catch (err) {
            // Don't throw if access denied, we didn't give a username/password
            if (err && err.message !== 'Invalid username') throw err;
        }
        resolve();
    }),
]);
