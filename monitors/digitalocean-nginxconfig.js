import { strict as assert } from 'node:assert';
import { setTimeout } from 'node:timers/promises';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://www.digitalocean.com/community/tools/nginx', async page => {
    // Wait for all network requests to finish
    await page.waitForNetworkIdle();

    // Check the heading is there
    const heading = await page.$eval('.header h1', e => e.textContent);
    assert.equal(heading.trim(), 'NGINXConfig');

    // Check a button in the tool works
    const [ button ] = await page.$$('xpath/.//a[contains(text(), "Routing")]');
    assert.notEqual(button, undefined);
    await page.evaluate(element => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), button);
    await setTimeout(500);
    await button.click();

    // Look for the routing content and check its now visible
    const [ label ] = await page.$$('xpath/.//label[contains(text(), "Fallback routing")]');
    assert.notEqual(label, undefined);
    const labelBox = await label.boundingBox();
    assert.notEqual(labelBox, null);
}, false, [ 'consent.trustarc.com' ]);
