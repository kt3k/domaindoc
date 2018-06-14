#!/usr/bin/env node

const berber = require('berber')
const { asset } = berber

const { join } = require('path')
const accumulate = require('vinyl-accumulate')
const frontMatter = require('gulp-front-matter')
const gulpmd = require('gulp-markdown')
const nunjucks = require('nunjucks')
const through2 = require('through2')
const trimlines = require('gulp-trimlines')
const branch = require('branch-pipe')
const layout1 = require('layout1')
const gulpdata = require('gulp-data')

const pkg = require('./package')
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

const map = mapper => () =>
  through2.obj(function (file, _, cb) {
    ;[].concat(mapper(file)).forEach(item => {
      this.push(item)
    })
    cb(null)
  })

/**
 * @return {Transform}
 */
const createModels = map(file =>
  Object.assign(file, {
    models: new Model.Factory().createCollectionFromFiles(file.files)
  })
)

const multiplex = map(({ files, models }) =>
  files.map(file => Object.assign(file.clone(), { models }))
)

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

  const data = {
    title,
    pkg,
    viewDir: paths.layout.root,
    basepath: file => (file.model ? file.model.basepath() : '.')
  }

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
    .pipe(accumulate(paths.output.index, { debounce: true }))
    .pipe(createModels())
    .pipe(
      branch.obj(src => [
        // index page
        src.pipe(layout1.nunjucks(paths.layout.index, { data })),
        // each model page
        src
          .pipe(multiplex())
          .pipe(layout1.nunjucks(paths.layout.page, { data }))
      ])
    )
    .pipe(trimlines({ leading: false }))
})
