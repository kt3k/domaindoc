const { join } = require('path')

/**
 * @param {string|string[]|Object}
 */
module.exports = source => {
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
const createSourceFromString = (source, i) => ({
  source,
  path: join(source, '{,!(node_modules)**}', '!(README).md'),
  watchPath: join(source, '**', '!(README).md'),
  color: null,
  index: i
})

const createSourceFromObject = source => Object.keys(source).map((key, i) => {
  const sourceObj = createSourceFromString(key, i)

  return Object.assign(sourceObj, source[key])
})
