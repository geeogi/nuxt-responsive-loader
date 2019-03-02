const DEFAULT_RESPONSIVE_LOADER_OPTIONS = {
  name: 'img/[hash:7]-[width].[ext]',
  min: 640,
  max: 1080,
  steps: 5,
  placeholder: false,
  quality: 65
}

const setupResponsiveLoader = options => config => {
  /* Find the rule which is responsible for images */
  const imageRulePredicate = rule => {
    return (
      rule.test.test('.png') &&
      rule.test.test('.jpg') &&
      rule.test.test('.gif') &&
      rule.test.test('.webp')
    )
  }
  const imageRule = config.module.rules.find(imageRulePredicate)

  /* Update the rule so it's no longer responsible for png/jpg/gif/webp files */
  if (imageRule && imageRule.test.test('.svg')) {
    /* If applicable, keep its responsibility for svg files */
    imageRule.test = /\.(svg)$/i
  } else {
    /* Else, remove all its responsibility */
    imageRule.test = /(?!)/
  }

  /* Add a new rule which is responsible for png/jpg/gif/webp files */
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
