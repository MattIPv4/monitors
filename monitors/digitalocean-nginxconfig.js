import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page';

export default () => browserPage('https://www.digitalocean.com/community/tools/nginx', async page => {
    // Check the heading is there
    const heading = await page.$eval('.header h1', e => e.textContent);
    assert.equal(heading.trim(), 'NGINXConfig');

    // Check a button in the tool works
    const [ button ] = await page.$x('//a[contains(text(), "Routing")]');
    assert.notEqual(button, undefined);
    await page.evaluate(element => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), button);
    await page.waitForTimeout(500);
    await button.click();

    // Look for the routing content and check its now visible
    const [ label ] = await page.$x('//label[contains(text(), "Fallback routing")]');
    assert.notEqual(label, undefined);
    const labelBox = await label.boundingBox();
    assert.notEqual(labelBox, null);
}, false, [ 'consent.trustarc.com' ]);
