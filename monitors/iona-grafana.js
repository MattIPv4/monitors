import isPortReachable from 'is-port-reachable';
import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page';

export default () => Promise.all([
    isPortReachable(8080, { host: 'iona.s.mattcowley.co.uk' }),
    browserPage('http://iona.s.mattcowley.co.uk:8080', async (page, response) => {
        // Check it redirects to login
        const chain = response.request().redirectChain();
        assert.equal(chain.length, 1);
        assert.equal(chain[0].frame().url(), 'http://iona.s.mattcowley.co.uk:8080/login');

        // Check the login heading is there
        const heading = await page.$eval('h1', e => e.textContent);
        assert.equal(heading.trim(), 'Welcome to Grafana');

        // Check the login button is there
        const button = await page.$eval('button[aria-label="Login button"]', e => e.textContent);
        assert.equal(button.trim(), 'Log in');
    }),
]);
