const chalk = require('chalk');

let LogPrefix = '%s';

/**
 *
 * @param severity {'FATAL'|'ERROR'|'WARN'|'INFO'}
 * @param message {string|number|boolean|object}
 * @param time {Date}
 */
module.exports = ({
    severity,
    message,
    time = new Date()
}) => {
    if (typeof message === 'object') {
        LogPrefix = '%o';
    }

    const log = console.log.bind(console, LogPrefix);

    switch (severity) {
        case 'FATAL': {
            log(chalk.bgRed(message));
            // eslint-disable-next-line no-process-exit
            process.exit(1);
            break;
        }
        case 'ERROR': {
            message = chalk.red(message);
            break;
        }
        case 'WARN': {
            message = chalk.yellow(message);
            break;
        }
        case 'INFO': {
            message = chalk.cyan(message);
            break;
        }
    }

    // eslint-disable-next-line no-process-env
    // process.env.NODE_ENV === 'development' && log(message);
    log(message);
};
