import { fetchHealth } from '../utils/fetch';

export default () => fetchHealth('https://dns-over-discord.v4.wtf/health');
