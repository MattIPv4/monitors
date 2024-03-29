import { fetchJson } from '../fetch.js';

export default (host, lib = 'vue') => Promise.all([
    fetchJson(`https://${host}/libraries`),
    fetchJson(`https://${host}/libraries/${lib}`)
        .then(({ version }) => fetchJson(`https://${host}/libraries/${lib}/${version}`)),
]);
