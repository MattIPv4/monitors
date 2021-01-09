const fetchHealth = require('../utils/fetch-health');

module.exports = () => fetchHealth('https://dns-over-discord.v4.wtf/health');
