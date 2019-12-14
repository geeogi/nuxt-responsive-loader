const DEFAULT_RESPONSIVE_LOADER_OPTIONS = {
  name: 'img/[hash:7]-[width].[ext]',
  min: 640,
  max: 1080,
  steps: 5,
  placeholder: false,
  quality: 65
}

const setupResponsiveLoader = options => config => {
  /* Find the webpack rule which is responsible for images */
  const imageRulePredicate = rule => {
    return (
      rule.test.test('.png') &&
      rule.test.test('.jpg') &&
      rule.test.test('.gif') &&
      rule.test.test('.webp')
    )
  }
  const imageRule = config.module.rules.find(imageRulePredicate)

  if (imageRule) {
    /* Update the rule so it's no longer responsible for png/jpg/gif/webp files */
    if (imageRule.test.test('.svg')) {
      /* If applicable, keep its responsibility for svg files */
      imageRule.test = /\.(svg)$/i
    } else {
      /* Else, remove all its responsibility */
      imageRule.test = /(?!)/
    }
  }

  /* Add a new rule which is responsible for png/jpg/gif/webp files */
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|webp)$/,
    loader: 'responsive-loader',
    options: {
      ...DEFAULT_RESPONSIVE_LOADER_OPTIONS,
      ...options
    }
  })
}

export default function nuxtResponsiveLoader() {
  const { responsiveLoader: userOptions } = this.options
  this.extendBuild(setupResponsiveLoader(userOptions))
}

module.exports.meta = require('../package.json')
