import isPortReachable from 'is-port-reachable';
import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';

export default () => Promise.all([
    isPortReachable(8080, { host: 'iona.s.mattcowley.co.uk' }),
    browserPage('http://iona.s.mattcowley.co.uk:8080', async page => {
        // Check it redirects to login
        assert.equal(page.url(), 'http://iona.s.mattcowley.co.uk:8080/login');

        // Wait for the login page to load
        await page.waitForSelector('h1', { timeout: 5000 });

        // Check the login heading is there
        const heading = await page.$eval('h1', e => e.textContent);
        assert.equal(heading.trim(), 'Welcome to Grafana');

        // Check the login form is there
        const email = await page.$('input[aria-label="Username input field"]');
        assert.notEqual(email, null);
        const pswd = await page.$('input[aria-label="Password input field"]');
        assert.notEqual(pswd, null);

        // Check the login button is there
        const button = await page.$eval('button[aria-label="Login button"]', e => e.textContent);
        assert.equal(button.trim(), 'Log in');
    }),
]);
