const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mattcowley.co.uk');

    try {
        // Check the heading is there
        const heading = await page.$eval('.content h1', e => e.textContent);
        assert(heading.trim().replace(/(\s){2,}/g, '$1').includes('Matt (IPv4) Cowley'));

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
