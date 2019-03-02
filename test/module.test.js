const path = require('path')
const klawSync = require('klaw-sync')
const { Nuxt, Builder, Generator } = require('nuxt-edge')

jest.setTimeout(60 * 1000)

const getRelativePath = fileObj => path.relative(__dirname, fileObj.path)

const noJS = item => !/\.js/.test(item)

describe('Default options', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(require('./fixture/configs/default'))
    await nuxt.ready()
    const builder = new Builder(nuxt)
    await builder.build()
    const generator = new Generator(nuxt)
    await generator.generate({ build: false })
  })

  test('build files contain srcset (.nuxt)', () => {
    const buildFiles = klawSync(nuxt.options.buildDir).map(getRelativePath)
    expect(buildFiles).toContain('../.nuxt/dist/client/img/2b88a85-640.jpg')
    expect(buildFiles).toContain('../.nuxt/dist/client/img/1fff45c-750.jpg')
    expect(buildFiles).toContain('../.nuxt/dist/client/img/6717911-860.jpg')
    expect(buildFiles).toContain('../.nuxt/dist/client/img/f9f19bf-970.jpg')
    expect(buildFiles).toContain('../.nuxt/dist/client/img/c0ceb80-1080.jpg')
    expect(buildFiles.filter(noJS)).toMatchSnapshot()
  })

  test('generated files contain srcset (dist)', () => {
    const generateFiles = klawSync(nuxt.options.generate.dir).map(
      getRelativePath
    )
    expect(generateFiles).toContain('../dist/_nuxt/img/2b88a85-640.jpg')
    expect(generateFiles).toContain('../dist/_nuxt/img/1fff45c-750.jpg')
    expect(generateFiles).toContain('../dist/_nuxt/img/6717911-860.jpg')
    expect(generateFiles).toContain('../dist/_nuxt/img/f9f19bf-970.jpg')
    expect(generateFiles).toContain('../dist/_nuxt/img/c0ceb80-1080.jpg')
    expect(generateFiles.filter(noJS)).toMatchSnapshot()
  })

  test('HTML uses responsive srcset', async () => {
    const { html } = await nuxt.renderRoute('/')
    expect(html).toContain(
      [
        '<img srcset="',
        '/_nuxt/img/2b88a85-640.jpg 640w,',
        '/_nuxt/img/1fff45c-750.jpg 750w,',
        '/_nuxt/img/6717911-860.jpg 860w,',
        '/_nuxt/img/f9f19bf-970.jpg 970w,',
        '/_nuxt/img/c0ceb80-1080.jpg 1080w',
        '">'
      ].join('')
    )
    expect(html).toMatchSnapshot()
  })

  afterAll(async () => {
    await nuxt.close()
  })
})

describe('Custom options, with Sharp', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(require('./fixture/configs/custom'))
    await nuxt.ready()
    const builder = new Builder(nuxt)
    await builder.build()
    const generator = new Generator(nuxt)
    await generator.generate({ build: false })
  })

  test('responsive srcset reflects custom options', async () => {
    expect(nuxt.renderer).toBeDefined()
    const { html } = await nuxt.renderRoute('/')
    expect(html).toContain(
      [
        '<img srcset="',
        '/_nuxt/img/hello-world-200.png 200w,',
        '/_nuxt/img/hello-world-500.png 500w',
        '">'
      ].join('')
    )
    expect(html).toMatchSnapshot()
    await nuxt.close()
  })

  afterAll(async () => {
    await nuxt.close()
  })
})
