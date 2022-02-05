const assert = require('assert').strict;
const browserPage = require('../browser-page');

module.exports = host => browserPage(`https://${host}/`, async page => {
    // Check the heading is there
    const heading = await page.$eval('.landing h1', e => e.textContent);
    assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Simple. Fast. Reliable. Content delivery at its finest.');

    // Click on something other than the search box
    await page.click('.landing h1');
    await page.waitForTimeout(1500);
    await page.click('.landing h1');
    await page.waitForTimeout(1500);

    // Click back on the search box to trigger hits to show
    await page.click('.landing .ais-SearchBox-input');
    await page.waitForTimeout(1500);
    await page.click('.landing .ais-SearchBox-input');
    await page.waitForTimeout(1500);

    // Ensure the search box shows some hits
    const hits = await page.$('.landing .ais-Hits');
    assert.notEqual(hits, null);
    const hitsBox = await hits.boundingBox();
    assert.notEqual(hitsBox, null);
});
