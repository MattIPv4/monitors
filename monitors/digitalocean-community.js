const fetchHealth = require('../utils/fetch-health');
const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = () => Promise.all([
    fetchHealth('https://www.digitalocean.com/community/health'),
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.digitalocean.com/community');

        try {
            // Check the heading is there
            const heading = await page.$eval('.hero h2', e => e.textContent);
            assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Developers supporting developers');

        } catch (e) {
            // Close the browser before error-ing
            await browser.close();

            // Re-throw error
            throw e;
        }

        // Tests passed, close browser
        await browser.close();
    })(),
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.digitalocean.com/community/tutorials/react-axios-react');

        try {
            // Check the image is there
            const image = await page.$('.tutorial-image');
            assert.notEqual(image, null);
            const imageBox = await image.boundingBox();
            assert.notEqual(imageBox, null);

            // Check the heading is there
            const heading = await page.$eval('.tutorial-header h1.content-title', e => e.textContent);
            assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'How To Use Axios with React');

            // Check the content is there
            const content = await page.$eval('.content-body.tutorial-content', e => e.textContent);
            assert(content.includes('Step 1 — Adding Axios to the Project'));
            assert(content.includes('In this step, you will use Axios with another HTTP request method called POST.'));

        } catch (e) {
            // Close the browser before error-ing
            await browser.close();

            // Re-throw error
            throw e;
        }

        // Tests passed, close browser
        await browser.close();
    })(),
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.digitalocean.com/community/questions/ubuntu-16-04-creating-new-user-and-adding-ssh-keys');

        try {
            // Check the heading is there
            const heading = await page.$eval('.question-header h1.content-title', e => e.textContent);
            assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Ubuntu 16.04 - Creating New User and Adding SSH Keys');

            // Check the question is there
            const questionContent = await page.$eval('.content-body.question-content', e => e.textContent);
            assert(questionContent.includes('I am following the tutorial to add an SSL certificate to the Ubuntu 16.04 droplet'));
            assert(questionContent.includes('Any help to point me in the right direction would be great!'));

            // Check the answers are there
            const answerContent = await page.$eval('.answer-body-container .content-body', e => e.textContent);
            assert(answerContent.includes('The root user is a super user and the only real super user on the OS by default.'));
            assert(answerContent.includes('The public key only needs to exist in the file above and you shouldn’t keep your private key on the server :-).'));

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
