import { strict as assert } from 'node:assert';
import { setTimeout } from 'node:timers/promises';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://www.digitalocean.com/community/tools/dns', async page => {
    // Wait for all network requests to finish
    await page.waitForNetworkIdle();

    // Check the heading is there
    const heading = await page.$eval('.do-bulma .landing h1', e => e.textContent);
    assert.equal(heading.trim(), 'DNS Lookup');

    // Click on the domain input box and type domain
    await page.focus('.do-bulma .landing .input');
    await page.keyboard.type('digitalocean.com');

    // Click the search button
    await page.click('.do-bulma .landing .button');

    // Allow the results to load
    await setTimeout(1500);

    // Check the A records title is present
    const aRecordsTitle = await page.$('.do-bulma .container #A-Records');
    assert.notEqual(aRecordsTitle, null);

    // Check results are present
    const tableRow = await page.$('.do-bulma .container .table-container tbody tr td');
    assert.notEqual(tableRow, null);
    const tableRowText = await tableRow.evaluate(e => e.textContent);
    assert.equal(tableRowText.trim(), 'digitalocean.com');
}, false, [ 'consent.trustarc.com' ]);
