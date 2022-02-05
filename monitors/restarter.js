const assert = require('assert').strict;
const browserPage = require('../utils/browser-page');

module.exports = () => Promise.all([
    browserPage('https://restarter.mattcowley.co.uk', async page => {
        // Check the heading is there
        const headingHomepage = await page.$eval('.content h1', e => e.textContent);
        assert.equal(headingHomepage.trim(), 'Restarter v3');
    }),
    browserPage('https://restarter.mattcowley.co.uk/docs/', async page => {
        // Check the docs heading is there
        const headingDocs = await page.$eval('.content h1', e => e.textContent);
        assert.equal(headingDocs.trim(), 'Restarter v3 Docs');
    }),
]);
