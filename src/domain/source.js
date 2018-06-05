const micromatch = require('micromatch')

/**
 * The model of source document group.
 */
class Source {
  constructor ({ source, path, watchPath, color, index }) {
    this.source = source
    this.path = path
    this.watchPath = watchPath
    this.color = color
    this.index = index
  }

  isMatch (path) {
    return micromatch.isMatch(path, this.path)
  }
}

module.exports = Source
