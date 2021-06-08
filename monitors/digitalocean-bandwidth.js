const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto('https://www.digitalocean.com/community/tools/bandwidth');

        // Check the heading is there
        const heading = await page.$eval('.bandwidth h1', e => e.textContent);
        assert.equal(heading.trim(), 'Bandwidth Calculator');

        // Check the default Droplet is present
        const initialDroplet = await page.$$('.droplets .panel-list-vertical .panel.is-droplet');
        assert.equal(initialDroplet.length, 1);

        // Check adding a Droplet works
        await page.click('.picker .panel-list .panel.is-droplet');
        const updatedDroplets = await page.$$('.droplets .panel-list-vertical .panel.is-droplet');
        assert.equal(updatedDroplets.length, 2);

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
