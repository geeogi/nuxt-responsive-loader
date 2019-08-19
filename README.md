# Nuxt Responsive Loader

[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-responsive-loader/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-responsive-loader)
[![npm](https://img.shields.io/npm/dt/nuxt-responsive-loader.svg?style=flat-square)](https://npmjs.com/package/nuxt-responsive-loader)

>

[📖 **Release Notes**](./CHANGELOG.md)

Credit: This repo is based on [@manniL](https://github.com/manniL)'s awesome [Nuxt SVG loader](https://www.npmjs.com/package/nuxt-svg-loader).

## Features

- Generate responsive srcsets for your Nuxt.js projects
- Compress images during the build step to improve website performance
- Re-size images, convert format, rename and generate placeholders
- Uses [responsive-loader](https://github.com/herrstucki/responsive-loader)
- Compatible with [Sharp](https://github.com/lovell/sharp/) for fast image processing ⚡
- Fully configurable

## Setup
- Add the module to your project: 

```js
npm install nuxt-responsive-loader
// OR
yarn add nuxt-responsive-loader
```` 
- Add `nuxt-responsive-loader` to the `modules` section of `nuxt.config.js`

```js
// file: nuxt.config.js
{
  ...
  modules: ['nuxt-responsive-loader']
  ...
}
```
- Add your images to the `assets` directory

## Examples
### Generating srcsets

- Add srcsets to your `img` elements in your templates like so:

```
<template>
  <img :srcset="require('~/assets/nuxt.jpg').srcSet" />
</template>
```

- During the project's build step your image will be converted into ~5 different images of varying size, each of which will be named with a unique hash and each of which will be compressed to reduce filesize (fully [configurable](#configuration)): 

```
├── _nuxt
    ├── img
        ├── 2b88a85-640.jpg
        ├── 1fff45c-750.jpg
        ├── 6717911-860.jpg
        ├── f9f19bf-970.jpg
        └── c0ceb80-1080.jpg
```

- Your Nuxt template will produce the following `img` element in your built HTML file:

```
<img srcset="/_nuxt/img/2b88a85-640.jpg 640w, /_nuxt/img/1fff45c-750.jpg 750w, /_nuxt/img/6717911-860.jpg 860w, /_nuxt/img/f9f19bf-970.jpg 970w, /_nuxt/img/c0ceb80-1080.jpg 1080w">
```

- Modern browsers will only request the image which matches the current screen size. This has the potential to reduce the bandwidth used by smaller devices and improve website performance. Learn more by reading [Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/).

### Compress source images to improve your website's performance:

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/[hash:7]-[width].[ext]',
    quality: 65 // choose a lower value if you want to reduce filesize further
  }
}
```

```html
<!-- file: index.vue -->
<template>
  <img :src="require('~/assets/nuxt.jpg').src" />
</template>
```

### Generate placeholders for usage with the blur-up technique:

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/[hash:7]-[width].[ext]',
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

### Convert image files to `.png`:

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/[hash:7]-[width].[ext]',
    format: 'png'
  }
}
```

## Configuration

The plugin will work out of the box and will use these settings:

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

If you want to configure the underlying loader, you can do that as well. (All options available [here](https://github.com/herrstucki/responsive-loader))

```js
// file: nuxt.config.js

export default {
  // ...
  // Specify your options as a responsiveLoader object
  responsiveLoader: {
    name: 'img/hello-world-[width].[ext]',
    sizes: [200, 500], 
    format: 'png',
    adapter: require('responsive-loader/sharp'),
    placeholder: true
  }
}
```
## Tips

- If you're also using the [nuxt-svg-loader](https://www.npmjs.com/package/nuxt-svg-loader) module, make sure to place it _before_ the nuxt-responsive-loader in the `modules` section of `nuxt.config.js`

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## Bugs

- Please file an issue. Thanks. 

## License

MIT
