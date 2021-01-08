const puppeteer = require('puppeteer');
const assert = require('assert').strict;
const fetch = require('node-fetch');

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
    (async () => {
        const res = await fetch('https://botblock.org/api/lists');
        if (!res.ok) throw new Error(`HTTP request failed: ${res.status} ${res.statusText}`);

        const data = await res.json();
        if (data === null || typeof data !== 'object')
            throw new Error(`Unexpected endpoint response: ${JSON.stringify(data)}`);
    })(),
]);
