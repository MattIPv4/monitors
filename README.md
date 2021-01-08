# monitors

## About

Uptime monitoring (or really any monitoring that can throw an error) through Node.js & GitHub Actions.

Add files to the [`monitors`](monitors) directory and they'll be run every 15 minutes by GitHub Actions.
Any monitor that throws an error will fail and will be reported as a failed job in Actions.

The GitHub Actions workflow has two defined steps, though the second is dynamic and dictated by the output of the first.

The first workflow, called `locate`, establishes two real outputs -- the Node.js version to use (set in [`.nvmrc`](.nvmrc)) and the set of monitors to run as jobs (the files in [`monitors`](monitors)).
It also does a full install of Node.js and our dependencies itself, with the Cache action running, so that the latest version of our dependencies are cached before the monitors all run.

The script that locates the monitors and outputs them in a JSON format for the Actions workflow is [`src/locate.js`](src/locate.js).

The second job, `monitor`, is then run once for every monitor in the matrix output of the `locate` job.
This job uses the set Node.js version from the `locate` job as well, installing the cached NPM dependencies and running the monitor from the matrix.

The script that runs the specified monitor in the Actions job is [`src/monitor.js`](src/monitor.js).
This script will locate and execute the given monitor, outputting if it passed or failed, along with the appropriate exit code.

## License

This project is licensed under [Apache 2.0](LICENSE).
