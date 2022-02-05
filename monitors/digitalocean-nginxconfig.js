const assert = require('assert').strict;
const browserPage = require('../utils/browser-page');

module.exports = () => browserPage('https://www.digitalocean.com/community/tools/nginx', async page => {
    // Check the heading is there
    const heading = await page.$eval('.header h1', e => e.textContent);
    assert.equal(heading.trim(), 'NGINXConfig');

    // Check a button in the tool works
    const [ button ] = await page.$x('//a[contains(text(), "Routing")]');
    assert.notEqual(button, null);
    await page.evaluate(element => element.scrollIntoView(), button);
    await page.waitForTimeout(500);
    await button.click();

    // Look for the routing content and check its now visible
    const [ label ] = await page.$x('//label[contains(text(), "Fallback routing")]');
    assert.notEqual(label, null);
    const labelBox = await label.boundingBox();
    assert.notEqual(labelBox, null);
});
