'use strict'

const path = require('path')
const accumulate = require('vinyl-accumulate')
const wrapper = require('layout-wrapper')
const frontMatter = require('gulp-front-matter')
const rename = require('gulp-rename')
const consolidate = require('gulp-consolidate')
const marked = require('gulp-marked')
const nunjucks = require('nunjucks')

const options = {
  logger: () => {}
}

module.exports = (bulbo) => {
  bulbo.setLogger(options.logger)
  bulbo.debugPagePath('__domaindoc__')

  const port = options.port || 8011
  const source = options.source || 'source'
  const mdSource = path.join(source, '**/*.md')
  const cssSource = path.join(source, '**/*.css')
  const output = options.output || 'index.html'
  const dest = options.dest || 'build'
  const layout = options.layout || path.join(__dirname, 'view')
  const data = {
    pkg: require('./package'),
    viewDir: layout,
    basepath: options.basepath
  }

  nunjucks.configure(layout)

  bulbo.asset(mdSource)
  .watch('**/*.{md|njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(rename({extname: '.html'}))
  .pipe(accumulate(output, {debounce: true}))
  .pipe(wrapper.nunjucks({layout, defaultLayout: 'index', extname: '.njk', data}))

  bulbo.asset(mdSource)
  .watch('**/*.{md|njk}')
  .pipe(frontMatter({property: 'fm'}))
  .pipe(marked())
  .pipe(wrapper.nunjucks({layout, defaultLayout: 'page', extname: '.njk', data}))

  bulbo.asset(cssSource)

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
