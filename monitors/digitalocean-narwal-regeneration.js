const fetchHealth = require('../utils/fetch-health');

module.exports = () => fetchHealth('https://www.digitalocean.com/api/regeneration/health');
