const fs = require('fs');
const path = require('path');

// Get all the monitor files
const files = fs.readdirSync(path.join(__dirname, '..', 'monitors'), { withFileTypes: true })
    .filter(item => !item.isDirectory())
    .map(item => item.name)
    .filter(item => item.endsWith('.js'))
    .map(item => item.slice(0, -3));

// Output them in JSON for actions
console.log(JSON.stringify(files));
