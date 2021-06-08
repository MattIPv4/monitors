const fetchJson = require('../fetch-json');

module.exports = (host, lib = 'vue') => Promise.all([
    fetchJson(`https://${host}/libraries`),
    fetchJson(`https://${host}/libraries/${lib}`),
    fetchJson(`https://${host}/libraries/${lib}/tutorials`),
]);
