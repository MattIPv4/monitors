import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';
import { normalizeWhitespace } from '../utils/strings.js';

export default () => Promise.all([
    browserPage('https://nodejs.org', async (page, resp) => {
        // Check we ended up on the /en page
        assert.equal(resp.url(), 'https://nodejs.org/en');

        // Check there is a Download item in the nav
        const download = await page.$('xpath/.//nav//a[.//text()[contains(., "Download")]]');
        assert.notEqual(download, null);
        assert.ok(await download.boundingBox());
        assert.equal(await download.evaluate(e => e.getAttribute('href')), '/en/download');

        // Check the heading is there
        const heading = await page.$eval('h1', e => e.textContent);
        assert.equal(
            normalizeWhitespace(heading),
            'Run JavaScript Everywhere',
        );

        // Check the get Node.js button is there
        const get = await page.$('xpath/.//main//a[.//text()[contains(., "Get Node.js")]]');
        assert.notEqual(get, null);
        assert.ok(await get.boundingBox());
        assert.equal(await get.evaluate(e => e.getAttribute('href')), '/en/download');
    }),
    browserPage('https://nodejs.org/en/download', async page => {
        // Check that an LTS version is offered
        const version = await page.$('xpath/.//main//button[@aria-label[contains(., "Version")]]');
        assert.notEqual(version, null);
        assert.ok(await version.boundingBox());
        const text = await version.evaluate(e => e.textContent).then(normalizeWhitespace);
        assert.match(text, /v\d+\.\d+\.\d+ \(LTS\)/);
    }),
    browserPage('https://nodejs.org/en/download/current', async page => {
        // Check that a Current version is offered
        const version = await page.$('xpath/.//main//button[@aria-label[contains(., "Version")]]');
        assert.notEqual(version, null);
        assert.ok(await version.boundingBox());
        const text = await version.evaluate(e => e.textContent).then(normalizeWhitespace);
        assert.match(text, /v\d+\.\d+\.\d+ \(Current\)/);
    }),
]);
