const withAntdLess = require('next-plugin-antd-less')
const { merge } = require('lodash')
const path = require('path')

module.exports = withAntdLess({
  // optional
  modifyVars: { '@primary-color': process.env.NEXT_PUBLIC_APP_COLOR },
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return merge(config, {
      resolve: {
        alias: {
          lib: path.resolve(__dirname, 'lib'),
          components: path.resolve(__dirname, 'components'),
          modals: path.resolve(__dirname, 'modals'),
          helpers: path.resolve(__dirname, 'helpers')
        }
      }
    })
  }
})
