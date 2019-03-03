const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  build: {
    filenames: {
      app: '[name].js',
      chunk: '[name].js'
    }
  },
  responsiveLoader: {
    name: 'img/hello-world-[width].[ext]',
    sizes: [200, 500],
    format: 'png'
  }
}
