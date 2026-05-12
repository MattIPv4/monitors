import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';
import { fetchHealth } from '../utils/fetch.js';

const clickButton = async (page, button, urls) => {
    // Find the button
    const [ elm ] = await page.$$(`xpath/.//header//a[contains(text(), "${button}")]`)
        .then(elms => Promise.all(elms.map(async elm => {
            const visible = await elm.isVisible();
            if (visible) return elm;
        }))
        .then(elms => elms.filter(elm => elm !== undefined)));
    assert.notEqual(elm, undefined);

    // Click the button and wait for navigation to one of the allowed URLs
    await Promise.all([
        page.waitForFunction(urls => urls.includes(window.location.href), { timeout: 15000 }, urls),
        elm.click(),
    ]);

    // Check we made it to the expected destination URL
    const currentUrl = page.url();
    assert.ok(urls.includes(currentUrl), `Unexpected destination URL: ${currentUrl}`);
};

const checkLogIn = async page => {
    await clickButton(page, 'Log in', [
        'https://cloud.digitalocean.com/login',
        'https://cloud.digitalocean.com/graphql/public/test?challenge=/login',
    ]);
};

const checkSignUp = async page => {
    await clickButton(page, 'Sign up', [
        'https://cloud.digitalocean.com/registrations/new',
        'https://cloud.digitalocean.com/graphql/public/test?challenge=/registrations/new',
    ]);
};

export default () => Promise.all([
    fetchHealth('https://www.digitalocean.com/health', {}, /^(# OK|(<html><body>)?<h1>200 OK<\/h1>Service ready.(<\/body><\/html>)?)$/),
    browserPage('https://www.digitalocean.com/', checkLogIn, false, [ 'consent.trustarc.com', 'cdn.amplitude.com' ]),
    browserPage('https://www.digitalocean.com/', checkSignUp, false, [ 'consent.trustarc.com', 'cdn.amplitude.com' ]),
]);
