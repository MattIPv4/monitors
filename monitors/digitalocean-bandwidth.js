const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 } });

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
        const [ dropletPanel ] = await page.$$('.picker .panel-list .panel.is-droplet');
        assert.notEqual(dropletPanel, null);
        await page.evaluate(element => element.scrollIntoView(), dropletPanel);
        await dropletPanel.click();

        const updatedDroplets = await page.$$('.droplets .panel-list-vertical .panel.is-droplet');
        assert.equal(updatedDroplets.length, 2);

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
