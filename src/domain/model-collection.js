const ModelGroup = require('./model-group')

class ModelCollection {
  /**
   * @param {Model[]} models
   */
  constructor (models = []) {
    this.models = []
    this.groups = {}
    this.modelMap = {}

    models.forEach(model => {
      this.add(model)
    })
  }

  getGroups () {
    return Object.keys(this.groups).map(label => this.groups[label])
  }

  /**
   * @param {string} name The name of the model
   */
  getByName (name) {
    return this.modelMap[name]
  }

  createGroupOfLabel (label, color) {
    this.groups[label] = new ModelGroup({ label, color })
  }

  /**
   * @param {Model} model
   */
  add (model) {
    this.models.push(model)

    this.modelMap[model.name] = model

    if (model.aliases) {
      model.aliases.forEach(alias => {
        this.modelMap[alias] = model
      })
    }

    if (!this.groups[model.groupLabel]) {
      this.createGroupOfLabel(model.groupLabel, model.groupColor)
    }

    this.groups[model.groupLabel].add(model)
  }
}

module.exports = ModelCollection
