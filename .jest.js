/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-11-20 16:48:48 
 * @Last Modified by:   zy9 
 * @Last Modified time: 2018-11-20 16:48:48 
 */
const libDir = process.env.LIB_DIR;

module.exports = {
  bail: true,
  verbose: true,
  setupFiles: [
    './tests/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'md',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'node',
  ],
  testRegex: libDir === 'dist' ? 'demo\\.test\\.js$' : '.*\\.test\\.js$',
  transformIgnorePatterns: [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  testURL: 'http://localhost',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
};