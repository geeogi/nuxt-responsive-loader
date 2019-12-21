const DEFAULT_RESPONSIVE_LOADER_OPTIONS = {
  name: 'img/[hash:7]-[width].[ext]',
  min: 640,
  max: 1080,
  steps: 5,
  placeholder: false,
  quality: 65
}

const setupResponsiveLoader = userOptions => config => {
  /* Find the existing webpack loader which is responsible for images
   ** There will be one by default for Nuxt projects.
   ** See: https://github.com/nuxt/nuxt.js/blob/76b10d2d3f4e5352f1c9d14c52008f234e66d7d5/lib/builder/webpack/base.js#L203
   */
  const existingImageLoader = config.module.rules.find(
    rule =>
      rule.test.test('.png') &&
      rule.test.test('.jpg') &&
      rule.test.test('.gif') &&
      rule.test.test('.webp') &&
      rule.test.test('.svg')
  )

  /* If the image loader rule has been removed or edited then we cannot continue.
   ** It is not clear how to update the webpack rules.
   ** The user should define a custom webpack configuration.
   */
  if (!existingImageLoader) {
    throw new Error(
      [
        'Could not find the existing image loader rule.',
        ' The webpack config has been edited, perhaps by another Nuxt module.',
        ' To resolve this error try placing this module first in your Nuxt modules array',
        ' or use a custom webpack configuration instead.'
      ].join('')
    )
  }

  /* Update the loader so it's no longer respo∏nsible for png/jpg/webp files */
  if (existingImageLoader) {
    existingImageLoader.test = /\.(svg|gif)$/i
  }

  /* Add the new loader rule */
  config.module.rules.push({
    test: /\.(png|jpe?g|webp)$/,
    loader: 'responsive-loader',
    options: userOptions || DEFAULT_RESPONSIVE_LOADER_OPTIONS
  })
}

export default function nuxtResponsiveLoader() {
  const { responsiveLoader: userOptions } = this.options
  this.extendBuild(setupResponsiveLoader(userOptions))
}

module.exports.meta = require('../package.json')
