const ModelCollection = require('./model-collection')
const Model = require('./model')

class ModelFactory {
  /**
   * @param {Vinyl[]} files The vinyl files
   */
  createCollectionFromFiles (files) {
    const models = new ModelCollection(
      files.map(file => this.createFromFile(file))
    )

    models.models.forEach(model =>
      Object.assign(model, { owners: models.getOwners(model) })
    )

    models.sort()

    return models
  }

  /**
   * @param {Vinyl} file The input file
   * @return {Model}
   */
  createFromFile (file) {
    const fm = file.fm
    const data = file.data

    const model = new Model({
      name: fm.name,
      type: fm.type,
      labels: fm.labels || [],
      path: file.relative,
      aliases: fm.alias || [],
      groupLabel: data.label,
      groupColor: data.color,
      groupIndex: data.index,
      description: fm.desc,
      properties: fm.props || [],
      sourceUrl: fm.src,
      editUrl: fm.edit,
      notes: file.contents
    })

    file.model = model

    return model
  }
}

module.exports = ModelFactory
