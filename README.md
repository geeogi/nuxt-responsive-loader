# Nuxt Responsive Loader

Notice: This is my first ever NPM module.

Credit: This repo is based on [@manniL](https://github.com/manniL)'s awesome [Nuxt SVG loader]((https://www.npmjs.com/package/nuxt-svg-loader)) repo.

## Features

- Generate responsive srcsets for your Nuxt.js image assets
- Your website will request the images that match the current screen size (optimised!)
- Uses [responsive-loader](https://github.com/herrstucki/responsive-loader)
- Fully configurable

## Setup

- Add `nuxt-responsive-loader` as a dependency using yarn or npm to your project
- Add `nuxt-responsive-loader` to `modules` section of `nuxt.config.js`

```js
{
  modules: ['nuxt-responsive-loader']
}
```

- Add your images to the `assets` directory
- Now you can use your generated srcsets in your templates like so:

```
<template>
  <img :srcset="require('~/assets/nuxt.jpg').srcSet" />
</template>
```

This HTML will be the result:

```
<img srcset="'/_nuxt/img/2b88a85-640.jpg 640w, /_nuxt/img/1fff45c-750.jpg 750w, /_nuxt/img/6717911-860.jpg 860w, /_nuxt/img/f9f19bf-970.jpg 970w, /_nuxt/img/c0ceb80-1080.jpg 1080w">
```

- Now the browser will only request the image which matches the current screen size
- Learn more by reading [Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)

(Tip: if you're using the [nuxt-svg-loader](https://www.npmjs.com/package/nuxt-svg-loader) module, make sure to place it _before_ the nuxt-responsive-loader in the `modules` section of `nuxt.config.js`)

## Configuration

The plugin will work seamlessly out of the box with these default settings:

```js

  {
    name: 'img/[hash:7]-[width].[ext]'
    min: 640 // minimum image width
    max: 1080 // maximum image width
    steps: 5 // five sizes per image will be generated
    placeholder: false // no placeholder will be generated
    quality: 65 // images are compressed with medium quality
  }

```

If you want to configure the underlying loader, you can do that easily as well. For example, you might want to use [Sharp](https://github.com/lovell/sharp/) for faster build times. (All options available [here](https://github.com/herrstucki/responsive-loader))

```js
// file: nuxt.config.js

export default {
  // ...
  // Your loader options as responsiveLoader object
  responsiveLoader: {
    name: 'img/hello-world-[width].[ext]',
    sizes: [200, 500],
    format: 'png',
    adapter: require('responsive-loader/sharp'),
    placeholder: true
  }
}
```

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License
