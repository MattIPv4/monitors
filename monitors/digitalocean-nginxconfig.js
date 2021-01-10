const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.digitalocean.com/community/tools/nginx');

    try {
        // Check the heading is there
        const heading = await page.$eval('.header h1', e => e.textContent);
        assert.equal(heading.trim(), 'NGINXConfig');

        // Check a button in the tool works
        const [ button ] = await page.$x('//a[text()="Routing"]');
        assert.notEqual(button, null);
        await button.click();

        // Look for the routing content and check its now visible
        const [ label ] = await page.$x('//label[text()="Fallback routing"]');
        assert.notEqual(label, null);
        const labelBox = await label.boundingBox();
        assert.notEqual(labelBox, null);

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
