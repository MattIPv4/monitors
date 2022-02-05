import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page';

export default () => browserPage('https://hacktoberfest.digitalocean.com/', async page => {
    // Check the heading is there
    // const heading = await page.$eval('p:first-of-type', e => e.textContent);
    // assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Open source is changing the world – one contribution at a time.');

    // Check the blog link is there
    const blogLink = await page.$('a[href="https://www.digitalocean.com/blog/hacktoberfest-2021-recap/"]');
    assert.notEqual(blogLink, null);
});
