'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const minimist = require('minimist');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const sucrase = require('@rollup/plugin-sucrase');
const ts = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const alias = require('@rollup/plugin-alias');

const cwd = process.cwd();
const { version, workspaces } = require('../../package.json');
const envs = minimist(process.argv.slice(2), {
  default: { scope: '', ignore: '' },
});

const isProduction = envs.production;
const isDevelopment = envs.development;
const shouldUseSourcemaps = envs.sourcemaps || envs.development;

function getCUPs() {
  return os.cpus().length;
}

function splitScope(scope) {
  if (scope === '') return null;
  const scopes = scope.split(',');
  if (scopes.length > 1) {
    return scopes;
  }
  return [scope];
}

function matchPackageName(scopes, packageName, placeholder) {
  if (scopes === null) return placeholder;
  const name = packageName.split('/')[1];
  return scopes.includes(name);
}

function readJSON(jsonFilePath) {
  try {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString('utf-8'));
  } catch (e) {
    throw e;
  }
}

function batchPackages(packages) {
  return packages.map((pack) => {
    return {
      name: pack,
      pkg: readJSON(path.resolve(process.cwd(), pack, 'package.json')),
    };
  });
}

function getSortedPackages(scope, ignore) {
  const scopes = splitScope(scope);
  const ignores = splitScope(ignore);
  const packages = workspaces
    .map((globExpression) => glob.sync(globExpression))
    .reduce((arr, cur) => arr.concat(cur), [])
    .filter(
      (packageName) =>
        matchPackageName(scopes, packageName, true) &&
        !matchPackageName(ignores, packageName, false),
    );

  return batchPackages(packages);
}

function main() {
  const { scope, ignore } = envs;
  const packages = getSortedPackages(scope, ignore);

  const plugins = [
    json(),
    commonjs({}),
    sucrase({ transforms: ['typescript'] }),
    replace({ __DEV__: isDevelopment }),
    alias({}),
    nodeResolve({ extensions: ['.js', '.ts', '.mjs'] }),
    ts({
      sourceMap: shouldUseSourcemaps,
      // https://stackoverflow.com/questions/63128597/how-to-get-rid-of-the-rollup-plugin-typescript-rollup-sourcemap-option-must
      // avoiding Rollup `sourcemap` warning
      tsconfig: isProduction ? './tsconfig.dev.json' : './tsconfig.prod.json',
    }),
  ];

  if (isProduction) {
    plugins.push(
      terser({
        numWorkers: getCUPs(),
        output: { comments: isDevelopment && 'all', ecma: 5 },
      }),
    );
  }

  const configs = [];

  packages.forEach((pack) => {
    let { main, module, browser } = pack.pkg;

    main = main.replace(
      /\.cjs\.js$/,
      `.${!isDevelopment ? 'production' : 'development'}.cjs.js`,
    );

    module = module.replace(
      /\.esm\.js$/,
      `.${!isDevelopment ? 'production' : 'development'}.esm.js`,
    );

    browser = browser.replace(
      /\.umd\.js$/,
      `.${!isDevelopment ? 'production' : 'development'}.umd.js`,
    );

    const config = {
      plugins,
      input: path.resolve(cwd, pack.name, 'src/index'),

      output: [
        {
          format: 'esm',
          exports: 'auto',
          sourcemap: shouldUseSourcemaps,
          file: path.resolve(cwd, pack.name, module),
        },
        {
          format: 'cjs',
          exports: 'auto',
          sourcemap: shouldUseSourcemaps,
          file: path.resolve(cwd, pack.name, main),
        },
        {
          name: 'plainCore',
          format: 'umd',
          exports: 'auto',
          sourcemap: shouldUseSourcemaps,
          file: path.resolve(cwd, pack.name, browser),
        },
      ],
    };

    configs.push(config);
  });

  return configs;
}

module.exports = main();
