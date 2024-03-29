import { strict as assert } from 'node:assert';
import { fetchJson } from './fetch.js';
import browserPage from './browser-page.js';

export default host => Promise.all([
    browserPage(`https://${host}/`, async page => {
        // Check the heading is there
        const headingH1 = await page.$eval('.headline h1', e => e.textContent);
        assert.equal(headingH1.trim(), 'BotBlock.org');
        const headingP = await page.$eval('.headline p', e => e.textContent);
        assert.equal(headingP.trim(), 'The single source for all Discord bot lists.');
    }),
    fetchJson(`https://${host}/api/lists`),
]);
