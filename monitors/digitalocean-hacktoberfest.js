import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page';

export default () => browserPage('https://hacktoberfest.com/', async page => {
    // Check the heading is there
    const heading = await page.$eval('h2:first-of-type', e => e.textContent);
    assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Prepare to Hack');
});
