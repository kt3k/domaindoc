'use strict'

const path = require('path')
const accumulate = require('vinyl-accumulate')
const frontMatter = require('gulp-front-matter')
const marked = require('gulp-marked')
const nunjucks = require('nunjucks')
const through2 = require('through2')
const trimlines = require('gulp-trimlines')
const fork = require('vinyl-fork')
const layout1 = require('layout1')

const options = {}

const sortFiles = () => through2.obj((file, enc, cb) => {
  file.files = file.files.slice(0).sort((x, y) => x.fm.name > y.fm.name ? 1 : -1)

  const fileMap = {}
  file.files.forEach(file => {
    fileMap[file.fm.name] = file
    if (file.fm.alias) {
      file.fm.alias.forEach(alias => {
        fileMap[alias] = file
      })
    }
  })
  file.fileMap = fileMap

  cb(null, file)
})

/**
 * Splits the string into alnum only or non-alnum only parts.
 */
const split = expr => expr.match(/[a-zA-Z0-9]+|[^a-zA-Z0-9]+/g)

/**
 * Returns the intersection of the 2 arrays.
 */
const hasKey = (obj, arr) => arr.filter(key => obj[key]).length > 0

/**
 * Decorates bulbo instance with asset definitions.
 * @param {Bulbo} bulbo
 * @return {Bulbo}
 */
module.exports = bulbo => {
  bulbo.setLogger(options.logger || (() => {}))
  bulbo.debugPagePath('__domaindoc__')

  const port = options.port || 8011

  const source = options.source || 'source'
  const mdSource = path.join(source, '**/*.md')
  const output = options.output || 'index.html'
  const dest = options.dest || 'build'

  const src = { root: path.join(__dirname, 'src') }
  const layout = options.layout || path.join(src.root, 'views')
  const cssSource = options.cssSource || path.join(src.root, 'styles', '**/*.css')
  const vendorSource = path.join(src.root, 'vendor', '**/*.*')

  const title = options.title || 'The list of domain models'
  const pkg = require('./package')
  const viewDir = layout
  const basepath = file => {
    if (options.basepath) {
      return options.basepath
    }

    return path.dirname(path.relative(file.relative, ''))
  }
  const domainSymbol = options.symbol || '💎'
  const externalSymbol = options.extSymbol || '🌐'

  const data = { title, pkg, viewDir, basepath, domainSymbol, externalSymbol, split, hasKey }
  data.opts = data

  nunjucks.configure(layout)

  bulbo.asset([mdSource, '!**/README.md', '!**/CHANGELOG.md'])
  .watch('**/*.md')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(fork(
    pipe =>
      pipe(accumulate(output, { debounce: true }))
      .pipe(sortFiles())
      .pipe(layout1.nunjucks(path.join(layout, 'index.njk'), { data })),
    pipe =>
      pipe(accumulate.through({ debounce: true }))
      .pipe(sortFiles())
      .pipe(layout1.nunjucks(path.join(layout, 'page.njk'), { data }))
  ))
  .pipe(trimlines({leading: false}))

  bulbo.asset(cssSource).base(src.root)
  bulbo.asset(vendorSource).base(src.root)

  bulbo.port(port)
  bulbo.dest(dest)

  return bulbo
}

module.exports.setLogger = logger => Object.assign(options, {logger})
module.exports.source = source => Object.assign(options, {source})
module.exports.dest = dest => Object.assign(options, {dest})
module.exports.port = port => Object.assign(options, {port})
module.exports.output = output => Object.assign(options, {output})
module.exports.basepath = basepath => Object.assign(options, {basepath})
module.exports.title = title => Object.assign(options, {title})
module.exports.symbol = symbol => Object.assign(options, { symbol })
module.exports.extSymbol = extSymbol => Object.assign(options, { extSymbol })
