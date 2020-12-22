const spawn = require('cross-spawn');
const minimist = require('minimist');
const {existsSync} = require('fs');
const {resolve} = require('path');
const log = require('../utils/log');

const args = minimist(process.argv.slice(2));

const {_, scope, ...restArgs} = args;

if (!scope || existsSync(resolve('packages', scope, 'packages.json'))) {
    log({
        severity: 'FATAL',
        message: '请使用--scope指定至少一个需要运行测试用例的package(s)'
    });
}

const defaultArgs = {
    colors: true,
    env: 'jsdom',
    roots: '<rootDir>/packages/' + scope + '/__tests__/'
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
