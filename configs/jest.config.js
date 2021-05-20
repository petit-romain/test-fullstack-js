const path = require('path')
const { defaultTo } = require('lodash')
const { resolve } = require('./webpack.config')

const test = path.resolve(__dirname, '../components/**/*(spec|test.js')

module.exports = {
  moduleNameMapper: defaultTo(resolve?.alias, {}),
  testMatch: [path.resolve(__dirname, '../components/**/*.test.js')]
}
