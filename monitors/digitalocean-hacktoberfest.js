const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto('https://hacktoberfest.digitalocean.com/');

        // Check the heading is there
        // const heading = await page.$eval('p:first-of-type', e => e.textContent);
        // assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Open source is changing the world – one contribution at a time.');

        // Check the blog link is there
        const blogLink = await page.$('a[href="https://www.digitalocean.com/blog/hacktoberfest-2021-recap/"]');
        assert.notEqual(blogLink, null);

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
