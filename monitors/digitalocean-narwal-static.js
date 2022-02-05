const fetchHealth = require('../utils/fetch-health');

module.exports = () => fetchHealth('https://www.digitalocean.com/api/static-content/health');
