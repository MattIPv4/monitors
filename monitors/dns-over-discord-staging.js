const fetchHealth = require('../utils/fetch-health');

module.exports = () => fetchHealth('https://dns-over-discord-staging.v4.wtf/health');
