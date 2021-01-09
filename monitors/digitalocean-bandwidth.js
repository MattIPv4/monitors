const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();
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

    await browser.close();
};
