const fetch = require('node-fetch');

module.exports = url => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort()
    }, 30000);

    return fetch(url, {
        signal: controller.signal,
        headers: {
            'Pragma': 'no-cache',
            'Cache': 'no-cache',
            'Cache-Control': 'no-cache',
        },
    }).then(res => {
        clearTimeout(timeout);
        return res;
    });
};
