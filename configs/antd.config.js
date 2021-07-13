const withAntdLess = require('next-plugin-antd-less')
const { defaultTo, merge } = require('lodash')

const webpackConfig = require('./webpack.config')

module.exports = withAntdLess({
  // optional
  modifyVars: {
    '@primary-color': defaultTo(process.env.NEXT_PUBLIC_APP_COLOR, '#696969')
  },
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object

  webpack(config) {
    return merge(config, webpackConfig)
  }
})
