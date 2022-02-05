const puppeteer = require('puppeteer');

module.exports = async (url, callback) => {
    const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 } });
    try {
        const page = await browser.newPage();
        const response = await page.goto(url);
        await callback(page, response);
    } finally {
        // Close the browser
        await browser.close();
    }
};
