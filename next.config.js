const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  // optional
  modifyVars: { '@primary-color': '#696969' },
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config
  }
})
