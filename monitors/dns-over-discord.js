import { fetchHealth } from '../utils/fetch.js';

export default () => fetchHealth('https://dns-over-discord.v4.wtf/health');
