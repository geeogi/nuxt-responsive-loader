const logger = require('consola').withScope('nuxt-responsive-loader')

const DEFAULT_RESPONSIVE_LOADER_OPTIONS = {
  name: 'img/[hash:7]-[width].[ext]',
  min: 640,
  max: 1080,
  steps: 5,
  placeholder: false,
  quality: 65
}

const setupResponsiveLoader = options => (config) => {
  /* Modify image loader in webpack config */
  // RegEx taken from: https://github.com/nuxt/nuxt.js/blob/76b10d2d3f4e5352f1c9d14c52008f234e66d7d5/lib/builder/webpack/base.js#L203
  const REGEX = '/\\.(png|jpe?g|gif|svg|webp)$/'
  const imageRulePredicate = rule => rule.test.toString().includes(REGEX)
  const imageLoaderRule = config.module.rules.find(imageRulePredicate)

  if (!imageLoaderRule) {
    logger.error('Could not modify image loader rule!')
    return
  }
  /* Update image loader to ignore png/jpg/gif/webp */
  imageLoaderRule.test = /\.(svg)$/i

  /* Add a new rule for png/jpg/gif/webp */
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|webp)$/,
    loader: 'responsive-loader',
    options: options || DEFAULT_RESPONSIVE_LOADER_OPTIONS
  })
}

export default function nuxtResponsiveLoader() {
  const { responsiveLoader: options } = this.options
  this.extendBuild(setupResponsiveLoader(options))
}

module.exports.meta = require('../package.json')
