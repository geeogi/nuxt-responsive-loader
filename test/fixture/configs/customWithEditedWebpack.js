const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: [
    function () {
      this.extendBuild(config => {
        const rule = config.module.rules.find(rule => rule.test.test('.png'))
        rule.test = /\.jpg$/i
      })
    },
    '@@'
  ],
  build: {
    filenames: {
      app: '[name].js',
      chunk: '[name].js'
    }
  }
}