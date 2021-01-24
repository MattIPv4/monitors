const puppeteer = require('puppeteer');
const assert = require('assert').strict;
const fetchJson = require('./fetch-json');

module.exports = host => Promise.all([
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://${host}/`);

        try {
            // Check the heading is there
            const heading = await page.$eval('.hero h1', e => e.textContent);
            assert.equal(heading.trim(), 'Discord Bot Lists? We have them all.');

        } catch (e) {
            // Close the browser before error-ing
            await browser.close();

            // Re-throw error
            throw e;
        }

        // Tests passed, close browser
        await browser.close();
    })(),
    fetchJson(`https://${host}/api/lists`),
]);
