const assert = require('assert').strict;
const browserPage = require('../utils/browser-page');

module.exports = () => browserPage('https://mattcowley.co.uk', async page => {
    // Check the heading is there
    const heading = await page.$eval('.content h1', e => e.textContent);
    assert(heading.trim().replace(/(\s){2,}/g, '$1').includes('Matt Cowley'));
});
