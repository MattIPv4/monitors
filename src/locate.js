import fs from 'node:fs';
import { URL } from 'node:url';

// Get all the monitor files
const files = fs.readdirSync(new URL('../monitors', import.meta.url), { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => item.name)
    .filter(item => item.endsWith('.js'))
    .map(item => item.slice(0, -3));

// Output them in JSON for actions
console.log(JSON.stringify(files));
