import { fetchHealth } from '../utils/fetch.js';

export default () => fetchHealth('https://dns-over-discord-staging.v4.wtf/health');
