'use strict'

const path = require('path')
const { join, dirname } = path
const accumulate = require('vinyl-accumulate')
const frontMatter = require('gulp-front-matter')
const marked = require('gulp-marked')
const nunjucks = require('nunjucks')
const through2 = require('through2')
const trimlines = require('gulp-trimlines')
const branch = require('branch-pipe')
const layout1 = require('layout1')

const createMdSource = require('./src/util/create-md-source')

const moduleConfig = {
  logger: null,
  title: 'List of Domain Models',
  source: 'source',
  dest: 'build',
  port: 8011,
  basepath: null
}

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
 * @param {Object} options The options
 * @return {Bulbo}
 */
module.exports = (bulbo, options) => {
  options = Object.assign({}, moduleConfig, options)

  const port = options.port
  const source = options.source
  const title = options.title
  const src = join(__dirname, 'src')

  const paths = {
    src,
    layout: {
      root: join(src, 'views'),
      page: join(src, 'views', 'page.njk'),
      index: join(src, 'views', 'index.njk')
    },
    asset: join(src, 'asset', '**', '*.*'),
    output: {
      index: 'index.html'
    },
    dest: options.dest
  }

  const pkg = require('./package')
  const basepath = file => {
    if (process.env.BASEPATH) {
      return process.env.BASEPATH
    }

    if (options.basepath) {
      return options.basepath
    }

    return dirname(path.relative(file.relative, ''))
  }

  const data = { title, pkg, viewDir: paths.layout.root, basepath, split, hasKey }
  data.opts = data

  nunjucks.configure(paths.layout.root)

  bulbo.setLogger(options.logger || (() => {}))
  bulbo.debugPagePath('__domaindoc__')
  bulbo.port(port)
  bulbo.dest(paths.dest)

  if (options.loggerTitle) {
    bulbo.loggerTitle(options.loggerTitle)
  }

  // set up asset pipeline
  bulbo.asset(paths.asset).base(paths.src)

  const pipeline = bulbo.asset()

  createMdSource(options.source).forEach(mdSource => {
    pipeline.asset(mdSource.path)
      .watch(mdSource.watchPath)
  })

  pipeline
    .pipe(frontMatter({ property: 'fm' }))
    .pipe(marked())
    .pipe(branch.obj(src => [
      src
        .pipe(accumulate(paths.output.index, { debounce: true }))
        .pipe(sortFiles())
        .pipe(layout1.nunjucks(paths.layout.index, { data })),
      src
        .pipe(accumulate.through({ debounce: true }))
        .pipe(sortFiles())
        .pipe(layout1.nunjucks(paths.layout.page, { data }))
    ]))
    .pipe(trimlines({ leading: false }))

  return bulbo
}

module.exports.setLogger = logger => Object.assign(moduleConfig, { logger })
