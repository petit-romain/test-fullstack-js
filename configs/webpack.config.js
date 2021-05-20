const path = require('path')

module.exports = {
  resolve: {
    alias: {
      configs: path.resolve(__dirname),
      lib: path.resolve(__dirname, '../lib'),
      middlewares: path.resolve(__dirname, '../middlewares'),
      templates: path.resolve(__dirname, '../templates'),
      components: path.resolve(__dirname, '../components'),
      modals: path.resolve(__dirname, '../modals'),
      helpers: path.resolve(__dirname, '../helpers'),
      pages: path.resolve(__dirname, '../pages')
    }
  }
}
