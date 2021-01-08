const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://cdnjs.com');

    // Check the heading is there
    const heading = await page.$eval('.landing h1', e => e.textContent);
    assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Simple. Fast. Reliable. Content delivery at its finest.');

    // Unselect & reselect the search box
    await page.click('.landing');
    await new Promise(resolve => setTimeout(resolve, 250));
    await page.click('.landing .ais-SearchBox-input');
    await new Promise(resolve => setTimeout(resolve, 250));

    // Ensure the search box shows some hits
    const hits = await page.$('.landing .ais-Hits');
    assert.notEqual(hits, null);
    const hitsBox = await hits.boundingBox();
    assert.notEqual(hitsBox, null);

    await browser.close();
};
