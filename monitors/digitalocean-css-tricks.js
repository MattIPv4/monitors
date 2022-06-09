import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://css-tricks.com', async page => {
    // Check the logo text is there
    const logoText = await page.$eval('.logo .screen-reader-text', e => e.textContent);
    assert.equal(logoText.trim(), 'CSS-Tricks');

    // Check the popular articles section is present
    const popularText = await page.$eval('.popular-articles h2', e => e.textContent);
    assert.equal(popularText.trim().replace(/(\s){2,}/g, '$1'), 'Popular this month');
    const popularGrid = await page.$('.popular-articles .mini-card-grid');
    assert.notEqual(popularGrid, null);
    const popularItemsCount = await popularGrid.$$eval(':scope > article', e => e.length);
    assert(popularItemsCount > 0);
});
