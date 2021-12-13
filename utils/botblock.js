const puppeteer = require('puppeteer');
const assert = require('assert').strict;
const fetchJson = require('./fetch-json');

module.exports = host => Promise.all([
    (async () => {
        const browser = await puppeteer.launch();

        try {
            const page = await browser.newPage();
            await page.goto(`https://${host}/`);

            // Check the heading is there
            const headingH1 = await page.$eval('.headline h1', e => e.textContent);
            assert.equal(headingH1.trim(), 'BotBlock.org');
            const headingP = await page.$eval('.headline p', e => e.textContent);
            assert.equal(headingP.trim(), 'The single source for all Discord bot lists.');

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
