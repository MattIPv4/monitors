const assert = require('assert').strict;
const browserPage = require('../utils/browser-page');

const clearInput = async page => {
    await page.evaluate(() => document.execCommand('selectAll', false, null));
    await page.keyboard.press('Backspace');
};

const typeLine = async (page, text) => {
    await page.keyboard.type(text);
    await page.keyboard.press('Enter');
};

module.exports = () => browserPage('https://www.digitalocean.com/community/tools/glob', async page => {
    // Check the heading is there
    const heading = await page.$eval('.do-bulma .header h1', e => e.textContent);
    assert.equal(heading.trim(), 'Glob Tool');

    // Click on the glob string input and type a glob
    await page.focus('.do-bulma .main .input');
    await clearInput(page);
    await typeLine(page, 'hello/world.*.js');

    // Click the test strings input and type some strings
    await page.focus('.do-bulma .main .textarea');
    await clearInput(page);
    await typeLine(page, 'hello/world.umd.js');
    await typeLine(page, 'hello/world.min.js');
    await typeLine(page, 'hello/world.js');
    await typeLine(page, 'world/hello.js');
    await typeLine(page, 'world/hello.min.js');
    await typeLine(page, 'hello/world.esm.js');

    // Check the correct hits are shown
    const hits = await page.$$('.do-bulma .main .textarea .hit');
    assert.equal(hits.length, 3);

    // Check the correct misses are shown
    const misses = await page.$$('.do-bulma .main .textarea .miss');
    assert.equal(misses.length, 3);
});
