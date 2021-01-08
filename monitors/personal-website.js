const Browser = require('zombie');
Browser.localhost('mattcowley.co.uk');

module.exports = () => new Promise(resolve => {
    const browser = new Browser();
    browser.visit('/', () => {
        browser.assert.text('.content h1', 'Matt (IPv4) Cowley');
        resolve();
    });
});
