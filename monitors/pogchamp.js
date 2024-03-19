import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://pogchamp.today/', async page => {
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
});
