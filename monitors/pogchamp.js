const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = () => Promise.all([
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://pogchamp.today/');

        try {
            // Check the heading is there
            const heading = await page.$eval('#title', e => e.textContent);
            assert.equal(heading.trim(), 'YournewPogChampis...');

            // Wait for the animation to do its thing
            await new Promise(resolve => setTimeout(resolve, 10000));

            // Try to find the final title, check its contents and visible
            const finalHeading = await page.$('#content h1');
            assert.notEqual(finalHeading, null);
            const finalHeadingBox = await finalHeading.boundingBox();
            assert.notEqual(finalHeadingBox, null);
            const finalHeadingText = await page.evaluate(e => e.textContent, finalHeading);
            assert.equal(finalHeadingText.trim(), 'YournewPogChampis...');

            // Try to find the final pog image, check its contents and visible
            const finalImg = await page.$('#content img');
            assert.notEqual(finalImg, null);
            const finalImgBox = await finalImg.boundingBox();
            assert.notEqual(finalImgBox, null);
            const finalImgSrc = await page.evaluate(e => e.getAttribute('src'), finalImg);
            assert(finalImgSrc.startsWith('https://static-cdn.jtvnw.net/emoticons/v2/'));

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
