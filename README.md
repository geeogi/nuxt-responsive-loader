# Nuxt Responsive Loader

[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-responsive-loader/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-responsive-loader)
[![npm](https://img.shields.io/npm/dt/nuxt-responsive-loader.svg?style=flat-square)](https://npmjs.com/package/nuxt-responsive-loader)

>

[📖 **Release Notes**](./CHANGELOG.md)

Credit: This repo is based on [@manniL](https://github.com/manniL)'s awesome [Nuxt SVG loader](https://www.npmjs.com/package/nuxt-svg-loader).

## Features

- Generate responsive srcsets for your Nuxt.js projects
- Re-size images, compress, convert format, rename and generate placeholders
- Uses [responsive-loader](https://github.com/herrstucki/responsive-loader)
- Uses [Sharp](https://github.com/lovell/sharp/) for fast image processing ⚡
- Fully configurable

## Setup

- Add `nuxt-responsive-loader` as a dependency using yarn or npm
- Add `nuxt-responsive-loader` to the `modules` section of `nuxt.config.js`

```js
{
  modules: ['nuxt-responsive-loader']
}
```

- Add your images to the `assets` directory
- Now you can use the generated srcsets in your templates like so:

```
<template>
  <img :srcset="require('~/assets/nuxt.jpg').srcSet" />
</template>
```

This HTML will be the rendered:

```
<img srcset="/_nuxt/img/2b88a85-640.jpg 640w, /_nuxt/img/1fff45c-750.jpg 750w, /_nuxt/img/6717911-860.jpg 860w, /_nuxt/img/f9f19bf-970.jpg 970w, /_nuxt/img/c0ceb80-1080.jpg 1080w">
```

- The browser will only request the image which matches the current screen size
- Learn more by reading [Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)

(Tip: if you're using the [nuxt-svg-loader](https://www.npmjs.com/package/nuxt-svg-loader) module, make sure to place it _before_ the nuxt-responsive-loader in the `modules` section of `nuxt.config.js`)

## Configuration

The plugin will work seamlessly out of the box and will use these settings:

```js
{
  name: 'img/[hash:7]-[width].[ext]'
  min: 640 // minimum image width generated
  max: 1080 // maximum image width generated
  steps: 5 // five sizes per image will be generated
  placeholder: false // no placeholder will be generated
  quality: 65 // images are compressed with medium quality
}
```

If you want to configure the underlying loader, you can do that easily as well. (All options available [here](https://github.com/herrstucki/responsive-loader))

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/hello-world-[width].[ext]',
    sizes: [200, 500],
    format: 'png',
    adapter: require('responsive-loader/sharp'), // Recommended. Alternatively, leave adapter undefined and add JIMP to your project.
    placeholder: true
  }
}
```

## Examples

- Compressing images to reduce file size:

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/[hash:7]-[width].[ext]',
    adapter: require('responsive-loader/sharp'),
    quality: 65
  }
}
```

```html
<!-- file: index.vue -->
<template>
  <img :src="require('~/assets/nuxt.jpg').src" />
</template>
```

- Generating placeholders for usage with blur-up technique:

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/[hash:7]-[width].[ext]',
    adapter: require('responsive-loader/sharp'),
    placeholder: true
  }
}
```

```html
<!-- file: index.vue -->
<template>
  <img :src="require('~/assets/nuxt.jpg').placeholder" data-src="..." />
</template>
```

- Converting image files to `.png`:

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/[hash:7]-[width].[ext]',
    format: 'png',
    adapter: require('responsive-loader/sharp')
  }
}
```

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

MIT
