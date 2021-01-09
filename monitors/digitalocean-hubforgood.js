const puppeteer = require('puppeteer');
const assert = require('assert').strict;

module.exports = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.digitalocean.com/community/pages/hub-for-good-projects');

    // Check the initial projects rendered
    const [ allProjects ] = await page.$x('//div[contains(concat(" ", normalize-space(@class), " "), "hub-for-good-list")]//*[starts-with(normalize-space(text()), "All projects")]');
    assert.notEqual(allProjects, null);
    const allProjectsText = await page.evaluate(element => element.textContent.trim(), allProjects);
    const initialProjects = await page.$$('.hub-for-good-list table tbody tr');
    assert.equal(initialProjects.length, Number(allProjectsText.match(/^All projects \(([\d,.]+)\)$/)[1]));

    // Check interactivity with updating category
    await page.click('.hub-for-good-list [role="combobox"]');
    const [ otherPurposes ] = await page.$x('//div[contains(concat(" ", normalize-space(@class), " "), "hub-for-good-list")]//*[@role="listbox"]//*[starts-with(normalize-space(text()), "Other purposes")]');
    assert.notEqual(otherPurposes, null);
    await otherPurposes.click();
    await new Promise(resolve => setTimeout(resolve, 250));
    await otherPurposes.click();

    // Check it updated the rendered projects
    const otherPurposesText = await page.evaluate(element => element.textContent.trim(), otherPurposes);
    const updatedProjects = await page.$$('.hub-for-good-list table tbody tr');
    assert.equal(updatedProjects.length, Number(otherPurposesText.match(/^Other purposes \(([\d,.]+)\)$/)[1]));

    await browser.close();
};
