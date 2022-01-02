const isPortReachable = require('is-port-reachable');
const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = () => Promise.all([
    isPortReachable(8080, { host: 'iona.s.mattcowley.co.uk' }),
    (async () => {
        const browser = await puppeteer.launch();

        try {
            const page = await browser.newPage();

            // Check it redirects to login
            const response = await page.goto('http://iona.s.mattcowley.co.uk:8080');
            const chain = response.request().redirectChain();
            assert.equal(chain.length, 1);
            assert.equal(chain[0].frame().url(), 'http://iona.s.mattcowley.co.uk:8080/login');

            // Check the login heading is there
            const heading = await page.$eval('h1', e => e.textContent);
            assert.equal(heading.trim(), 'Welcome to Grafana');

            // Check the login button is there
            const button = await page.$eval('button[aria-label="Login button"]', e => e.textContent);
            assert.equal(button.trim(), 'Log in');

        } catch (e) {
            // Close the browser before error-ing
            await browser.close();

            // Re-throw error
            throw e;
        }

        // Tests passed, close browser
        await browser.close();
    })(),
]);
