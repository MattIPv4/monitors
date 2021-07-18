const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();
        await page.goto('https://www.digitalocean.com/community/pages/hub-for-good-projects');

        // Check the initial projects rendered
        const [ allProjects ] = await page.$x('//div[contains(concat(" ", normalize-space(@class), " "), "hub-for-good-list")]//*[starts-with(normalize-space(text()), "All projects")]');
        assert.notEqual(allProjects, null);
        const allProjectsText = await page.evaluate(element => element.textContent.trim(), allProjects);
        const initialProjects = await page.$$('.hub-for-good-list table tbody tr');
        assert.equal(initialProjects.length, Number(allProjectsText.match(/^All projects \(([\d,.]+)\)$/)[1]));

        // Interact to open the category selector
        const [ categorySelect ] = await page.$$('.hub-for-good-list [role="combobox"]');
        assert.notEqual(categorySelect, null);
        await page.evaluate(element => element.scrollIntoView(), categorySelect);
        await categorySelect.click();
        await new Promise(resolve => setTimeout(resolve, 500));

        // Interact to change the category
        const [ otherPurposes ] = await page.$x('//div[contains(concat(" ", normalize-space(@class), " "), "hub-for-good-list")]//*[@role="listbox"]//*[starts-with(normalize-space(text()), "Other purposes")]');
        assert.notEqual(otherPurposes, null);
        await page.evaluate(element => element.scrollIntoView(), otherPurposes);
        await otherPurposes.click();
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check it updated the rendered projects
        const otherPurposesText = await page.evaluate(element => element.textContent.trim(), otherPurposes);
        const updatedProjects = await page.$$('.hub-for-good-list table tbody tr');
        assert.equal(updatedProjects.length, Number(otherPurposesText.match(/^Other purposes \(([\d,.]+)\)$/)[1]));

    } catch (e) {
        // Close the browser before error-ing
        await browser.close();

        // Re-throw error
        throw e;
    }

    // Tests passed, close browser
    await browser.close();
};
