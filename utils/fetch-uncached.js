const fetch = require('node-fetch');

module.exports = url => fetch(url, {
    headers: {
        'Pragma': 'no-cache',
        'Cache': 'no-cache',
        'Cache-Control': 'no-cache',
    },
});
