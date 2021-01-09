const puppeteer = require('puppeteer');
const assert = require('assert').strict;
const fetchJson = require('../utils/fetch-json');

module.exports = () => Promise.all([
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://botblock.org');

        // Check the heading is there
        const heading = await page.$eval('.hero h1', e => e.textContent);
        assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Discord Bot Lists? We have them all.');

        await browser.close();
    })(),
    fetchJson('https://botblock.org/api/lists'),
]);
