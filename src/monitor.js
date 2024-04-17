import { consola } from 'consola';

const formatError = (err) => {
    if (err instanceof Error) {
        return `[${err.code}] ${err.message}:\n${err.stack.split('\n').slice(1).join('\n')}`;
    }
    return `${err}`;
};

const error = (msg, err) => {
    consola.fatal(msg);

    if (err) {
        consola.error(formatError(err));
        if (err.cause) consola.error(formatError(err.cause));
    }

    process.exit(1);
};

const warn = (msg, err) => {
    consola.warn(msg);

    if (err) {
        consola.warn(formatError(err));
        if (err.cause) consola.warn(formatError(err.cause));
    }
}

// Import a monitor module
const loadMonitor = async name => {
    consola.info(`Loading monitor ${name}...`);
    try {
        const { default: monitorFunc } = await import(`../monitors/${name}.js?_=${Date.now()}`);
        consola.success('Loaded!');
        return monitorFunc;
    } catch (err) {
        return error('Failed to load', err);
    }
};

// Run a monitor module
const runMonitor = async (name) => {
    const func = await loadMonitor(name);
    consola.info(`Running monitor ${name}...`);
    await func();
    consola.success('Passed!');
};

// Import & run the monitor
const main = async () => {
    if (!process.argv || process.argv.length < 3)
        return error('Specify monitor name as argument');
    const name = process.argv[2];

    // First attempt to run the monitor
    try {
        await runMonitor(name);
        return;
    } catch (err) {
        warn('Failed to run', err);
    }

    // If that failed, wait 30s and try again
    consola.info(`Rerunning monitor ${name} in 30s...`);
    await new Promise(resolve => setTimeout(resolve, 30000));
    try {
        await runMonitor(name);
    } catch (err) {
        error('Failed to run', err);
    }
};

main().then(() => {}).catch(() => process.exit(1));
