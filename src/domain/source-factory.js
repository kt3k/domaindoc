const { join } = require('path')
const Source = require('./source')

/**
 * The factory class of source model.
 */
class SourceFactory {
  /**
   * @param {string|string[]|Object} option
   * @return {Source[]}
   */
  createFromOption (option) {
    return createFromOption(option)
  }
}

module.exports = SourceFactory

/**
 * @param {string|string[]|Object}
 * @return {Source[]}
 */
const createFromOption = source => {
  if (typeof source === 'string') {
    return [createSourceFromString(source, 0)]
  }

  if (Array.isArray(source)) {
    return source.map(createSourceFromString)
  }

  if (typeof source === 'object') {
    return createSourceFromObject(source)
  }

  throw new Error(`source is one of string / array / object: ${typeof source} is given`)
}

/**
 * @param {string} source The source path (relative to cwd)
 * @param {number} i The index of the source
 */
const createSourceFromString = (source, i) => new Source({
  source,
  path: join(`${source}{`, ',', '!(node_modules)', '}!(README).md'),
  watchPath: join(`${source}{`, ',', '!(node_modules)', '}!(README).md'),
  color: null,
  index: i
})

const createSourceFromObject = source => Object.keys(source).map((key, i) => {
  const sourceObj = createSourceFromString(key, i)

  return Object.assign(sourceObj, source[key])
})
