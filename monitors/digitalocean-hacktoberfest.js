import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://hacktoberfest.com/', async page => {
    // Check page title
    const year = new Date().getFullYear();
    const title = await page.title();
    assert(title.match(new RegExp(`^Hacktoberfest (${year}|${year - 1})$`)));
});
