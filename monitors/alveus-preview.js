import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page';

export default () => browserPage('https://preview.alveus.gg', async page => {
    // Check the heading is there
    const heading = await page.$eval('h1', e => e.textContent);
    assert(heading.trim().replace(/(\s){2,}/g, '$1').includes('Educating the World from the Web'));
});
