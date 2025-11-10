import { fetchHealth } from '../utils/fetch.js';

export default () => fetchHealth('https://jinglebot-staging.v4.wtf/health');
