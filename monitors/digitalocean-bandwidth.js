import { strict as assert } from 'node:assert';
import { setTimeout } from 'node:timers/promises';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://www.digitalocean.com/community/tools/bandwidth', async page => {
    // Wait for all network requests to finish
    await page.waitForNetworkIdle();

    // Check the heading is there
    const heading = await page.$eval('.bandwidth h1', e => e.textContent);
    assert.equal(heading.trim(), 'Bandwidth Calculator');

    // Check the default Droplet is present
    const initialDroplet = await page.$$('.droplets .panel-list-vertical .panel.is-droplet');
    assert.equal(initialDroplet.length, 1);

    // Find a new Droplet to add
    const [ dropletPanel ] = await page.$$('.picker .panel-list .panel.is-droplet');
    assert.notEqual(dropletPanel, null);
    await page.evaluate(element => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), dropletPanel);
    await setTimeout(500);

    // Add the Droplet
    await dropletPanel.click();
    const updatedDroplets = await page.$$('.droplets .panel-list-vertical .panel.is-droplet');
    assert.equal(updatedDroplets.length, 2);
}, false, [ 'consent.trustarc.com' ]);
