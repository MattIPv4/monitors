import { strict as assert } from 'assert';
import browserPage from '../utils/browser-page';

export default () => Promise.all([
    browserPage('https://www.digitalocean.com/community', async page => {
        // Check the heading is there
        const heading = await page.$eval('h1', e => e.textContent);
        assert.equal(heading.trim(), 'Welcome to theDigitalOcean Community!');
    }),
    browserPage('https://www.digitalocean.com/community/tutorials/react-axios-react', async page => {
        // Check the image is there
        const image = await page.$('img[class*="RecordHeaderImage"]');
        assert.notEqual(image, null);
        const imageBox = await image.boundingBox();
        assert.notEqual(imageBox, null);

        // Check the heading is there
        const heading = await page.$eval('h1', e => e.textContent);
        assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'How To Use Axios with React');

        // Check the content is there
        const content = await page.$eval('div[class*="Markdown"]', e => e.textContent);
        assert(content.includes('Step 1 — Adding Axios to the Project'));
        assert(content.includes('In this step, you will use Axios with another HTTP request method called POST.'));
    }),
    browserPage('https://www.digitalocean.com/community/questions/ubuntu-16-04-creating-new-user-and-adding-ssh-keys', async page => {
        // Check the heading is there
        const heading = await page.$eval('h1', e => e.textContent);
        assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'Ubuntu 16.04 - Creating New User and Adding SSH Keys');

        // Check the question is there
        const questionContent = await page.$eval('div[class*="RecordBody"] div[class*="Markdown"]', e => e.textContent);
        assert(questionContent.includes('I am following the tutorial to add an SSL certificate to the Ubuntu 16.04 droplet'));
        assert(questionContent.includes('Any help to point me in the right direction would be great!'));

        // Check the answers are there
        const answerContent = await page.$eval('div[class*="CommentBody"] div[class*="Markdown"]', e => e.textContent);
        assert(answerContent.includes('The root user is a super user and the only real super user on the OS by default.'));
        assert(answerContent.includes('The public key only needs to exist in the file above and you shouldn’t keep your private key on the server :-).'));
    }),
    browserPage('https://www.digitalocean.com/community/tags/javascript', async page => {
        // Check the heading is there
        const heading = await page.$eval('h2', e => e.textContent);
        assert.equal(heading.trim().replace(/(\s){2,}/g, '$1'), 'JavaScript');

        // Check the description is there
        const description = await page.$eval('div[class*="TagDescription"]', e => e.textContent);
        assert.equal(description.trim().replace(/(\s){2,}/g, '$1'), 'JavaScript (also referred to as ‘javascript’ or JS) is a high-level, prototype-based, dynamic scripting language used to create interactive web pages and applications. Its flexibility and front and back-end capabilities make JavaScript a popular programming language. Some of the useful features of JavaScript include storing values in variables, performing operations on strings, and triggering or acting on events that happen in the DOM.');

        // Check the featured content is there
        const featured = await page.$('div[class*="FeatureTutorialsGrid"]');
        assert.notEqual(featured, null);
        const featuredItemsCount = await featured.$$eval(':scope > div[class*="TutorialMainCard"], :scope > div[class*="TutorialCard"]', e => e.length);
        assert(featuredItemsCount > 0);

        // Check the results are there
        const list = await page.$('[class*="TabbedHeaderListItem"] > [class*="StyledContainer"]');
        assert.notEqual(list, null);
        const listItemsCount = await list.$$eval(':scope > [class*="IndexListItem"]', e => e.length);
        assert(listItemsCount > 0);
    }),
]);
