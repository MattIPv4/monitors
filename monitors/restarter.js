const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();

        // Check the heading is there
        await page.goto('https://restarter.mattcowley.co.uk');
        const headingHomepage = await page.$eval('.content h1', e => e.textContent);
        assert.equal(headingHomepage.trim(), 'Restarter v3');

        // Check the docs heading is there
        await page.goto('https://restarter.mattcowley.co.uk/docs/');
        const headingDocs = await page.$eval('.content h1', e => e.textContent);
        assert.equal(headingDocs.trim(), 'Restarter v3 Docs');

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
