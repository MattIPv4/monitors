import { strict as assert } from 'node:assert';
import { fetchHealth } from '../utils/fetch.js';
import browserPage from '../utils/browser-page.js';

const checkLogIn = async page => {
    // Find the navbar login button
    const [ logIn ] = await page.$$('xpath/.//header//a[contains(text(), "Log in")]')
        .then(buttons => Promise.all(buttons.map(async button => {
            const visible = await button.isVisible();
            if (visible) return button;
        }))
        .then(buttons => buttons.filter(button => button !== undefined)));
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
    const [ signUp ] = await page.$$('xpath/.//header//a[contains(text(), "Sign up")]')
        .then(buttons => Promise.all(buttons.map(async button => {
            const visible = await button.isVisible();
            if (visible) return button;
        }))
        .then(buttons => buttons.filter(button => button !== undefined)));
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
    fetchHealth('https://www.digitalocean.com/health')
        .catch(() => fetchHealth('https://www.digitalocean.com/health', {}, '<html><body><h1>200 OK</h1>Service ready.</body></html>')),
    fetchHealth('https://www.digitalocean.com/metrics', {}, '# OK'),
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
        const hamburger = await page.$('header button[aria-label="Menu"]');
        assert.notEqual(hamburger, null);

        // Click the menu hamburger button
        await hamburger.click();

        // Check for the sign in button
        await checkSignUp(page);
    }, true, [ 'consent.trustarc.com' ]),
]);
