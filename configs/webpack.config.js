const path = require('path')

module.exports = {
  resolve: {
    alias: {
      configs: path.resolve(__dirname),
      lib: path.resolve(__dirname, '../lib'),
      middlewares: path.resolve(__dirname, '../middlewares'),
      components: path.resolve(__dirname, '../components'),
      modals: path.resolve(__dirname, '../modals'),
      helpers: path.resolve(__dirname, '../helpers')
    }
  }
}
