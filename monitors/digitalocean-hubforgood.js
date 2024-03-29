import { strict as assert } from 'node:assert';
import { setTimeout } from 'node:timers/promises';
import browserPage from '../utils/browser-page.js';

export default () => browserPage('https://do-community.github.io/hub-for-good-list/', async page => {
    // Check the initial projects rendered
    const [ allProjects ] = await page.$$('xpath/.//div[contains(concat(" ", normalize-space(@class), " "), " hub-for-good-list ")]//*[text()[starts-with(normalize-space(.), "All projects")]]');
    assert.notEqual(allProjects, undefined);
    const allProjectsText = await page.evaluate(element => element.textContent.trim(), allProjects);
    const initialProjects = await page.$$('.hub-for-good-list table tbody tr');
    assert.equal(initialProjects.length, Number(allProjectsText.match(/^All projects \(([\d,.]+)\)$/)[1].replace(/,/g, '')));

    // Interact to open the category selector
    const [ categorySelect ] = await page.$$('.hub-for-good-list [role="combobox"]');
    assert.notEqual(categorySelect, null);
    await page.evaluate(element => element.scrollIntoView({ block: 'center' }), categorySelect);
    await setTimeout(500);
    await categorySelect.click();

    // Interact to change the category
    const [ otherPurposes ] = await page.$$('xpath/.//div[contains(concat(" ", normalize-space(@class), " "), " hub-for-good-list ")]//*[@role="listbox"]//*[text()[starts-with(normalize-space(.), "Other purposes")]]');
    assert.notEqual(otherPurposes, undefined);
    await page.evaluate(element => element.scrollIntoView({ block: 'center' }), otherPurposes);
    await setTimeout(500);
    await otherPurposes.click();

    // Check it updated the rendered projects
    const otherPurposesText = await page.evaluate(element => element.textContent.trim(), otherPurposes);
    const updatedProjects = await page.$$('.hub-for-good-list table tbody tr');
    assert.equal(updatedProjects.length, Number(otherPurposesText.match(/^Other purposes \(([\d,.]+)\)$/)[1]));
}, false, [ 'consent.trustarc.com' ]);
