import { fetchJson } from '../utils/fetch.js';

export default () => Promise.all([
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages'),
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages/vue'),
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages/vue/all'),
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages/vue/versions'),
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages/vue/versions/3.0.0'),
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages/vue/sris'),
    fetchJson('https://metadata.cdnjs.cloudflare.com/packages/vue/sris/3.0.0'),
]);
