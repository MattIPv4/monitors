const Browser = require('zombie');
Browser.localhost('botblock.org');

module.exports = () => Promise.all([
    new Promise(resolve => {
        const browser = new Browser();
        browser.visit('/', () => {
            browser.assert.text('.hero h1', 'Discord Bot Lists? We have them all.');
            resolve();
        });
    }),
    new Promise(resolve => {
        const browser = new Browser();
        browser.visit('/api/lists', () => {
            browser.assert.success();
            resolve();
        });
    }),
]);



