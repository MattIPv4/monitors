import { strict as assert } from 'assert';
import fetchHealth from '../utils/fetch-health';
import browserPage from '../utils/browser-page';

const checkLogIn = async page => {
    // Find the navbar login button
    const [ logIn ] = await page.$x('//nav//ul[not(@aria-label="Main")]//a[contains(text(), "Log in")]');
    assert.notEqual(logIn, undefined);

    // Click the login button
    const [ response ] = await Promise.all([
        page.waitForNavigation(),
        logIn.click(),
    ]);

    // Check we're now on the login page
    try {
        assert.equal(response.url(), 'https://cloud.digitalocean.com/login');
    } catch (e) {
        // Or check we're on the captcha page
        try {
            assert.equal(response.url(), 'https://cloud.digitalocean.com/graphql/public/test?challenge=/login');
        } catch {
            // Throw the original error
            throw e;
        }
    }
};

const checkSignUp = async page => {
    // Find the navbar sign up button
    const [ signUp ] = await page.$x('//nav//ul[not(@aria-label="Main")]//a[contains(text(), "Sign up")]');
    assert.notEqual(signUp, undefined);

    // Click the sign up button
    const [ response ] = await Promise.all([
        page.waitForNavigation(),
        signUp.click(),
    ]);

    // Check we're now on the sign up page
    try {
        assert.equal(response.url(), 'https://cloud.digitalocean.com/registrations/new');
    } catch (e) {
        // Or check we're on the captcha page
        try {
            assert.equal(response.url(), 'https://cloud.digitalocean.com/graphql/public/test?challenge=/registrations/new');
        } catch {
            // Throw the original error
            throw e;
        }
    }
};

export default () => Promise.all([
    fetchHealth('https://www.digitalocean.com/health', '<html><body><h1>200 OK</h1>Service ready.</body></html>'),
    fetchHealth('https://www.digitalocean.com/metrics', '# OK'),
    browserPage('https://www.digitalocean.com/', checkLogIn, false, [ 'consent.trustarc.com' ]),
    browserPage('https://www.digitalocean.com/', checkSignUp, false, [ 'consent.trustarc.com' ]),
    browserPage('https://www.digitalocean.com/', async page => {
        // Find the menu hamburger button
        const hamburger = await page.$('button[aria-label="Menu"]');
        assert.notEqual(hamburger, null);

        // Click the menu hamburger button
        await hamburger.click();

        // Check for the login button
        await checkLogIn(page);
    }, true, [ 'consent.trustarc.com' ]),
    browserPage('https://www.digitalocean.com/', async page => {
        // Find the menu hamburger button
        const hamburger = await page.$('button[aria-label="Menu"]');
        assert.notEqual(hamburger, null);

        // Click the menu hamburger button
        await hamburger.click();

        // Check for the sign in button
        await checkSignUp(page);
    }, true, [ 'consent.trustarc.com' ]),
]);
