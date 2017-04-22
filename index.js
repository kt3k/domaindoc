'use strict'

const path = require('path')
const { join, dirname } = path
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
  const mdSource = join(source, '**', '*.md')
  const title = options.title || 'The list of Domain Models'

  const src = join(__dirname, 'src')

  const paths = {
    src,
    layout: {
      root: join(src, 'views'),
      page: join(src, 'views', 'page.njk'),
      index: join(src, 'views', 'index.njk')
    },
    css: join(src, 'styles', '**', '*.css'),
    vendor: join(src, 'vendor', '**', '*.*'),
    output: {
      index: 'index.html'
    },
    dest: options.dest || 'build'
  }

  const pkg = require('./package')
  const basepath = file => {
    if (options.basepath) {
      return options.basepath
    }

    return dirname(path.relative(file.relative, ''))
  }

  const data = { title, pkg, viewDir: paths.layout.root, basepath, split, hasKey }
  data.opts = data

  nunjucks.configure(paths.layout.root)

  bulbo.port(port)

  bulbo.asset([mdSource, '!**/README.md', '!**/CHANGELOG.md'])
  .watch('**/*.md')
  .pipe(frontMatter({ property: 'fm' }))
  .pipe(marked())
  .pipe(fork(
    pipe =>
      pipe(accumulate(paths.output.index, { debounce: true }))
      .pipe(sortFiles())
      .pipe(layout1.nunjucks(paths.layout.index, { data })),
    pipe =>
      pipe(accumulate.through({ debounce: true }))
      .pipe(sortFiles())
      .pipe(layout1.nunjucks(paths.layout.page, { data }))
  ))
  .pipe(trimlines({ leading: false }))

  bulbo.asset(paths.css).base(paths.src)
  bulbo.asset(paths.vendor).base(paths.src)

  bulbo.dest(paths.dest)

  return bulbo
}

module.exports.setLogger = logger => Object.assign(options, { logger }) // mainly for test
module.exports.source = source => Object.assign(options, { source })
module.exports.dest = dest => Object.assign(options, { dest })
module.exports.port = port => Object.assign(options, { port })
module.exports.basepath = basepath => Object.assign(options,  { basepath})
module.exports.title = title => Object.assign(options, { title })
