const fetchHealth = require('../utils/fetch-health');
const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = () => Promise.all([
    fetchHealth('https://hacktoberfest.digitalocean.com/health', '<html><body><h1>200 OK</h1>Service ready.</body></html>'),
    (async () => {
        const browser = await puppeteer.launch();

        try {
            const page = await browser.newPage();
            await page.goto('https://hacktoberfest.digitalocean.com/');

            // Check the heading is there
            const heading = await page.$eval('h1', e => e.textContent);
            assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Open source is changing the world - one pull request at a time.');

        } catch (e) {
            // Close the browser before error-ing
            await browser.close();

            // Re-throw error
            throw e;
        }

        // Tests passed, close browser
        await browser.close();
    })(),
]);
