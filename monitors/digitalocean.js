import { strict as assert } from 'assert';
import fetchHealth from '../utils/fetch-health';
import browserPage from '../utils/browser-page';

export default () => Promise.all([
    fetchHealth('https://www.digitalocean.com/health', '<html><body><h1>200 OK</h1>Service ready.</body></html>'),
    fetchHealth('https://www.digitalocean.com/metrics', '# OK'),
    browserPage('https://www.digitalocean.com/', async page => {
        // Find the navbar log in button
        const [ logIn ] = await page.$x('//nav//a//*[contains(text(), "Log In")]//parent::a');
        assert.notEqual(logIn, undefined);

        // Click the log in button
        const [ response ] = await Promise.all([
            page.waitForNavigation(),
            logIn.click(),
        ]);

        // Check we're now on the login page
        assert.equal(response.url(), 'https://cloud.digitalocean.com/login');
    }),
    browserPage('https://www.digitalocean.com/', async page => {
        // Find the navbar sign up button
        const [ signUp ] = await page.$x('//nav//a//*[contains(text(), "Sign Up")]//parent::a');
        assert.notEqual(signUp, undefined);

        // Click the sign up button
        const [ response ] = await Promise.all([
            page.waitForNavigation(),
            signUp.click(),
        ]);

        // Check we're now on the sign up page
        assert.equal(response.url(), 'https://cloud.digitalocean.com/registrations/new');
    }),
]);
