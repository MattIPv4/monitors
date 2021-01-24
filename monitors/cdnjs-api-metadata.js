const fetchJson = require('../utils/fetch-json');

module.exports = () => Promise.all([
    fetchJson('https://metadata.speedcdnjs.com/packages'),
    fetchJson('https://metadata.speedcdnjs.com/packages/vue'),
    fetchJson('https://metadata.speedcdnjs.com/packages/vue/all'),
    fetchJson('https://metadata.speedcdnjs.com/packages/vue/versions'),
    fetchJson('https://metadata.speedcdnjs.com/packages/vue/versions/3.0.0'),
    fetchJson('https://metadata.speedcdnjs.com/packages/vue/sris'),
    fetchJson('https://metadata.speedcdnjs.com/packages/vue/sris/3.0.0'),
]);
