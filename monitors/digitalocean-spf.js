import { strict as assert } from 'node:assert';
import { setTimeout } from 'node:timers/promises';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://www.digitalocean.com/community/tools/spf', async page => {
    // Wait for all network requests to finish
    await page.waitForNetworkIdle();

    // Check the heading is there
    const heading = await page.$eval('.do-bulma .landing h1', e => e.textContent);
    assert.equal(heading.trim(), 'SPF Explainer');

    // Click on the domain input box and type domain
    await page.focus('.do-bulma .landing .input');
    await page.keyboard.type('digitalocean.com');

    // Click the search button
    await page.click('.do-bulma .landing .button');

    // Allow the results to load
    await setTimeout(1500);

    // Check results are present
    const resultsHeading = await page.$('.do-bulma .container > div > div:nth-of-type(1)');
    assert.notEqual(resultsHeading, null);
    const resultsHeadingText = await resultsHeading.evaluate(e => e.textContent);
    assert.equal(resultsHeadingText.trim(), 'SPF records for digitalocean.com:');
    const resultsDiv = await page.$('.do-bulma .container > div > div:nth-of-type(2)');
    assert.notEqual(resultsDiv, null);
}, false, [ 'consent.trustarc.com' ]);
