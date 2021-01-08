const monitorName = process.argv[2];

const getMonitor = name => require(`./monitors/${name}.js`);

const error = (msg, err) => {
    console.error(msg);
    if (err) console.error(err);
    process.exit(1);
};

const main = async () => {
    console.log(`Loading monitor ${monitorName}...`);
    let monitorFunc;
    try {
        monitorFunc = getMonitor(monitorName);
    } catch (_) {
        return error('Failed to load');
    }

    console.log(`Running monitor ${monitorName}...`);
    try {
        await monitorFunc();
    } catch (err) {
        return error('Failed to run', err);
    }

    console.log('Passed');
};

main().then(() => {}).catch(() => process.exit(1));

