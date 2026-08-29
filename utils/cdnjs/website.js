import { strict as assert } from 'node:assert';
import browserPage from '../browser-page.js';
import { normalizeWhitespace } from '../strings.js';

export default host => browserPage(`https://${host}/`, async page => {
    // Check the heading is there
    const heading = await page.$eval('h1', e => e.textContent);
    assert.equal(normalizeWhitespace(heading), 'The free CDN for open source libraries.');

    // Open the search box
    await page.click('input[name="search"]');

    // Ensure the search box shows some hits
    const react = await page.waitForSelector('xpath/.//li//a[.//text()[contains(., "react")]]');
    assert.notEqual(react, null);
});
