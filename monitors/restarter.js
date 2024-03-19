import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';

export default () => Promise.all([
    browserPage('https://restarter.mattcowley.co.uk', async page => {
        // Check the heading is there
        const headingHomepage = await page.$eval('.content h1', e => e.textContent);
        assert.equal(headingHomepage.trim(), 'Restarter');
    }),
    browserPage('https://restarter.mattcowley.co.uk/docs/', async page => {
        // Check the docs heading is there
        const headingDocs = await page.$eval('.content h1', e => e.textContent);
        assert.equal(headingDocs.trim(), 'Restarter Docs');
    }),
]);
