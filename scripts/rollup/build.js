'use strict';

const rollup = require('rollup');
const minimist = require('minimist');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');
const sucrase = require('@rollup/plugin-sucrase');
const ts = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');

const envs = minimist(process.argv.slice(2));

const config = {
  input: './packages/core/src/index.ts',
  output: {
    file: './packages/core/npm/core.umd.js',
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    json(),
    replace(),
    nodeResolve(),
    sucrase({
      transforms: ['typescript'],
    }),
    ts(),
    commonjs(),
  ],
};

async function build() {
  const bundle = await rollup.rollup(config);
  await bundle.generate(config.output);
  await bundle.write(config.output);
}

build();
