const assert = require('assert').strict;
const browserPage = require('../browser-page');

module.exports = host => browserPage(`https://${host}/`, async page => {
    // Check the heading is there
    const heading = await page.$eval('.landing h1', e => e.textContent);
    assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Simple. Fast. Reliable. Content delivery at its finest.');

    // Wait for Algolia to load
    await page.waitForNetworkIdle();

    // Ensure we're in the search box, and type a query
    await page.click('.landing .ais-SearchBox-input');
    await page.keyboard.type('react');

    // Wait for Algolia to load
    await page.waitForNetworkIdle();

    // Ensure the search box shows some hits
    const hits = await page.$('.landing .ais-Hits');
    assert.notEqual(hits, null);
    const hitsBox = await hits.boundingBox();
    assert.notEqual(hitsBox, null);
});
