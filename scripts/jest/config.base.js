module.exports = {
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages/'],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'node', 'ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  }
  // testRegex: '<rootDir>/__tests__/[^/]*(\\\\.js|\\\\.ts)$'
};
