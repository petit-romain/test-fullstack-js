const withAntdLess = require('next-plugin-antd-less')
const { merge } = require('lodash')

const webpackConfig = require('./webpack.config')

module.exports = withAntdLess({
  // optional
  modifyVars: { '@primary-color': process.env.NEXT_PUBLIC_APP_COLOR },
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object

  webpack(config) {
    return merge(config, webpackConfig)
  }
})
