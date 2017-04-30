const { join } = require('path')

/**
 * @param {string|string[]|Object}
 */
module.exports = source => {
  if (typeof source === 'string') {
    return [createSourceFromString(source)]
  }

  if (Array.isArray(source)) {
    return source.map(createSourceFromString)
  }

  if (typeof source === 'object') {
    return createSourceFromObject(source)
  }

  throw new Error(`source is one of string / array / object: ${typeof source} is given`)
}

const createSourceFromString = source => ({
  path: join(source, '{,!(node_modules)**}', '!(README).md'),
  watchPath: join(source, '**', '*.md'),
  color: null
})

const createSourceFromObject = source => Object.keys(source).map(key => {
  const sourceObj = createSourceFromString(key)
  sourceObj.color = source[key]
})
