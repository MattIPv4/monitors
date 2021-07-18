const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async host => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto(`https://${host}/`);

        // Check the heading is there
        const heading = await page.$eval('.landing h1', e => e.textContent);
        assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Simple. Fast. Reliable. Content delivery at its finest.');

        // Click on something other than the search box
        await page.click('.landing h1');
        await new Promise(resolve => setTimeout(resolve, 1500));
        await page.click('.landing h1');
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Click back on the search box to trigger hits to show
        await page.click('.landing .ais-SearchBox-input');
        await new Promise(resolve => setTimeout(resolve, 1500));
        await page.click('.landing .ais-SearchBox-input');
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Ensure the search box shows some hits
        const hits = await page.$('.landing .ais-Hits');
        assert.notEqual(hits, null);
        const hitsBox = await hits.boundingBox();
        assert.notEqual(hitsBox, null);

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
