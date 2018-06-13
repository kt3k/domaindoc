#!/usr/bin/env node

const berber = require('berber')
const { asset } = berber

const path = require('path')
const { join, dirname } = path
const accumulate = require('vinyl-accumulate')
const frontMatter = require('gulp-front-matter')
const gulpmd = require('gulp-markdown')
const nunjucks = require('nunjucks')
const through2 = require('through2')
const trimlines = require('gulp-trimlines')
const branch = require('branch-pipe')
const layout1 = require('layout1')
const gulpdata = require('gulp-data')

const { Source, Model } = require('./src/domain')

const defaultConfig = {
  logger: null,
  title: 'List of Domain Models',
  source: 'source',
  dest: 'build',
  port: 8011,
  basepath: null
}

/**
 * Gets the source group which the given file belongs to.
 * @param {Source[]} mdSources The source groups
 * @param {Vinyl} file The file
 * @return {Source}
 */
const getSource = mdSources => file =>
  mdSources.find(source => source.isMatch(file.relative))

/**
 * Sorts files and creates file mapping according to alias prop in frontmatters.
 * @return {Transform}
 */
const sortFiles = () =>
  through2.obj((file, _, cb) => {
    file.files = file.files.slice(0).sort((x, y) => {
      if (x.data.index !== y.data.index) {
        return x.data.index - y.data.index
      }

      return x.fm.name > y.fm.name ? 1 : -1
    })

    file.models = new Model.Factory().createCollectionFromFiles(file.files)

    if (file.fm) {
      file.model = file.models.getByName(file.fm.name)
    }

    cb(null, file)
  })

/**
 * Splits the string into alnum only or non-alnum only parts.
 */
const split = expr => expr.match(/[a-zA-Z0-9]+|[^a-zA-Z0-9]+/g)

/**
 * Returns true if obj has any truthy value for any of arr's key names.
 * @return {boolean}
 */
const hasKey = (obj, arr) => arr.filter(key => obj[key]).length > 0

berber.name('domaindoc')
berber.configName('.domaindoc')

/**
 * Build berber pipelines from the given config
 * @param {Object} options The options
 */
berber.on('config', config => {
  config = Object.assign({}, defaultConfig, config)

  const port = config.port
  const title = config.title
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
    dest: config.dest
  }

  const pkg = require('./package')
  const basepath = file => {
    if (process.env.BASEPATH) {
      return process.env.BASEPATH
    }

    if (config.basepath) {
      return config.basepath
    }

    return dirname(path.relative(file.relative, ''))
  }

  const data = {
    title,
    pkg,
    viewDir: paths.layout.root,
    basepath,
    split,
    hasKey
  }
  data.opts = data

  nunjucks.configure(paths.layout.root)

  berber.debugPagePath('__domaindoc__')
  berber.port(port)
  berber.dest(paths.dest)

  berber.loggerTitle(config.loggerTitle || 'domaindoc')

  // set up asset pipeline
  asset(paths.asset).base(paths.src)

  const pipeline = asset().base(process.cwd())

  const mdSources = new Source.Factory().createFromOption(config.source)

  mdSources.forEach(mdSource => {
    pipeline.asset(mdSource.path).watch(mdSource.watchPath)
  })

  pipeline
    .pipe(gulpdata(getSource(mdSources)))
    .pipe(frontMatter({ property: 'fm' }))
    .pipe(gulpmd())
    .pipe(
      branch.obj(src => [
        // index page
        src
          .pipe(accumulate(paths.output.index, { debounce: true }))
          .pipe(sortFiles())
          .pipe(layout1.nunjucks(paths.layout.index, { data })),
        // each model page
        src
          .pipe(accumulate.through({ debounce: true }))
          .pipe(sortFiles())
          .pipe(layout1.nunjucks(paths.layout.page, { data }))
      ])
    )
    .pipe(trimlines({ leading: false }))
})
