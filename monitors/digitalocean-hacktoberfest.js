import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page';

export default () => browserPage('https://hacktoberfest.com/', async page => {
    // Check the heading is there
    const heading = await page.$eval('h1:first-of-type', e => e.textContent);
    assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Celebrate our 10th year supporting open source!');
});
