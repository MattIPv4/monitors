import { strict as assert } from 'node:assert';
import browserPage from '../utils/browser-page.js';
import { normalizeWhitespace } from '../utils/strings.js';

export default () => Promise.all([
    browserPage('https://www.digitalocean.com/community', async page => {
        // Check the heading is there
        const headingNode = await page.waitForSelector('h1');
        const headingContent = await headingNode.evaluate(e => e.textContent);
        assert.equal(
            normalizeWhitespace(headingContent),
            'Explore the latest from DigitalOcean\'s community and learning materials.',
        );
    }),
    browserPage('https://www.digitalocean.com/community/tutorials/react-axios-react', async page => {
        // Check the heading is there
        const headingNode = await page.waitForSelector('h1');
        const headingContent = await headingNode.evaluate(e => e.textContent);
        assert.equal(normalizeWhitespace(headingContent), 'How To Use Axios with React');

        // Check the image is there
        const image = await page.$('img[alt="How To Use Axios with React"]');
        assert.notEqual(image, null);
        const imageBox = await image.boundingBox();
        assert.notEqual(imageBox, null);

        // Check the content is there
        const content = await page.$eval('div[class*="TutorialContent"] div[class*="Markdown"]', e => e.textContent);
        assert(content.includes('Step 1 — Adding Axios to the Project'));
        assert(content.includes('In this step, you will use Axios with another HTTP request method called POST.'));
    }),
    browserPage('https://www.digitalocean.com/community/questions/ubuntu-16-04-creating-new-user-and-adding-ssh-keys', async page => {
        // Check the heading is there
        const headingNode = await page.waitForSelector('h1');
        const headingContent = await headingNode.evaluate(e => e.textContent);
        assert.equal(normalizeWhitespace(headingContent), 'Ubuntu 16.04 - Creating New User and Adding SSH Keys');

        // Check the question is there
        const questionContent = await page.$eval('h1 ~ div[class*="Markdown"]', e => e.textContent);
        assert(questionContent.includes('I am following the tutorial to add an SSL certificate to the Ubuntu 16.04 droplet'));
        assert(questionContent.includes('Any help to point me in the right direction would be great!'));

        // Check the answers are there
        const answerNode = await page.waitForSelector('div[class*="CommentBody"] div[class*="Markdown"]');
        const answerContent = await answerNode.evaluate(e => e.textContent);
        assert(answerContent.includes('The root user is a super user and the only real super user on the OS by default.'));
        assert(answerContent.includes('The public key only needs to exist in the file above and you shouldn’t keep your private key on the server :-).'));
    }),
]);
