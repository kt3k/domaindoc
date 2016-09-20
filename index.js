const bulbo = require('bulbo')
const path = require('path')
const accumulate = require('vinyl-accumulate')
const wrapper = require('layout-wrapper')
const frontMatter = require('gulp-front-matter')
const rename = require('gulp-rename')
const consolidate = require('gulp-consolidate')
const marked = require('gulp-marked')

module.exports = (bulbo, options) => {
  options = options || {}

  const port = options.port || 8011
  const source = options.source || 'source'
  const mdSource = path.join(source, '**/*.md')
  const output = options.output || 'index.html'
  const dest = options.dest || 'build'
  const layout = options.layout || __dirname

  bulbo.asset(mdSource)
  .pipe(frontMatter())
  .pipe(accumulate(output, {debounce: true}))
  .pipe(wrapper.nunjucks({layout, defaultLayout: 'default', extname: '.njk'}))

  bulbo.asset(mdSource)
  .pipe(frontMatter())
  .pipe(marked())
  .pipe(wrapper.nunjucks({layout, defaultLayout: 'page', extname: '.njk'}))

  bulbo.port(port)
  bulbo.dest(dest)

  return bulbo
}
