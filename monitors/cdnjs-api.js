const fetchJson = require('../utils/fetch-json');

module.exports = () => Promise.all([
    fetchJson('https://api.cdnjs.com/libraries'),
    fetchJson('https://api.cdnjs.com/libraries/vue'),
    fetchJson('https://api.cdnjs.com/libraries/vue/tutorials'),
]);
