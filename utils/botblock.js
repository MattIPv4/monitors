const assert = require('assert').strict;
const fetchJson = require('./fetch-json');
const browserPage = require('./browser-page');

module.exports = host => Promise.all([
    browserPage(`https://${host}/`, async page => {
        // Check the heading is there
        const headingH1 = await page.$eval('.headline h1', e => e.textContent);
        assert.equal(headingH1.trim(), 'BotBlock.org');
        const headingP = await page.$eval('.headline p', e => e.textContent);
        assert.equal(headingP.trim(), 'The single source for all Discord bot lists.');
    }),
    fetchJson(`https://${host}/api/lists`),
]);
