const {merge} = require('lodash')
const webpackConfig = require('../configs/webpack.config')

module.exports = {
    stories: [
        '../components/**/*.stories.js'
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-jest",
        '@storybook/preset-ant-design',
    ],
    webpackFinal: config => merge(config, webpackConfig)
}
