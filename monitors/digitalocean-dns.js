const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.digitalocean.com/community/tools/dns');

    try {
        // Check the heading is there
        const heading = await page.$eval('.do-bulma .landing h1', e => e.textContent);
        assert.equal(heading.trim(), 'DNS Lookup');

        // Click on the domain input box and type domain
        await page.focus('.do-bulma .landing .input');
        await page.keyboard.type('digitalocean.com');

        // Click the search button
        await page.click('.do-bulma .landing .button');

        // Allow the results to load
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check the A records title is present
        const aRecordsTitle = await page.$('.do-bulma .container #A-Records');
        assert.notEqual(aRecordsTitle, null);

        // Check results are present
        const tableRow = await page.$('.do-bulma .container .table-container tbody tr td');
        assert.notEqual(tableRow, null);
        const tableRowText = await tableRow.evaluate(e => e.textContent);
        assert.equal(tableRowText.trim(), 'digitalocean.com');

    } catch (e) {
        // This isn't working reliably, screenshot to debug
        console.log(await page.screenshot({ fullPage: true, encoding: 'base64' }));

        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
