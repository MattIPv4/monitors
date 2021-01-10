const consola = require('consola');

// Show any error and then exit
const error = (msg, err) => {
    consola.fatal(msg);
    if (err) consola.error(err);
    process.exit(1);
};

// Import a monitor module
const loadMonitor = name => {
    consola.info(`Loading monitor ${name}...`);
    try {
        const monitorFunc = require(`../monitors/${name}.js`);
        consola.success('Loaded!');
        return monitorFunc;
    } catch (err) {
        return error('Failed to load', err);
    }
};

// Run a monitor module
const runMonitor = async (name, func) => {
    consola.info(`Running monitor ${name}...`);
    try {
        await func();
        consola.success('Passed!');
        return;
    } catch (err) {
        consola.warn('Failed to run');
        consola.warn(err);
    }

    consola.info(`Rerunning monitor ${name}...`);
    try {
        await func();
        consola.success('Passed!');
    } catch (err) {
        return error('Failed to run', err);
    }
};

// Import & run the monitor
const main = async () => {
    if (!process.argv || process.argv.length < 3)
        return error('Specify monitor name as argument');

    const monitorName = process.argv[2];
    const monitorFunc = loadMonitor(monitorName);
    await runMonitor(monitorName, monitorFunc);
};

main().then(() => {}).catch(() => process.exit(1));

