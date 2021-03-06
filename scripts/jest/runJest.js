const { existsSync } = require("fs");
const { resolve } = require("path");
const spawn = require("../utils/cross-spawn");
const minimist = require("../utils/minimist");

const args = minimist(process.argv.slice(2));

const { scope, ...restArgs } = args;

if (!scope || existsSync(resolve("packages", scope, "packages.json"))) {
  console.error("请使用--scope指定至少一个需要运行测试用例的package(s)");
}

const defaultArgs = {
  colors: true,
  env: "jsdom",
  roots: "<rootDir>/packages/" + scope + "/__tests__/"
};

/**
 *
 * @type {FlatArray<string|number>[]}
 */
const options = Object.entries({
  ...defaultArgs,
  ...restArgs
})
  .map((argPair) => {
    const [key, value] = argPair;
    return ["--" + key, value];
  })
  .flat(1);

spawn("jest", options, { stdio: "inherit" });
