const fetchJson = require('../fetch-json');

module.exports = host => Promise.all([
    fetchJson(`https://${host}/libraries`),
    fetchJson(`https://${host}/libraries/vue`),
    fetchJson(`https://${host}/libraries/vue/tutorials`),
]);
