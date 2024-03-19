import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://hacktoberfest.com/', async page => {
    // Check page title
    const year = new Date().getFullYear();
    const title = await page.title();
    assert(title.match(new RegExp(`^Hacktoberfest (${year}|${year - 1})$`)));

    // Check the navigation is there
    const [ participation ] = await page.$$('nav a:first-of-type');
    assert.notEqual(participation, null);
    const participationText = await page.evaluate(element => element.textContent.trim(), participation);
    assert.equal(participationText, 'Participation');
    const participationLink = await page.evaluate(element => element.href, participation);
    assert.equal(participationLink, 'https://hacktoberfest.com/participation/');
});
