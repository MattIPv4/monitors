const fetch = require('node-fetch');

module.exports = (url, opts = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort()
    }, 30000);

    return fetch(url, {
        ...opts,
        signal: controller.signal,
        headers: {
            ...(opts || {}).headers,
            'Pragma': 'no-cache',
            'Cache': 'no-cache',
            'Cache-Control': 'no-cache',
        },
    }).then(res => {
        clearTimeout(timeout);
        return res;
    });
};
