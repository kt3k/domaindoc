const ModelCollection = require('./model-collection')
const Model = require('./model')

class ModelFactory {
  /**
   * @param {Vinyl[]} files The vinyl files
   */
  createCollectionFromFiles (files) {
    return new ModelCollection(files.map(file => this.createFromFile(file)))
  }

  /**
   * @param {Vinyl} file
   */
  createFromFile (file) {
    return new Model({
      name: file.fm.name,
      path: file.relative,
      aliases: file.fm.alias,
      groupLabel: file.data.label,
      groupColor: file.data.color,
      description: file.fm.desc,
      properties: file.fm.props,
      sourceUrl: file.fm.source,
      editUrl: file.fm.edit
    })
  }
}

module.exports = ModelFactory
