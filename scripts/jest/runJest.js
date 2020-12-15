const spawn = require('cross-spawn');
const minimist = require('minimist');
const chalk = require('chalk');
const {existsSync} = require('fs');
const {resolve} = require('path');

const args = minimist(process.argv.slice(2));

const {_, scope, ...restArgs} = args;

if (!scope || existsSync(resolve('packages', scope, 'packages.json'))) {
    console.error(
        chalk.red('❌ ')
            + 'Specified Scope Is Unavailable Or Not Exist, [--scope]: '
            + chalk.yellow(scope)
    );
    throw new Error();
}

// Only execute the test case inside specified scope
const defaultArgs = {
    colors: true,
    env: 'jsdom',
    roots: '<rootDir>/packages/' + scope + '/test/'
};

spawn(
    'jest',
    Object.keys(Object.assign(restArgs, defaultArgs))
        .map((key) => ['--' + key, restArgs[key]])
        .reduce((acc, cur) => acc.concat(cur), []),
    {
        stdio: 'inherit'
    }
);
