import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page';

export default () => browserPage('https://mattcowley.co.uk', async page => {
    // Check the heading is there
    const heading = await page.$eval('.content h1', e => e.textContent);
    assert(heading.trim().replace(/(\s){2,}/g, '$1').includes('Matt Cowley'));
});
