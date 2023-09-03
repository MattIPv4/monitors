import { strict as assert } from 'node:assert';
import { fetchRss } from '../utils/fetch';

const checkRss = async url => {
    const data = await fetchRss(url);

    // Validate we have RSS entries
    assert(Array.isArray(data?.entries));
    assert(data.entries.length > 0);

    // Validate each entry has valid data
    for (const entry of data.entries) {
        assert(typeof entry.title === 'string');
        assert(typeof entry.published === 'string');
        assert(typeof entry.link === 'string');
        assert(typeof entry.description === 'string');

        // Check the link doesn't have any undefined segments
        assert(entry.link.split('/').every(s => s !== 'undefined'), `Expected valid link, got ${JSON.stringify(entry)}`);
    }

    // Validate the first entry is newer than the last
    const first = new Date(data.entries[0].published);
    const last = new Date(data.entries[data.entries.length - 1].published);
    assert(first > last);
}

export default () => Promise.all([
    checkRss('https://www.digitalocean.com/blog/rss'),
    checkRss('https://www.digitalocean.com/community/tutorials/feed'),
    checkRss('https://www.digitalocean.com/community/questions/feed'),
    checkRss('https://www.digitalocean.com/community/tools/feed'),
    checkRss('https://www.digitalocean.com/community/tags/development.atom'),
]);
