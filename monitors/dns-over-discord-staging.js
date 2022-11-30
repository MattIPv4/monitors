import { fetchHealth } from '../utils/fetch';

export default () => fetchHealth('https://dns-over-discord-staging.v4.wtf/health');
